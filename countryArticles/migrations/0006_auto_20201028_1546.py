# Generated by Django 3.1.2 on 2020-10-28 10:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('countryArticles', '0005_auto_20201028_1545'),
    ]

    operations = [
        migrations.AlterField(
            model_name='articledetail',
            name='active',
            field=models.CharField(max_length=1000),
        ),
    ]
