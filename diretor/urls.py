from django.urls import path

from .views import desbloquear_equipamento,bloquear_equipamento,gestao_equipamento,desbloquear_mobiliario_inventario,bloquear_mobiliario_inventario,desbloquear_mobiliario_inventario,bloquear_mobiliario_inventario_checkbox,inventario_mobiliario_home,desbloquear_equipamento_inventario,bloquear_equipamento_inventario,desbloquear_equipamento_inventario_checkbox,inventario_equipamento_home,bloquear_equipamento_inventario_checkbox
from departamentos.views import get_mobiliario_inventario,get_equipamento_inventario
app_name = "diretor"
urlpatterns = [
     path('index/', inventario_equipamento_home, name='gestao_kit_eleitoral'),
     path('dgape/inventario_mobiliario/', inventario_mobiliario_home, name='inventario_mobiliario_home'),
     path('dgape/equipamento/', gestao_equipamento, name='gestao_equipamento'),
     path('get/mobiliario_inventario_id/', get_mobiliario_inventario, name='get_equipamento_inventario'),
     path('get/equipamento_inventario_id/', get_equipamento_inventario, name='get_equipamento_inventario'),
     path('dgape/inventario_mobiliario/checkbox_inventario_mobiliario/', bloquear_mobiliario_inventario_checkbox, name='bloquear_equipamento_inventario_checkbox'),
     path('index/checkbox_inventario_mobiliario/', bloquear_mobiliario_inventario_checkbox, name='bloquear_mobiliario_inventario_checkbox'),
     path('index/unlockcheckbox_inventario_equipamento/', desbloquear_equipamento_inventario_checkbox, name='bloquear_equipamento_inventario_checkbox'),
     path('dgape/inventario_mobiliario/unlockcheckbox_inventario_mobiliario/', desbloquear_mobiliario_inventario, name='desbloquear_mobiliario_inventario'),
     path('index/lock_inventario_equipamento/', bloquear_equipamento_inventario, name='bloquear_equipamento_inventario'),
     path('dgape/equipamento/lock_equipamento/', bloquear_equipamento, name='bloquear_equipamento'),
     path('dgape/equipamento/unlock_equipamento/', desbloquear_equipamento, name='desbloquear_equipamento'),
     path('dgape/inventario_mobiliario/lock_inventario_mobiliario/', bloquear_mobiliario_inventario, name='bloquear_mobiliario_inventario'),
     path('dgape/inventario_mobiliario/unlock_inventario_mobiliario/', desbloquear_mobiliario_inventario, name='bloquear_mobiliario_inventario'),
     path('index/unlock_inventario_equipamento/', desbloquear_equipamento_inventario, name='desbloquear_equipamento_inventario'),
   ]
 
