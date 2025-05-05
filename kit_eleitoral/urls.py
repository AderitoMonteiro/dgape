from django.urls import path

from .views import gestao_kit_eleitoral
app_name = "kit_eleitoral"
urlpatterns = [
   path('index/', gestao_kit_eleitoral, name='gestao_kit_eleitoral'),
]