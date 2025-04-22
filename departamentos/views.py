from django.shortcuts import render

def departamento_home(request):
  
    return render(request, 'departamento/index.html')