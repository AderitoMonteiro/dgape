from django.shortcuts import render
from departamentos.models import inventario_mobiliario_eleitoral,inventario_equipamento_eleitoral, mobiliario_eleitoral,equipamento_eleitoral,inventario_mobiliario,equipamento,mobiliario,inventario_equipamento
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator
from django.core.serializers import serialize
from datetime import datetime
from django.db import connection
import openpyxl

# Create your views here.

def inventario_equipamento_home(request):

    equipamento_list = equipamento.objects.all().filter(status=1)
    equipamento_inventario_list = inventario_equipamento.objects.all().filter(status=1)

    query = '''
                    SELECT 
                    die.id,
                    de.data_entrada,
                    die.localizacao,
                    die.obs,
                    die.provinencia,
                    de.descricao,
                    de.modelo,
                    de.marca,
                    de.mac_address,
                    de.serial_number,
                    CONCAT(cr.first_name,' ',cr.last_name) as user_create,
                    CASE
                           WHEN die.status !=2 THEN "fa fa-unlock"
                           ELSE "fa fa-lock" 
                    END as class,
                    CASE
                           WHEN die.status=1 THEN "Bloquear"
                           ELSE "Desbloquear" 
                     END as title, 
                    CASE
                           WHEN die.status=1 THEN "#blockEmployeeModal"
                           ELSE "#unblockEmployeeModal" 
                    END as action,
                    CASE
                           WHEN die.status=1 THEN "get_equipamento_block_inventario(this)"
                           ELSE "get_equipamento_unblock_inventario(this)" 
                    END as function
                    FROM 
                    departamentos_inventario_equipamento as die
                    inner join departamentos_equipamento as de on die.equipamento_id=de.id
                    inner join auth_user as cr on cr.id=die.user_create
                '''
    with connection.cursor() as cursor:
          cursor.execute(query)


          colunas = [col[0] for col in cursor.description] 
          resultados = [dict(zip(colunas, row)) for row in cursor.fetchall()]

          paginator = Paginator(resultados, 7)
          page_number = request.GET.get("page")  
          paginator_equipamento_inventario = paginator.get_page(page_number)


    return render(request, 'Diretor_inventario_equipamento/index.html',{"equipamento":equipamento_list,"equipamento_inventario":paginator_equipamento_inventario})

def inventario_mobiliario_home(request):

    mobiliario_list = mobiliario.objects.all().filter(status=1)
    equipamento_inventario_list = inventario_equipamento.objects.all().filter(status=1)

    query = '''
                    SELECT 
                    die.id,
                    de.data_entrada,
                    die.localizacao,
                    die.obs,
                    die.provinencia,
                    de.descricao,
                     CASE
                           WHEN die.status !=2 THEN "fa fa-unlock"
                           ELSE "fa fa-lock" 
                    END as class,
                    CASE
                           WHEN die.status=1 THEN "Bloquear"
                           ELSE "Desbloquear" 
                     END as title, 
                    CASE
                           WHEN die.status=1 THEN "#blockEmployeeModal"
                           ELSE "#unblockEmployeeModal" 
                    END as action,
                    CASE
                           WHEN die.status=1 THEN "get_mobiliario_block_inventario(this)"
                           ELSE "get_mobiliario_unblock_inventario(this)" 
                    END as function
                    FROM 
                    departamentos_inventario_mobiliario as die
                    inner join departamentos_mobiliario as de on die.mobiliario_id=de.id
                '''
    with connection.cursor() as cursor:
          cursor.execute(query)

          colunas = [col[0] for col in cursor.description] 
          resultados = [dict(zip(colunas, row)) for row in cursor.fetchall()]

          paginator = Paginator(resultados, 7)
          page_number = request.GET.get("page")  
          paginator_equipamento_mobiliario = paginator.get_page(page_number)

    return render(request, 'Diretor_inventario_mobiliario/index.html',{"mobiliario":mobiliario_list,"mobiliario_inventario":paginator_equipamento_mobiliario})

