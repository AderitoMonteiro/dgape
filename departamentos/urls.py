from django.urls import path

from .views import departamento_home

app_name = "departamento"
urlpatterns = [
   path('index/', departamento_home, name='departamento'),
]