from django.db import models
from django.conf import settings
from django.utils import timezone
import uuid

# A User can have many bots
class Bot(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    namespace = models.UUIDField(default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True) # Sets field to now when first created.
    last_modified = models.DateTimeField(auto_now=True) # Updates field to now every time the model is saved.
    is_published = models.BooleanField(default=False)
    chat_url = models.CharField(max_length=255, default="")
    total_requests = models.IntegerField(default=0)
    storage_space_used = models.IntegerField(default=0)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user_id', 'title'], name="unique_user_bot_name")
        ]

    def __str__(self):
        return f"{self.title}"

# A Bot can have many files
class File(models.Model):
    bot = models.ForeignKey(Bot, on_delete=models.CASCADE)
    file_name = models.CharField(max_length=255)
    url = models.CharField(max_length=255)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['bot_id', 'file_name'], name="unique_bot_file_name")
        ]

    def __str__(self):
        return f"{self.user_id}-{self.file_name}"

