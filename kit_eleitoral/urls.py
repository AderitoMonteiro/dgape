from django.urls import path

from .views import delete_kit_checkbox,delete_kit,editar_kit,get_kit,add_kit,gestao_kit_eleitoral
app_name = "kit_eleitoral"
urlpatterns = [
   path('index/', gestao_kit_eleitoral, name='gestao_kit_eleitoral'),
   path('add/', add_kit, name='add_kit'),
   path('get/kit_editar/', get_kit, name='get_kit'),
   path('edit/', editar_kit, name='editar_kit'),
   path('delete/', delete_kit, name='delete_kit'),
   path('checkbox/', delete_kit_checkbox, name='delete_kit_checkbox'),

]