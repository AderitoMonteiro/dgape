from django.shortcuts import render

def departamento_home(request):
  
    return render(request, 'inventario/index.html')