def gestao_equipamento(request):

              query = '''
                     SELECT 
                            id,
                            descricao,
                            data_entrada,
                            mac_address,
                            marca,
                            modelo,
                            obs,
                            serial_number,
                            CASE
                            WHEN status !=2 THEN "fa fa-unlock"
                            ELSE "fa fa-lock" 
                     END as class,
                     CASE
                            WHEN status=1 THEN "Bloquear"
                            ELSE "Desbloquear" 
                            END as title, 
                     CASE
                            WHEN status=1 THEN "#blockEmployeeModal"
                            ELSE "#unblockEmployeeModal" 
                     END as action,
                     CASE
                            WHEN status=1 THEN "get_equipamento_block(this)"
                            ELSE "get_equipamento_unblock(this)" 
                     END as function
                     FROM 
                     departamentos_equipamento
                     '''
              with connection.cursor() as cursor:
               cursor.execute(query)
               colunas = [col[0] for col in cursor.description] 
               equipamento_list = [dict(zip(colunas, row)) for row in cursor.fetchall()]
               paginator = Paginator(equipamento_list, 7)
               page_number = request.GET.get("page")  
               paginator_equipamento = paginator.get_page(page_number)
                  
              return render(request, 'Diretor_equipamento/index.html',{"equipamento":paginator_equipamento})

def gestao_mobiliario(request):
   
   query = '''
              SELECT 
              id,
              data_entrada,
              descricao,
              obs,
              serial_number,
              status,
                     CASE
                            WHEN status !=2 THEN "fa fa-unlock"
                            ELSE "fa fa-lock" 
                     END as class,
                     CASE
                            WHEN status=1 THEN "Bloquear"
                            ELSE "Desbloquear" 
                            END as title, 
                     CASE
                            WHEN status=1 THEN "#blockEmployeeModal"
                            ELSE "#unblockEmployeeModal" 
                     END as action,
                     CASE
                            WHEN status=1 THEN "get_mobiliario_block(this)"
                            ELSE "get_mobiliario_unblock(this)" 
                     END as function
              from
              departamentos_mobiliario 
              '''
   with connection.cursor() as cursor:
               cursor.execute(query)
               colunas = [col[0] for col in cursor.description] 
               mobiliario_list = [dict(zip(colunas, row)) for row in cursor.fetchall()]
               paginator = Paginator(mobiliario_list, 7)
               page_number = request.GET.get("page")  
               paginator_mobiliario = paginator.get_page(page_number)

               return render(request, 'Diretor_mobiliario/index.html',{"mobiliario":paginator_mobiliario})

@csrf_exempt
def bloquear_equipamento_inventario_checkbox(request):
  
  if request.method == "POST":
            try:
                   id_eq= request.POST.get("id")
                   id_user= request.POST.get("id_user")

                   if id_eq:
                         id_eqs = id_eq.split(",") 
                         inventario_equipamento.objects.filter(id__in=id_eqs).update(status=2,user_update=id_user,dateupdate=datetime.now())
                                                                  
                   message='Inventario bloqueado com sucesso!!'
                   status= 'success'
                   return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def bloquear_mobiliario_inventario_checkbox(request):
  
  if request.method == "POST":
            try:
                   id_eq= request.POST.get("id")
                   id_user= request.POST.get("id_user")

                   if id_eq:
                         id_eqs = id_eq.split(",") 
                         inventario_mobiliario.objects.filter(id__in=id_eqs).update(status=2,user_update=id_user,dateupdate=datetime.now())
                                                                  
                   message='Inventario bloqueado com sucesso!!'
                   status= 'success'
                   return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


@csrf_exempt
def desbloquear_equipamento_inventario_checkbox(request):
  
  if request.method == "POST":
            try:
                   id_eq= request.POST.get("id")
                   id_user= request.POST.get("id_user")

                   if id_eq:
                         id_eqs = id_eq.split(",") 
                         inventario_equipamento.objects.filter(id__in=id_eqs).update(status=1,user_update=id_user,dateupdate=datetime.now())
                                                                  
                   message='Equipamento desbloqueado com sucesso!!'
                   status= 'success'
                   return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def bloquear_equipamento_inventario(request):
  
  if request.method == "POST":
            try:
                   id_eq= request.POST.get("inventario_equipamento_id")
                   id_user= request.POST.get("id_user")

                   if id_eq:
                         id_eqs = id_eq.split(",") 
                         inventario_equipamento.objects.filter(id__in=id_eqs).update(status=2,user_update=id_user,dateupdate=datetime.now())
                                                                  
                   message='Inventario bloqueado com sucesso!!'
                   status= 'success'
                   return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)



