from django.db import models

# Create your models here.
class kit_el(models.Model):
    id = models.AutoField(primary_key=True)
    data_aquisicao = models.DateField()
    cres_id = models.IntegerField()
    status = models.BooleanField(default=1)
    malas = models.CharField(max_length=100)
    kit = models.CharField(max_length=50,null=True)
    any_dask = models.CharField(max_length=50,null=True)
    serial_number = models.CharField(max_length=50,null=True)
    mac = models.CharField(max_length=50,null=True)
    portatel = models.CharField(max_length=50,null=True)
    impresora = models.CharField(max_length=50,null=True)
    scaner_impresao_digital = models.CharField(max_length=100,null=True)
    capitura_assinatura = models.CharField(max_length=50,null=True)
    camara_fotografica = models.CharField(max_length=50,null=True)
    guia_entrega = models.CharField(max_length=100,null=True)
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