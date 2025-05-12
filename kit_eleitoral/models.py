from django.db import models

# Create your models here.
class kit_eleit(models.Model):
    id = models.AutoField(primary_key=True)
    cres_id = models.IntegerField()
    status = models.BooleanField(default=1)
    malas = models.CharField(max_length=100)
    obs = models.CharField(max_length=100,null=True)
    portatel_id = models.IntegerField(null=True)
    impresora_id = models.IntegerField(null=True)
    Scaner_impresao_digital = models.IntegerField(null=True)
    camera_fotografia = models.IntegerField(null=True)
    guia_entrega = models.CharField(max_length=100,null=True)
    capitura_assinatura = models.IntegerField(null=True)
    data_saida = models.DateField()
    user_create = models.IntegerField(null=True)
    user_update = models.IntegerField(null=True)
    datecreate = models.DateTimeField(auto_now_add=True)
    dateupdate = models.DateTimeField(null=True)

class conselho(models.Model):
     id = models.AutoField(primary_key=True)
     descricao = models.CharField(max_length=100,null=True)
     status = models.BooleanField(default=1)
     user_create = models.IntegerField(null=True)
     user_update = models.IntegerField(null=True)
     datecreate = models.DateTimeField(auto_now_add=True)
     dateupdate = models.DateTimeField(null=True)


class equipamento(models.Model):
    id = models.AutoField(primary_key=True)
    data_aquisicao = models.DateField(default=True)
    descricao = models.CharField(max_length=100,default=True) 
    marca = models.CharField(max_length=100,default=True)    
    modelo = models.CharField(max_length=100,default=True) 
    serial_number = models.CharField(max_length=100,default=True) 
    mac_address = models.CharField(max_length=100,default=True)
    any_dask = models.CharField(max_length=100,default=True)     
    localizacao = models.CharField(max_length=100,null=True)
    tipo_item = models.CharField(max_length=50,null=True)
    obs = models.CharField(max_length=100,null=True)
    status = models.BooleanField(default=1)
    user_create = models.IntegerField()
    user_update = models.IntegerField(null=True)
    datecreate = models.DateTimeField(auto_now_add=True)
    dateupdate = models.DateTimeField(null=True)