@csrf_exempt
def bloquear_equipamento(request):
  
  if request.method == "POST":
            try:
                   id_eq= request.POST.get("id_lock_equipamento")
                   id_user= request.POST.get("id_user")

                   
                   if id_eq:
                         id_eqs = id_eq.split(",") 
                         equipamento.objects.filter(id__in=id_eqs).update(status=2,user_update=id_user,dateupdate=datetime.now())
                                                                  
                   message='Inventario bloqueado com sucesso!!'
                   status= 'success'
                   return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def bloquear_equipamento_checkbox(request):
  
  if request.method == "POST":
            try:
                   id_eq= request.POST.get("id")
                   id_user= request.POST.get("id_user")
              
                   if id_eq:
                         id_eqs = id_eq.split(",") 
                         equipamento.objects.filter(id__in=id_eqs).update(status=2,user_update=id_user,dateupdate=datetime.now())
                                                                      
                         message='Inventario bloqueado com sucesso!!'
                         status= 'success'
                         return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def bloquear_equipamento_eleitoral_checkbox(request):
  
  if request.method == "POST":
            try:
                   id_eq= request.POST.get("id")
                   id_user= request.POST.get("id_user")
              
                   if id_eq:
                         id_eqs = id_eq.split(",") 
                         inventario_equipamento_eleitoral.objects.filter(id__in=id_eqs).update(status=2,user_update=id_user,dateupdate=datetime.now())
                                                                      
                         message='Equipamento bloqueado com sucesso!!'
                         status= 'success'
                         return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def bloquear_mobiliario_eleitoral_checkbox(request):
  
  if request.method == "POST":
            try:
                   id_eq= request.POST.get("id")
                   id_user= request.POST.get("id_user")
              
                   if id_eq:
                         id_eqs = id_eq.split(",") 
                         inventario_mobiliario_eleitoral.objects.filter(id__in=id_eqs).update(status=2,user_update=id_user,dateupdate=datetime.now())
                                                                      
                         message='Inventario bloqueado com sucesso!!'
                         status= 'success'
                         return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def bloquear_equipamento_eleitoral_checkbox(request):
  
  if request.method == "POST":
            try:
                   id_eq= request.POST.get("id")
                   id_user= request.POST.get("id_user")
              
                   if id_eq:
                         id_eqs = id_eq.split(",") 
                         equipamento_eleitoral.objects.filter(id__in=id_eqs).update(status=2,user_update=id_user,dateupdate=datetime.now())
                                                                      
                         message='Equipamento bloqueado com sucesso!!'
                         status= 'success'
                         return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def desbloquear_equipamento_eleitoral_check(request):
  
  if request.method == "POST":
            try:
                   id_eq= request.POST.get("id")
                   id_user= request.POST.get("id_user")
              
                   if id_eq:
                         id_eqs = id_eq.split(",") 
                         equipamento_eleitoral.objects.filter(id__in=id_eqs).update(status=1,user_update=id_user,dateupdate=datetime.now())
                                                                      
                         message='Equipamento desbloqueado com sucesso!!'
                         status= 'success'
                         return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)



