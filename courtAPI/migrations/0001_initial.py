# Generated by Django 2.2.7 on 2019-11-17 05:56

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CourtDetail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('country', models.CharField(max_length=100)),
                ('proceedingType', models.CharField(max_length=200)),
                ('court', models.CharField(max_length=300)),
            ],
        ),
    ]