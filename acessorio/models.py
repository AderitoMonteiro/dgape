from django.db import models

class acessorios(models.Model):
    id = models.AutoField(primary_key=True)
    descricao = models.CharField(max_length=100,default=True) 
    data_entrada = models.DateField(null=True) 
    obs = models.CharField(max_length=100,default=True)  
    provinencia = models.CharField(max_length=100,null=True)
    carateristica = models.CharField(max_length=100,null=True) 
    status = models.IntegerField(default=1)
    serial_number = models.CharField(max_length=100,default=True)
    conselho = models.IntegerField(default=0)
    sala =  models.IntegerField(default=0)
    user_create = models.IntegerField()
    user_update = models.IntegerField(null=True)
    datecreate = models.DateTimeField(auto_now_add=True)
    dateupdate = models.DateTimeField(null=True)