@csrf_exempt
def desbloquear_mobiliario_eleitoral_checkbox(request):
  
  if request.method == "POST":
            try:
                   id_eq= request.POST.get("id")
                   id_user= request.POST.get("id_user")
              
                   if id_eq:
                         id_eqs = id_eq.split(",") 
                         inventario_mobiliario_eleitoral.objects.filter(id__in=id_eqs).update(status=1,user_update=id_user,dateupdate=datetime.now())
                                                                      
                         message='Inventario desbloqueado com sucesso!!'
                         status= 'success'
                         return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def desbloquear_equipamento_eleitoral_checkbox(request):
  
  if request.method == "POST":
            try:
                   id_eq= request.POST.get("id")
                   id_user= request.POST.get("id_user")
              
                   if id_eq:
                         id_eqs = id_eq.split(",") 
                         inventario_equipamento_eleitoral.objects.filter(id__in=id_eqs).update(status=1,user_update=id_user,dateupdate=datetime.now())
                                                                      
                         message='Equipamento desbloqueado com sucesso!!'
                         status= 'success'
                         return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def bloquear_mobiliario_checkbox(request):
  
  if request.method == "POST":
            try:
                   id_eq= request.POST.get("id")
                   id_user= request.POST.get("id_user")
              
                   if id_eq:
                         id_eqs = id_eq.split(",") 
                         mobiliario.objects.filter(id__in=id_eqs).update(status=2,user_update=id_user,dateupdate=datetime.now())
                                                                      
                         message='Inventario bloqueado com sucesso!!'
                         status= 'success'
                         return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def bloquear_mobiliario_eleitoral_checkbox(request):
  
  if request.method == "POST":
            try:
                   id_eq= request.POST.get("id")
                   id_user= request.POST.get("id_user")
              
                   if id_eq:
                         id_eqs = id_eq.split(",") 
                         mobiliario_eleitoral.objects.filter(id__in=id_eqs).update(status=2,user_update=id_user,dateupdate=datetime.now())
                                                                      
                         message='Mobiliario bloqueado com sucesso!!'
                         status= 'success'
                         return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


@csrf_exempt
def bloquear_mobiliario(request):
  
  if request.method == "POST":
            try:
                   id_eq= request.POST.get("id_lock_mobiliario")
                   id_user= request.POST.get("id_user")
              
                   if id_eq:
                         id_eqs = id_eq.split(",") 
                         mobiliario.objects.filter(id__in=id_eqs).update(status=2,user_update=id_user,dateupdate=datetime.now())
                                                                      
                         message='Inventario bloqueado com sucesso!!'
                         status= 'success'
                         return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def bloquear_mobiliario_eleitoral(request):
  
  if request.method == "POST":
            try:
                   id_eq= request.POST.get("id_lock_mobiliario")
                   id_user= request.POST.get("id_user")
              
                   if id_eq:
                         id_eqs = id_eq.split(",") 
                         mobiliario_eleitoral.objects.filter(id__in=id_eqs).update(status=2,user_update=id_user,dateupdate=datetime.now())
                                                                      
                         message='Mobiliario bloqueado com sucesso!!'
                         status= 'success'
                         return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def unbloquear_mobiliario_checkbox(request):
  
  if request.method == "POST":
            try:
                   id_eq= request.POST.get("id")
                   id_user= request.POST.get("id_user")
              
                   if id_eq:
                         id_eqs = id_eq.split(",") 
                         mobiliario.objects.filter(id__in=id_eqs).update(status=1,user_update=id_user,dateupdate=datetime.now())
                                                                      
                         message='Inventario desbloqueado com sucesso!!'
                         status= 'success'
                         return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


