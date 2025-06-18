from django.db import models

# Create your models here.
class equipamento(models.Model):
    id = models.AutoField(primary_key=True)
    descricao = models.CharField(max_length=100,default=True) 
    marca = models.CharField(max_length=100,default=True)    
    modelo = models.CharField(max_length=100,default=True) 
    provinencia = models.CharField(max_length=100,null=True)
    serial_number = models.CharField(max_length=100,default=True) 
    mac_address = models.CharField(max_length=100,default=True) 
    data_entrada = models.DateField(null=True) 
    obs = models.CharField(max_length=100,default=True)    
    status = models.IntegerField(default=1)
    tipo = models.CharField(max_length=50,null=True)
    conselho = models.CharField(max_length=50,null=True)
    sala = models.CharField(max_length=500,null=True)
    user_create = models.IntegerField()
    user_update = models.IntegerField(null=True)
    datecreate = models.DateTimeField(auto_now_add=True)
    dateupdate = models.DateTimeField(null=True)