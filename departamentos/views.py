from django.shortcuts import render,get_object_or_404
from .models import equipamento,mobiliario,inventario_equipamento
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator
from django.core.serializers import serialize
from datetime import datetime
from django.db import connection






def departamento_home(request):

    equipamento_list = equipamento.objects.all().filter(status=1)
    equipamento_inventario_list = inventario_equipamento.objects.all().filter(status=1)

    query = '''
                    SELECT 
                    die.id,
                    die.data_entrada,
                    die.localizacao,
                    die.obs,
                    die.provinencia,
                    de.descricao,
                    de.modelo,
                    de.marca,
                    de.mac_address,
                    de.serial_number
                    FROM 
                    departamentos_inventario_equipamento as die
                    inner join departamentos_equipamento as de on die.equipamento_id=de.id
                '''
    with connection.cursor() as cursor:
          cursor.execute(query)

          colunas = [col[0] for col in cursor.description] 
          resultados = [dict(zip(colunas, row)) for row in cursor.fetchall()]


    return render(request, 'Inventario/index.html',{"equipamento":equipamento_list,"equipamento_inventario":resultados})

def gestao_equipamento(request):

                      

                      equipamento_list = equipamento.objects.all().filter(status=1)
                      paginator = Paginator(equipamento_list, 7)
                      page_number = request.GET.get("page")  
                      paginator_equipamento = paginator.get_page(page_number)
                  
                      return render(request, 'Equipamento/index.html',{"equipamento":paginator_equipamento})

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

                    validate=equipamento.objects.filter(descricao=descricao,marca=marca,modelo=modelo).count()

                    if validate==0:
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
                            message='Erro, tem que preencher todos os campos obrigatorios!!'
                            status= 'error'
                            return JsonResponse({'status':status, 'message': message })
                    else:
                      message='Erro, este equipamento já está registado!!'
                      status= 'error'
                      return JsonResponse({'status':status, 'message': message })

                    

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def get_equipamento(request):

    if request.method == "POST":
      try:
                      equipamento_id = request.POST.get("equipamento_id")
                      equipament= equipamento.objects.filter(id=equipamento_id)
                     
                      return JsonResponse(serialize("json", equipament),safe=False)

      except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def editar_equipamento(request):
  
  if request.method == "POST":
            try:
                    equipamento_id = request.POST.get("equipamento_id")
                    descricao= request.POST.get("descricao")
                    marca= request.POST.get("marca")
                    modelo= request.POST.get("modelo")
                    serial_number= request.POST.get("serial_number")
                    mac_address= request.POST.get("mac_address")
                    user_update= request.POST.get("user_create")

                    if descricao !="" and marca !="" and modelo !="":

                                    equipamento_ob=get_object_or_404(equipamento,id=equipamento_id)
                                    equipamento_ob.descricao=descricao
                                    equipamento_ob.marca=marca
                                    equipamento_ob.modelo=modelo
                                    equipamento_ob.serial_number=serial_number
                                    equipamento_ob.mac_address=mac_address
                                    equipamento_ob.user_update=user_update
                                    equipamento_ob.dateupdate=datetime.now()
                                    equipamento_ob.save()
                                                                  
                                    message='Equipamento alterado com sucesso!!'
                                    status= 'success'
                                    return JsonResponse({'status':status, 'message': message })

                    else:
                        message='Erro, tem que preencher todos os campos obrigatorios!!'
                        status= 'error'
                        return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def delete_equipamento(request):
  
  if request.method == "POST":
            try:
                    equipamento_id = request.POST.get("equipamento_id")
                    user_update= request.POST.get("user_update")

                    equipamento_ob=get_object_or_404(equipamento,id=equipamento_id)
                    equipamento_ob.status=0
                    equipamento_ob.user_update=user_update
                    equipamento_ob.dateupdate=datetime.now()
                    equipamento_ob.save()
                                                                  
                    message='Equipamento eleminado com sucesso!!'
                    status= 'success'
                    return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def delete_equipamento_checkbox(request):
  
  if request.method == "POST":
            try:
                   id_eq= request.POST.get("id")
                   id_user= request.POST.get("id_user")

                   if id_eq:
                         id_eqs = id_eq.split(",") 
                         equipamento.objects.filter(id__in=id_eqs).update(status=0,user_update=id_user,dateupdate=datetime.now())
                                                                  
                   message='Equipamento eleminado com sucesso!!'
                   status= 'success'
                   return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
  
def gestao_mobiliario(request):
   
    mobiliario_list = mobiliario.objects.all().filter(status=1)
    paginator = Paginator(mobiliario_list, 7)
    page_number = request.GET.get("page")  
    paginator_mobiliario = paginator.get_page(page_number)

    return render(request, 'mobiliario/index.html',{"mobiliario":paginator_mobiliario})

