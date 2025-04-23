from django.shortcuts import render
from .models import equipamento
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt



def departamento_home(request):
  
    return render(request, 'Inventario/index.html')

def gestao_equipamento(request):
  
    return render(request, 'Equipamento/index.html')

@csrf_exempt
def add_equipamento(request):
  
  if request.method == "POST":
            try:
                    descricao= request.POST.get("descricao")
                    marca= request.POST.get("marca")
                    modelo= request.POST.get("modelo")
                    serial_number= request.POST.get("serial_number")
                    mac_address= request.POST.get("mac_address")
                    user_create= request.POST.get("user_create")

                    if descricao !="" and marca !="" and modelo !="":

                              equipamento.objects.create(
                                                          descricao=descricao,
                                                          marca=marca,
                                                          modelo=modelo,
                                                          serial_number=serial_number,
                                                          mac_address=mac_address,
                                                          user_create=user_create
                                                            )
                              message='Equipamento registado com sucesso!!'
                              status= 'success'
                              return JsonResponse({'status':status, 'message': message })

                    else:
                      message='Erro, tem que preencher todos os campos!!'
                      status= 'error'
                      return JsonResponse({'status':status, 'message': message })

                    

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)