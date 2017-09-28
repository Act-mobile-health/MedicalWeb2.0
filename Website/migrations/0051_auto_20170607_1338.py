# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-06-07 13:38
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Website', '0050_auto_20170523_1547'),
    ]

    operations = [
        migrations.AddField(
            model_name='diseasetype',
            name='subFirst',
            field=models.CharField(default='', max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='diseasetype',
            name='subFourth',
            field=models.CharField(default='', max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='diseasetype',
            name='subSecond',
            field=models.CharField(default='', max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='diseasetype',
            name='subThird',
            field=models.CharField(default='', max_length=20),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='diseasetype',
            name='first',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='diseasetype',
            name='fourth',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='diseasetype',
            name='second',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='diseasetype',
            name='third',
            field=models.CharField(max_length=20),
        ),
    ]