@csrf_exempt
def unbloquear_mobiliario_eleitoral_checkbox(request):
  
  if request.method == "POST":
            try:
                   id_eq= request.POST.get("id")
                   id_user= request.POST.get("id_user")
              
                   if id_eq:
                         id_eqs = id_eq.split(",") 
                         mobiliario_eleitoral.objects.filter(id__in=id_eqs).update(status=1,user_update=id_user,dateupdate=datetime.now())
                                                                      
                         message='Mobiliario desbloqueado com sucesso!!'
                         status= 'success'
                         return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def unbloquear_mobiliario(request):
  
  if request.method == "POST":
            try:
                   id_eq= request.POST.get("id")
                   id_user= request.POST.get("id_user")
              
                   if id_eq:
                         id_eqs = id_eq.split(",") 
                         mobiliario.objects.filter(id__in=id_eqs).update(status=1,user_update=id_user,dateupdate=datetime.now())
                                                                      
                         message='Inventario desbloqueado com sucesso!!'
                         status= 'success'
                         return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def desbloquear_equipamento(request):
  
  if request.method == "POST":
            try:
                   id_eq= request.POST.get("id_unlok_equipamento")
                   id_user= request.POST.get("id_user")

                   if id_eq:
                         id_eqs = id_eq.split(",") 
                         equipamento.objects.filter(id__in=id_eqs).update(status=1,user_update=id_user,dateupdate=datetime.now())
                                                                  
                   message='Inventario desbloqueado com sucesso!!'
                   status= 'success'
                   return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def bloquear_mobiliario_inventario(request):
  
  if request.method == "POST":
            try:
                   id_eq= request.POST.get("inventario_mobiliario_id")
                   id_user= request.POST.get("id_user")

                   if id_eq:
                         id_eqs = id_eq.split(",") 
                         inventario_mobiliario.objects.filter(id__in=id_eqs).update(status=2,user_update=id_user,dateupdate=datetime.now())
                                                                  
                   message='Inventario bloqueado com sucesso!!'
                   status= 'success'
                   return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def desbloquear_mobiliario_inventario(request):
  
  if request.method == "POST":
            try:
                   id_eq= request.POST.get("inventario_mobiliario_id")
                   id_user= request.POST.get("id_user")

                   if id_eq:
                         id_eqs = id_eq.split(",") 
                         inventario_mobiliario.objects.filter(id__in=id_eqs).update(status=1,user_update=id_user,dateupdate=datetime.now())
                                                                  
                   message='Inventario desbloqueado com sucesso!!'
                   status= 'success'
                   return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def desbloquear_equipamento_inventario(request):
  
  if request.method == "POST":
            try:
                   id_eq= request.POST.get("inventario_equipamento_id")
                   id_user= request.POST.get("id_user")

                   if id_eq:
                         id_eqs = id_eq.split(",") 
                         inventario_equipamento.objects.filter(id__in=id_eqs).update(status=1,user_update=id_user,dateupdate=datetime.now())
                                                                  
                         message='Inventario desbloqueado com sucesso!!'
                         status= 'success'
                         return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
                return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


@csrf_exempt
def desbloquear_equipamento_checkbox(request):
  
  if request.method == "POST":
            
            try:
                   id_eq= request.POST.get("id")
                   id_user= request.POST.get("id_user")

                   if id_eq:
                         id_eqs = id_eq.split(",") 
                         equipamento.objects.filter(id__in=id_eqs).update(status=1,user_update=id_user,dateupdate=datetime.now())
                                                                  
                         message='Inventario desbloqueado com sucesso!!'
                         status= 'success'
                         return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
               return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


def inventario_equipamento_eleitoral_home(request):

    equipamento_list = equipamento_eleitoral.objects.all().filter(status=1)
    equipamento_inventario_list = inventario_equipamento.objects.all().filter(status=1)

    query = '''
                    SELECT 
                    die.id,
                    de.data_entrada,
                    die.localizacao,
                    die.obs,
                    die.provinencia,
                    de.descricao,
                    de.modelo,
                    de.marca,
                    de.mac_address,
                    de.serial_number,
                    CASE
                           WHEN die.status !=2 THEN "fa fa-unlock"
                           ELSE "fa fa-lock" 
                    END as class,
                    CASE
                           WHEN die.status=1 THEN "Bloquear"
                           ELSE "Desbloquear" 
                     END as title, 
                    CASE
                           WHEN die.status=1 THEN "#blockEmployeeModal"
                           ELSE "#unblockEmployeeModal" 
                    END as action,
                    CASE
                           WHEN die.status=1 THEN "get_equipamento_eleitoral_block_inventario(this)"
                           ELSE "get_equipamento_eleitoral_unblock_inventario(this)" 
                    END as function
                    FROM 
                    departamentos_inventario_equipamento_eleitoral as die
                    inner join departamentos_equipamento_eleitoral as de on die.equipamento_id=de.id
                '''
    with connection.cursor() as cursor:
          cursor.execute(query)


          colunas = [col[0] for col in cursor.description] 
          resultados = [dict(zip(colunas, row)) for row in cursor.fetchall()]

          paginator = Paginator(resultados, 7)
          page_number = request.GET.get("page")  
          paginator_equipamento_inventario = paginator.get_page(page_number)


    return render(request, 'Diretor_eleitoral_equipamento_inventario/index.html',{"equipamento":equipamento_list,"equipamento_inventario":paginator_equipamento_inventario})

