from django.db import models

# Create your models here.
class inventario_equipamento(models.Model):
    id = models.AutoField(primary_key=True)
    data_entrada = models.DateField()
    equipamento_id = models.IntegerField()
    status = models.BooleanField(default=1)
    localizacao = models.CharField(max_length=100)
    obs = models.CharField(max_length=100)
    user_create = models.IntegerField()
    user_update = models.IntegerField(default="")
    datecreate = models.DateTimeField(auto_now_add=True)
    dateupdate = models.DateTimeField(default="")


class equipamento(models.Model):
    id = models.AutoField(primary_key=True)
    descricao = models.CharField(max_length=100,default=True) 
    marca = models.CharField(max_length=100,default=True)    
    modelo = models.CharField(max_length=100,default=True) 
    serial_number = models.CharField(max_length=100,default=True) 
    mac_address = models.CharField(max_length=100,default=True)    
    status = models.BooleanField(default=1)
    user_create = models.IntegerField()
    user_update = models.IntegerField(default="")
    datecreate = models.DateTimeField(auto_now_add=True)
    dateupdate = models.DateTimeField(default="")

class mobiliario(models.Model):
    id = models.AutoField(primary_key=True)
    descricao = models.CharField(max_length=100)    
    status = models.BooleanField(default=1)
    user_create = models.IntegerField()
    user_update = models.IntegerField(default="")
    datecreate = models.DateTimeField(auto_now_add=True)
    dateupdate = models.DateTimeField(default="")
