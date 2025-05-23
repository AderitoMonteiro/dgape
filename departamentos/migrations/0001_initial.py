# Generated by Django 3.2 on 2025-04-23 12:51

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='equipamento',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('descricao', models.CharField(max_length=100)),
                ('status', models.BooleanField(default=True)),
                ('user_create', models.IntegerField()),
                ('user_update', models.IntegerField()),
                ('datecreate', models.DateTimeField(auto_now_add=True)),
                ('dateupdate', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='inventario_equipamento',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('data_entrada', models.DateField()),
                ('equipamento_id', models.IntegerField()),
                ('status', models.BooleanField(default=True)),
                ('marca', models.CharField(max_length=100)),
                ('modelo', models.CharField(max_length=100)),
                ('serial_number', models.CharField(max_length=100)),
                ('mac_address', models.CharField(max_length=100)),
                ('localizacao', models.CharField(max_length=100)),
                ('obs', models.CharField(max_length=100)),
                ('datecreate', models.DateTimeField(auto_now_add=True)),
                ('dateupdate', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='mobiliario',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('descricao', models.CharField(max_length=100)),
                ('status', models.BooleanField(default=True)),
                ('user_create', models.IntegerField()),
                ('user_update', models.IntegerField()),
                ('datecreate', models.DateTimeField(auto_now_add=True)),
                ('dateupdate', models.DateTimeField()),
            ],
        ),
    ]
