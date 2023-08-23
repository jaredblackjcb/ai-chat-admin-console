# Generated by Django 4.1.7 on 2023-08-22 04:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('chat', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='namespace',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='filenamespace',
            name='file',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='chat.file'),
        ),
        migrations.AddField(
            model_name='filenamespace',
            name='namespace',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='chat.namespace'),
        ),
        migrations.AddField(
            model_name='file',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='chatdatasource',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddConstraint(
            model_name='namespace',
            constraint=models.UniqueConstraint(fields=('user_id', 'namespace'), name='unique_user_namespace'),
        ),
        migrations.AddConstraint(
            model_name='filenamespace',
            constraint=models.UniqueConstraint(fields=('file', 'namespace'), name='unique_file_namespace'),
        ),
        migrations.AddConstraint(
            model_name='file',
            constraint=models.UniqueConstraint(fields=('user_id', 'file_name'), name='unique_user_file_name'),
        ),
        migrations.AddConstraint(
            model_name='chatdatasource',
            constraint=models.UniqueConstraint(fields=('user_id', 'file_name', 'namespace'), name='chat_data_source_pk'),
        ),
    ]
