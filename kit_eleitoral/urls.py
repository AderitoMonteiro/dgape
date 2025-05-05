from django.urls import path

from .views import add_kit,gestao_kit_eleitoral
app_name = "kit_eleitoral"
urlpatterns = [
   path('index/', gestao_kit_eleitoral, name='gestao_kit_eleitoral'),
   path('add/', add_kit, name='add_kit'),
]