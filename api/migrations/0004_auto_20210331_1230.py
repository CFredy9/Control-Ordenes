# Generated by Django 2.2.13 on 2021-03-31 18:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20210331_1214'),
    ]

    operations = [
        migrations.AlterField(
            model_name='compra',
            name='total',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AlterField(
            model_name='producto',
            name='precio',
            field=models.DecimalField(decimal_places=2, max_digits=8),
        ),
    ]
