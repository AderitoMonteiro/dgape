from django.urls import path

from .views import departamento_home,gestao_equipamento,add_equipamento

app_name = "departamento"
urlpatterns = [
   path('index/', departamento_home, name='departamento'),
   path('equipamento/', gestao_equipamento, name='equipamento'),
   path('equipamento/add/', add_equipamento, name='add_equipamento'),
]