@csrf_exempt
def add_mobiliario(request):
  
  if request.method == "POST":
            try:
                    descricao= request.POST.get("descricao")
                    marca= request.POST.get("marca")
                    modelo= request.POST.get("modelo")
                    serial_number= request.POST.get("serial_number")
                    user_create= request.POST.get("user_create")

                    validate=mobiliario.objects.filter(descricao=descricao).count()

                    if validate==0:
                          if descricao !="":

                                    mobiliario.objects.create(
                                                                descricao=descricao,
                                                                marca=marca,
                                                                modelo=modelo,
                                                                serial_number=serial_number,
                                                                user_create=user_create
                                                                  )
                                    message='Mobiliario registado com sucesso!!'
                                    status= 'success'
                                    return JsonResponse({'status':status, 'message': message })

                          else:
                            message='Erro, tem que preencher todos os campos obrigatorios!!'
                            status= 'error'
                            return JsonResponse({'status':status, 'message': message })
                    else:
                      message='Erro, este mobiliario já está registado!!'
                      status= 'error'
                      return JsonResponse({'status':status, 'message': message })

                    

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def get_mobiliario(request):

    if request.method == "POST":
      try:
                      mobiliario_id = request.POST.get("mobiliario_id")
                      mobiliar= mobiliario.objects.filter(id=mobiliario_id)
                     
                      return JsonResponse(serialize("json", mobiliar),safe=False)

      except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def editar_mobiliario(request):
  
  if request.method == "POST":
            try:
                    mobiliario_id = request.POST.get("mobiliario_id")
                    descricao= request.POST.get("descricao")
                    marca= request.POST.get("marca")
                    modelo= request.POST.get("modelo")
                    serial_number= request.POST.get("serial_number")
                    user_update= request.POST.get("user_update")

                    if descricao !="":

                                    mobiliario_ob=get_object_or_404(mobiliario,id=mobiliario_id)
                                    mobiliario_ob.descricao=descricao
                                    mobiliario_ob.marca=marca
                                    mobiliario_ob.modelo=modelo
                                    mobiliario_ob.serial_number=serial_number
                                    mobiliario_ob.user_update=user_update
                                    mobiliario_ob.dateupdate=datetime.now()
                                    mobiliario_ob.save()
                                                                  
                                    message='Mobiliario alterado com sucesso!!'
                                    status= 'success'
                                    return JsonResponse({'status':status, 'message': message })

                    else:
                        message='Erro, tem que preencher todos os campos obrigatorios!!'
                        status= 'error'
                        return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def delete_mobiliario(request):
  
  if request.method == "POST":
            try:
                    mobiliario_id = request.POST.get("mobiliario_id")
                    user_update= request.POST.get("user_update")

                    mobiliario_ob=get_object_or_404(mobiliario,id=mobiliario_id)
                    mobiliario_ob.status=0
                    mobiliario_ob.user_update=user_update
                    mobiliario_ob.dateupdate=datetime.now()
                    mobiliario_ob.save()
                                                                  
                    message='Mobiliario eleminado com sucesso!!'
                    status= 'success'
                    return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def delete_mobiliario_checkbox(request):
  
  if request.method == "POST":
            try:
                   id_mb= request.POST.get("id")
                   id_user= request.POST.get("id_user")

                   if id_mb:
                         id_mbs = id_mb.split(",") 
                         mobiliario.objects.filter(id__in=id_mbs).update(status=0,user_update=id_user,dateupdate=datetime.now())
                                                                  
                   message='Equipamento eleminado com sucesso!!'
                   status= 'success'
                   return JsonResponse({'status':status, 'message': message })
            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def add_inventario_equipamento(request):
  
  if request.method == "POST":
            try:
                    data_entrada= request.POST.get("data_entrada")
                    provinencia= request.POST.get("provinencia")
                    equipamento= request.POST.get("equipamento")
                    localizacao= request.POST.get("localizacao")
                    estado= request.POST.get("estado")
                    user_create= request.POST.get("user_create")

                    if data_entrada !="" and provinencia !="" and equipamento !="" and localizacao !=""  and estado !="":

                                    inventario_equipamento.objects.create(
                                                                data_entrada=data_entrada,
                                                                equipamento_id=equipamento,
                                                                localizacao=localizacao,
                                                                provinencia=provinencia,
                                                                obs=estado,
                                                                user_create=user_create
                                                                  )
                                    message='Equipamento registado com sucesso!!'
                                    status= 'success'
                                    return JsonResponse({'status':status, 'message': message })

                    else:
                        message='Erro, tem que preencher todos os campos obrigatorios!!'
                        status= 'error'
                        return JsonResponse({'status':status, 'message': message })
            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


@csrf_exempt
def get_equipamento_inventario(request):

    equipamento_id= request.POST.get("equipamento_id")

    print(equipamento_id)

    if request.method == "POST":

            try:
                  query = '''
                            SELECT 
                            die.id,
                            die.data_entrada,
                            die.localizacao,
                            die.obs,
                            die.provinencia,
                            de.descricao,
                            de.modelo,
                            de.marca,
                            de.mac_address,
                            de.serial_number
                            FROM 
                            departamentos_inventario_equipamento as die
                            inner join departamentos_equipamento as de on die.equipamento_id=de.id
                    '''
                  with connection.cursor() as cursor:
                      cursor.execute(query)

                      colunas = [col[0] for col in cursor.description] 
                      resultados = [dict(zip(colunas, row)) for row in cursor.fetchall()]
                     
                  return JsonResponse(serialize("json", resultados),safe=False)

            except Exception as e:
                  return JsonResponse({'status': 'error', 'message': str(e)}, status=400)