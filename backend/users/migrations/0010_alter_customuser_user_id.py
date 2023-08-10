# Generated by Django 4.1.7 on 2023-08-10 02:12

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_alter_customuser_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='user_id',
            field=models.UUIDField(default=uuid.UUID('9f8ea637-5e23-4d74-afe2-5f46812babbb'), editable=False, primary_key=True, serialize=False),
        ),
    ]
