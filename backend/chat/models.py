from django.db import models
from django.conf import settings
from django.utils import timezone

# Create your models here.
class ChatDataSource(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    file_name = models.CharField(max_length=255)
    namespace = models.CharField(max_length=255)
    last_modified = models.DateTimeField()

    class Meta:
        # Define the compount primary key
        constraints = [
            models.UniqueConstraint(fields=['user_id', 'file_name', 'namespace'], name="chat_data_source_pk")
        ]

    def __str__(self):
        return f"{self.file_name}-{self.namespace}"
    
    def save(self, *args, **kwargs):
        self.last_modified = timezone.now()
        super().save(*args, **kwargs)

class Namespace(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    namespace = models.CharField(max_length=255)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user_id', 'namespace'], name="unique_user_namespace")
        ]

    def __str__(self):
        return f"{self.user_id}-{self.namespace}"
    
class File(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    file_name = models.CharField(max_length=255)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user_id', 'file_name'], name="unique_user_file_name")
        ]

    def __str__(self):
        return f"{self.user_id}-{self.file_name}"
    
class FileNamespace(models.Model):
    file = models.ForeignKey(File, on_delete=models.CASCADE)
    namespace = models.ForeignKey(Namespace, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['file', 'namespace'], name="unique_file_namespace")
        ]

    def __str__(self):
        return f"File: {self.file_name.file_name} - Namespace: {self.namespace.namespace}"