def inventario_mobiliario_eleitoral_home(request):

    mobiliario_list = mobiliario_eleitoral.objects.all().filter(status=1)
    equipamento_inventario_list = inventario_equipamento.objects.all().filter(status=1)

    query = '''
                    SELECT 
                    die.id,
                    de.data_entrada,
                    die.localizacao,
                    die.obs,
                    die.provinencia,
                    de.descricao,
                    CASE
                           WHEN die.status !=2 THEN "fa fa-unlock"
                           ELSE "fa fa-lock" 
                    END as class,
                    CASE
                           WHEN die.status=1 THEN "Bloquear"
                           ELSE "Desbloquear" 
                     END as title, 
                    CASE
                           WHEN die.status=1 THEN "#blockEmployeeModal"
                           ELSE "#unblockEmployeeModal" 
                    END as action,
                    CASE
                           WHEN die.status=1 THEN "get_mobiliario_eleitoral_block_inventario(this)"
                           ELSE "get_mobiliario_eleitoral_unblock_inventario(this)" 
                    END as function
                    FROM 
                    departamentos_inventario_mobiliario_eleitoral as die
                    inner join departamentos_mobiliario_eleitoral as de on die.mobiliario_id=de.id
                   
                '''
    with connection.cursor() as cursor:
          cursor.execute(query)

          colunas = [col[0] for col in cursor.description] 
          resultados = [dict(zip(colunas, row)) for row in cursor.fetchall()]

          paginator = Paginator(resultados, 7)
          page_number = request.GET.get("page")  
          paginator_equipamento_mobiliario = paginator.get_page(page_number)


    return render(request, 'Diretor_eleitoral_mobiliario_inventario/index.html',{"mobiliario":mobiliario_list,"mobiliario_inventario":paginator_equipamento_mobiliario})

@csrf_exempt
def bloquear_equipamento_eleitoral_inventario(request):
  
  if request.method == "POST":
            try:
                   id_eq= request.POST.get("inventario_equipamento_id")
                   id_user= request.POST.get("id_user")

                   if id_eq:
                         id_eqs = id_eq.split(",") 
                         inventario_equipamento_eleitoral.objects.filter(id__in=id_eqs).update(status=2,user_update=id_user,dateupdate=datetime.now())
                                                                  
                         message='Inventario bloqueado com sucesso!!'
                         status= 'success'
                         return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
                return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def bloquear_mobiliario_eleitoral_inventario(request):
  
  if request.method == "POST":
            try:
                   id_eq= request.POST.get("inventario_mobiliario_id")
                   id_user= request.POST.get("id_user")

                   if id_eq:
                         id_eqs = id_eq.split(",") 
                         inventario_mobiliario_eleitoral.objects.filter(id__in=id_eqs).update(status=2,user_update=id_user,dateupdate=datetime.now())
                                                                  
                         message='Inventario bloqueado com sucesso!!'
                         status= 'success'
                         return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
                return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def desbloquear_mobiliario_eleitoral_inventario(request):
  
  if request.method == "POST":
            try:
                   id_eq= request.POST.get("inventario_mobiliario_id")
                   id_user= request.POST.get("id_user")

                   if id_eq:
                         id_eqs = id_eq.split(",") 
                         inventario_mobiliario_eleitoral.objects.filter(id__in=id_eqs).update(status=1,user_update=id_user,dateupdate=datetime.now())
                                                                  
                         message='Inventario desbloqueado com sucesso!!'
                         status= 'success'
                         return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
                return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


