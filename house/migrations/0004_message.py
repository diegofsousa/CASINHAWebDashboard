# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-06-09 01:27
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('house', '0003_auto_20170608_1624'),
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=100, verbose_name='Mensagem')),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='+', to=settings.AUTH_USER_MODEL, verbose_name='Criador')),
                ('house', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='+', to='house.House', verbose_name='Ambiente')),
            ],
        ),
    ]