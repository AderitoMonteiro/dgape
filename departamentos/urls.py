from django.urls import path

from .views import departamento_home,gestao_equipamento,add_equipamento,get_equipamento,editar_equipamento,delete_equipamento,delete_equipamento_checkbox

app_name = "departamento"
urlpatterns = [
   path('index/', departamento_home, name='departamento'),
   path('equipamento/', gestao_equipamento, name='equipamento'),
   path('equipamento/add/', add_equipamento, name='add_equipamento'),
   path('get/equipamento_editar/', get_equipamento, name='get_equipamento'),
   path('equipamento/edit/', editar_equipamento, name='editar_equipamento'),
   path('equipamento/delete/', delete_equipamento, name='delete_equipamento'),
   path('equipamento/checkbox/', delete_equipamento_checkbox, name='delete_equipamento_checkbox'),
]