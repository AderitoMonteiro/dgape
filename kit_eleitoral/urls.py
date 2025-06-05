from django.urls import path

from .views import get_all_patrimonio,exportar_kit_excel,gestao_impressora,delete_mobiliario_checkbox,delete_equipamento,editar_equipamento,get_equipamento,add_equipamento,gestao_equipamento,delete_kit_checkbox,delete_kit,editar_kit,get_kit,add_kit,gestao_kit_eleitoral
app_name = "kit_eleitoral"
urlpatterns = [
   path('gestao_kit_eleitoral/', gestao_kit_eleitoral, name='gestao_kit_eleitoral'),
   path('equipamento/', gestao_equipamento, name='gestao_equipamento'),
   path('impressora/', gestao_impressora, name='gestao_equipamento'),
   path('add_equipamento/', add_equipamento, name='add_equipamento'),
   path('editar_equipamento/', editar_equipamento, name='add_equipamento'),
   path('delete_equipamento/', delete_equipamento, name='delete_equipamento'),
   path('checkbox_equipamento/', delete_mobiliario_checkbox, name='delete_mobiliario_checkbox'),
   path('get/equipamento_editar/', get_equipamento, name='get_equipamento'),
   path('add/', add_kit, name='add_kit'),
   path('get/kit_editar/', get_kit, name='get_kit'),
   path('edit/', editar_kit, name='editar_kit'),
   path('delete/', delete_kit, name='delete_kit'),
   path('checkbox/', delete_kit_checkbox, name='delete_kit_checkbox'),
   path('index/exportar_kit_excel/', exportar_kit_excel, name='exportar_kit_excel'),

]