from django.urls import path

from .views import delete_mobiliario_inventario_checkbox,delete_mobiliario_inventario,edit_mobiliario_equipamento,get_mobiliario_inventario,add_inventario_mobiliario,inventario_mobiliario_home,inventario_equipamento_home,gestao_equipamento,add_equipamento,get_equipamento,editar_equipamento,delete_equipamento,delete_equipamento_checkbox,gestao_mobiliario,add_mobiliario,get_mobiliario,editar_mobiliario,delete_mobiliario,delete_mobiliario_checkbox,add_inventario_equipamento,get_equipamento_inventario,edit_inventario_equipamento,delete_equipamento_inventario,delete_equipamento_inventario_checkbox
app_name = "departamento"
urlpatterns = [
   path('equipamento/index/', inventario_equipamento_home, name='departamento'),
   path('mobiliario/index/', inventario_mobiliario_home, name='departamento'),
   path('mobiliario/index/add/', add_inventario_mobiliario, name='add_inventario_mobiliario'),
   path('equipamento_index/', gestao_equipamento, name='equipamento'),
   path('equipamento_index/add/', add_equipamento, name='add_equipamento'),
   path('get/equipamento_editar/', get_equipamento, name='get_equipamento'),
   path('equipamento/get/equipamento_inventario_id/', get_equipamento_inventario, name='get_equipamento_inventario'),
   path('mobiliario/get/mobiliario_inventario_id/', get_mobiliario_inventario, name='get_mobiliario_inventario'),
   path('equipamento_index/edit/', editar_equipamento, name='editar_equipamento'),
   path('equipamento_index/delete/', delete_equipamento, name='delete_equipamento'),
   path('mobiliario_index/delete/', delete_mobiliario, name='delete_mobiliario'),
   path('equipamento_index/checkbox/', delete_equipamento_checkbox, name='delete_equipamento_checkbox'),
   path('mobiliario_index/checkbox/', delete_mobiliario_checkbox, name='delete_mobiliario_checkbox'),
   path('mobiliario_index/', gestao_mobiliario, name='mobiliario'),
   path('mobiliario_index/add/', add_mobiliario, name='add_mobiliario'),
   path('get/mobiliario_editar/', get_mobiliario, name='get_mobiliario'),
   path('mobiliario_index/edit/', editar_mobiliario, name='editar_mobiliario'),
   path('equipamento/index/add/', add_inventario_equipamento, name='add_inventario_equipamento'),
   path('equipamento/index/edit_inventario_equipamento/', edit_inventario_equipamento, name='edit_inventario_equipamento'),
   path('mobiliario/index/edit_inventario_equipamento/', edit_mobiliario_equipamento, name='edit_mobiliario_equipamento'),
   path('equipamento/index/delete_inventario_equipamento/', delete_equipamento_inventario, name='delete_equipamento_inventario'),
   path('mobiliario/index/delete_inventario_mobiliario/', delete_mobiliario_inventario, name='delete_mobiliario_inventario'),
   path('equipamento/index/checkbox_inventario_equipamento/', delete_equipamento_inventario_checkbox, name='delete_equipamento_inventario'),
   path('mobiliario/index/checkbox_inventario_mobiliario/', delete_mobiliario_inventario_checkbox, name='delete_mobiliario_inventario_checkbox'),

]