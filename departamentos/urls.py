from django.urls import path

from .views import departamento_home,gestao_equipamento,add_equipamento,get_equipamento,editar_equipamento,delete_equipamento,delete_equipamento_checkbox,gestao_mobiliario,add_mobiliario,get_mobiliario,editar_mobiliario,delete_mobiliario,delete_mobiliario_checkbox,add_inventario_equipamento,get_equipamento_inventario
app_name = "departamento"
urlpatterns = [
   path('index/', departamento_home, name='departamento'),
   path('equipamento/', gestao_equipamento, name='equipamento'),
   path('equipamento/add/', add_equipamento, name='add_equipamento'),
   path('get/equipamento_editar/', get_equipamento, name='get_equipamento'),
   path('get/equipamento_inventario_id/', get_equipamento_inventario, name='get_equipamento_inventario'),
   path('equipamento/edit/', editar_equipamento, name='editar_equipamento'),
   path('equipamento/delete/', delete_equipamento, name='delete_equipamento'),
   path('mobiliario/delete/', delete_mobiliario, name='delete_mobiliario'),
   path('equipamento/checkbox/', delete_equipamento_checkbox, name='delete_equipamento_checkbox'),
   path('mobiliario/checkbox/', delete_mobiliario_checkbox, name='delete_mobiliario_checkbox'),
   path('mobiliario/', gestao_mobiliario, name='mobiliario'),
   path('mobiliario/add/', add_mobiliario, name='add_mobiliario'),
   path('get/mobiliario_editar/', get_mobiliario, name='get_mobiliario'),
   path('mobiliario/edit/', editar_mobiliario, name='editar_mobiliario'),
   path('index/add/', add_inventario_equipamento, name='add_inventario_equipamento'),
   
]