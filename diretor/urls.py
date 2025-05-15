from django.urls import path

from .views import inventario_equipamento_home
app_name = "diretor"
urlpatterns = [
   path('index/', inventario_equipamento_home, name='gestao_kit_eleitoral'),
   ]
 