@csrf_exempt
def desbloquear_equipamento_eleitoral_inventario(request):
  
  if request.method == "POST":
            try:
                   id_eq= request.POST.get("inventario_equipamento_id")
                   id_user= request.POST.get("id_user")

                   if id_eq:
                         id_eqs = id_eq.split(",") 
                         inventario_equipamento_eleitoral.objects.filter(id__in=id_eqs).update(status=1,user_update=id_user,dateupdate=datetime.now())
                                                                  
                         message='Inventario desbloqueado com sucesso!!'
                         status= 'success'
                         return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
                return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def desbloquear_equipamento_eleitoral(request):
  
  if request.method == "POST":
            try:
                   id_eq= request.POST.get("equipamento_id")
                   id_user= request.POST.get("id_user")

                   if id_eq:
                         id_eqs = id_eq.split(",") 
                         equipamento_eleitoral.objects.filter(id__in=id_eqs).update(status=1,user_update=id_user,dateupdate=datetime.now())
                                                                  
                         message='Equipamento desbloqueado com sucesso!!'
                         status= 'success'
                         return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
                return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def bloquear_equipamento_eleitoral(request):
  
  if request.method == "POST":
            try:
                   id_eq= request.POST.get("equipamento_id")
                   id_user= request.POST.get("id_user")

                   if id_eq:
                         id_eqs = id_eq.split(",") 
                         equipamento_eleitoral.objects.filter(id__in=id_eqs).update(status=2,user_update=id_user,dateupdate=datetime.now())
                                                                  
                         message='Equipamento desbloqueado com sucesso!!'
                         status= 'success'
                         return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
                return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

def gestao_equipamento_eleitoral(request):

                      query = '''
                            SELECT 
                                   id,
                                   descricao,
                                   data_entrada,
                                   mac_address,
                                   marca,
                                   modelo,
                                   obs,
                                   serial_number,
                                   CASE
                                   WHEN status !=2 THEN "fa fa-unlock"
                                   ELSE "fa fa-lock" 
                            END as class,
                            CASE
                                   WHEN status=1 THEN "Bloquear"
                                   ELSE "Desbloquear" 
                                   END as title, 
                            CASE
                                   WHEN status=1 THEN "#blockEmployeeModal"
                                   ELSE "#unblockEmployeeModal" 
                            END as action,
                            CASE
                                   WHEN status=1 THEN "get_equipamento_block(this)"
                                   ELSE "get_equipamento_unblock(this)" 
                            END as function
                            FROM 
                            departamentos_equipamento_eleitoral
                            '''
                      with connection.cursor() as cursor:
                           cursor.execute(query)
                           colunas = [col[0] for col in cursor.description] 

                           equipamento_list = [dict(zip(colunas, row)) for row in cursor.fetchall()]
                           paginator = Paginator(equipamento_list, 7)
                           page_number = request.GET.get("page")  
                           paginator_equipamento = paginator.get_page(page_number)
                  
                      return render(request, 'Diretor_eleitoral_equipamento/index.html',{"equipamento":paginator_equipamento})

def gestao_mobiliario_eleitoral(request):

                      query = '''
                                   SELECT 
                                   id,
                                   data_entrada,
                                   descricao,
                                   obs,
                                   serial_number,
                                   CASE
                                   WHEN status !=2 THEN "fa fa-unlock"
                                   ELSE "fa fa-lock" 
                            END as class,
                            CASE
                                   WHEN status=1 THEN "Bloquear"
                                   ELSE "Desbloquear" 
                                   END as title, 
                            CASE
                                   WHEN status=1 THEN "#blockEmployeeModal"
                                   ELSE "#unblockEmployeeModal" 
                            END as action,
                            CASE
                                   WHEN status=1 THEN "get_mobiliario_block(this)"
                                   ELSE "get_mobiliario_unblock(this)" 
                            END as function
                            FROM 
                            departamentos_mobiliario_eleitoral
                            '''
                      with connection.cursor() as cursor:
                           cursor.execute(query)
                           colunas = [col[0] for col in cursor.description] 

                           mobiliario_list = [dict(zip(colunas, row)) for row in cursor.fetchall()]
                           paginator = Paginator(mobiliario_list, 7)
                           page_number = request.GET.get("page")  
                           paginator_mobiliario = paginator.get_page(page_number)
                  
                      return render(request, 'Diretor_eleitoral_mobiliario/index.html',{"mobiliario":paginator_mobiliario})


