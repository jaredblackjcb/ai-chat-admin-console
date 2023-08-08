# Generated by Django 4.1.7 on 2023-08-08 03:30

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_remove_customuser_id_alter_customuser_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='user_id',
            field=models.UUIDField(default=uuid.UUID('a7337508-2352-4f00-a89a-d62b6018ec26'), editable=False, primary_key=True, serialize=False),
        ),
    ]