from django.urls import path

from .views import gestao_acessorio
app_name = "Acessorio"
urlpatterns = [
   path('gestao_acessorio/', gestao_acessorio, name='gestao_acessorio'),
]