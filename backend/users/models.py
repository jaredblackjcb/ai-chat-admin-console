import hashlib
import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    # Add custom fields to the user model
    user_id = models.UUIDField(primary_key=True, default=uuid.uuid4(), editable=False)
    avatar = models.FileField(upload_to='profile-pictures/', blank=True)

    def __str__(self):
        return f'{self.get_full_name()} <{self.email or self.username}>'

    def get_display_name(self) -> str:
        if self.get_full_name().strip():
            return self.get_full_name()
        return self.email or self.username

    @property
    def avatar_url(self) -> str:
        if self.avatar:
            return self.avatar.url
        else:
            return 'https://www.gravatar.com/avatar/{}?s=128&d=identicon'.format(self.gravatar_id)

    @property
    def gravatar_id(self) -> str:
        # https://en.gravatar.com/site/implement/hash/
        return hashlib.md5(self.email.lower().strip().encode('utf-8')).hexdigest()

    # Override the save method to ensure that username is always equal to email
    def save(self, *args, **kwargs):
        self.username = self.email
        super().save(*args, **kwargs)