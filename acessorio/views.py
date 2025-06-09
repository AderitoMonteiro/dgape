from django.shortcuts import render
from departamentos.models import sala
from kit_eleitoral.models import conselho
from .models import acessorios
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
from django.core.paginator import Paginator
from datetime import datetime
from django.shortcuts import render,get_object_or_404

def gestao_acessorio(request):
   
    conselho_list = conselho.objects.all().filter(status=1)
    sala_list = sala.objects.all().filter(status=1)
    componente ='acessorio'
    query = '''
                    SELECT 
                    dm.id,
                    dm.descricao,
                    dm.data_entrada,
                    dm.obs,
                    dm.tipo,
                    dm.provinencia,
                    dm.provinencia,
                    dm.carateristica,
                    kec.descricao as conselho,
                    IFNULL(ds.descricao,'') as sala
                    FROM acessorio_acessorios dm
                    left join kit_eleitoral_conselho as kec on dm.conselho=kec.id
                    left join departamentos_sala as ds on dm.sala=ds.id
                    WHERE dm.STATUS=1 order by dm.id desc
                '''
    with connection.cursor() as cursor:
          cursor.execute(query)
          colunas = [col[0] for col in cursor.description] 
          acessorios_list = [dict(zip(colunas, row)) for row in cursor.fetchall()]

          paginator = Paginator(acessorios_list, 7)
          page_number = request.GET.get("page")  
          paginator_acessorios = paginator.get_page(page_number)

    return render(request, 'Acessorio/index.html',{"acessorio":paginator_acessorios,"conselho":conselho_list,"sala":sala_list,"componente":componente})

@csrf_exempt
def add_acessorio(request):
  
  
  if request.method == "POST":
            try:
                    descricao= request.POST.get("descricao")
                    data_entrada= request.POST.get("data_entrada")
                    obs= request.POST.get("obs")
                    provinencia= request.POST.get("provinencia")
                    carateristica= request.POST.get("carateristica")
                    tipo_item= request.POST.get("tipo_item")
                    sala_id= request.POST.get("sala_id")
                    conselho= request.POST.get("conselho")
                    user_create= request.POST.get("user_create")

                            
                    if conselho!="23":
                        if descricao !="" and data_entrada !="" and conselho!=""and tipo_item!="":

                                acessorios.objects.create(

                                    descricao=descricao,
                                    data_entrada=data_entrada,
                                    obs=obs,
                                    provinencia=provinencia,
                                    carateristica=carateristica,
                                    conselho=conselho,
                                    tipo=tipo_item,
                                    user_create=user_create
                                                                                                  )
                                message='Acessorio registado com sucesso!!'
                                status= 'success'
                                return JsonResponse({'status':status, 'message': message })

                        else:
                            message='Erro, tem que preencher todos os campos obrigatorios!!'
                            status= 'error'
                            return JsonResponse({'status':status, 'message': message })
                    else:
                                if descricao !="" and data_entrada !="" and conselho!="" and sala_id!="" and tipo_item!="":

                                                                                  acessorios.objects.create(
                                                                                                              descricao=descricao,
                                                                                                              data_entrada=data_entrada,
                                                                                                              obs=obs,
                                                                                                              conselho=conselho,
                                                                                                              carateristica=carateristica,
                                                                                                              tipo=tipo_item,
                                                                                                              provinencia=provinencia,
                                                                                                              sala=sala_id,
                                                                                                              user_create=user_create
                                                                                                                )
                                                                                  message='Acessorio registado com sucesso!!'
                                                                                  status= 'success'
                                                                                  return JsonResponse({'status':status, 'message': message })

                                else:
                                    message='Erro, tem que preencher todos os campos obrigatorios!!'
                                    status= 'error'
                                    return JsonResponse({'status':status, 'message': message })

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


@csrf_exempt
def delete_acessorio_checkbox(request):
  
  if request.method == "POST":
            try:
                   id_mb= request.POST.get("id")
                   id_user= request.POST.get("id_user")

                   if id_mb:
                         id_mbs = id_mb.split(",") 
                         acessorios.objects.filter(id__in=id_mbs).update(status=0,user_update=id_user,dateupdate=datetime.now())
                                                                  
                   message='Acessorio eliminado com sucesso!!'
                   status= 'success'
                   return JsonResponse({'status':status, 'message': message })
            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


@csrf_exempt
def delete_acessorio(request):
  
  if request.method == "POST":
            try:
                    acessorio_id = request.POST.get("acessorio_id")
                    user_update= request.POST.get("user_update")

                    acessorios_ob=get_object_or_404(acessorios,id=acessorio_id)
                    acessorios_ob.status=0
                    acessorios_ob.user_update=user_update
                    acessorios_ob.dateupdate=datetime.now()
                    acessorios_ob.save()
                                                                  
                    message='Acessorio eliminado com sucesso!!'
                    status= 'success'
                    return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


@csrf_exempt
def get_acessorio(request):

    if request.method == "POST":
      try:
                      acessorio_id = request.POST.get("acessorio_id")

                      query = '''
                                  SELECT 
                                  dm.id,
                                  dm.descricao,
                                  dm.data_entrada,
                                  dm.obs,
                                  dm.tipo,
                                  dm.provinencia,
                                  dm.provinencia,
                                  dm.carateristica,
                                  kec.descricao as conselho,
                                  IFNULL(ds.descricao,'') as sala,
                                  ds.id as sala_id
                                  FROM acessorio_acessorios dm
                                  left join kit_eleitoral_conselho as kec on dm.conselho=kec.id
                                  left join departamentos_sala as ds on dm.sala=ds.id
                                  WHERE dm.id=%s
                                  '''
                      with connection.cursor() as cursor:
                            cursor.execute(query,[acessorio_id])
                            colunas = [col[0] for col in cursor.description] 
                            acessorio = [dict(zip(colunas, row)) for row in cursor.fetchall()]
                     
                      return JsonResponse({'resultado': acessorio})

      except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
