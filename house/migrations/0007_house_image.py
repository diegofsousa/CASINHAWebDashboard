# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-06-13 13:36
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('house', '0006_message_is_message'),
    ]

    operations = [
        migrations.AddField(
            model_name='house',
            name='image',
            field=models.FileField(blank=True, null=True, upload_to='house/'),
        ),
    ]
