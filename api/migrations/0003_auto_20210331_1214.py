# Generated by Django 2.2.13 on 2021-03-31 18:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_compra_total'),
    ]

    operations = [
        migrations.AlterField(
            model_name='compra',
            name='total',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='producto',
            name='precio',
            field=models.FloatField(),
        ),
    ]
