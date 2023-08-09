# Generated by Django 4.1.7 on 2023-08-09 02:26

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_alter_customuser_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='user_id',
            field=models.UUIDField(default=uuid.UUID('877200db-93f8-4968-845a-07606b84f513'), editable=False, primary_key=True, serialize=False),
        ),
    ]
