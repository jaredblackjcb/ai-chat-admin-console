from django.db import models
from django.conf import settings
import datetime
# Create your models here.
class ChatDataSource(models.Model):
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    file_name = models.CharField(max_length=255)
    namespace = models.CharField(max_length=255)
    last_update = models.DateTimeField()

    class Meta:
        # Define the compount primary key
        constraints = [
            models.UniqueConstraint(fields=['user_id', 'file_name', 'namespace'], name="chat_data_source_pk")
        ]

    def __str__(self):
        return f"{self.user_id}-{self.file_name}-{self.namespace}"
    
    def save(self, *args, **kwargs):
        self.last_update = datetime.datetime.utcnow()
        super().save(*args, **kwargs)

class Namespace(models.Model):
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    namespace = models.CharField(max_length=255)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user_id', 'namespace'], name="unique_user_namespace")
        ]

    def __str__(self):
        return f"{self.user_id}-{self.namespace}"