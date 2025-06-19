from django.shortcuts import render,get_object_or_404
from .models import mobiliario
from departamentos.models import sala

from kit_eleitoral.models import conselho
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
from openpyxl.styles import Font
from django.core.paginator import Paginator
from django.core.serializers import serialize
from datetime import datetime
from django.db import connection
import openpyxl

@csrf_exempt
def add_mobiliario(request):
  
  if request.method == "POST":
            try:
                    descricao= request.POST.get("descricao")
                    data_entrada= request.POST.get("data_entrada_edit")
                    data_entrada= request.POST.get("data_entrada")
                    serial_number= request.POST.get("serial_number")
                    sala= request.POST.get("sala")
                    provinencia= request.POST.get("provinencia")
                    carateristica= request.POST.get("carateristica")
                    tipo= request.POST.get("tipo")
                    conselho= request.POST.get("conselho")
                    modelo= request.POST.get("modelo")
                    obs= request.POST.get("obs")
                    user_create= request.POST.get("user_create")

                    if conselho!="23":
                                    if descricao !="" and data_entrada !="" and provinencia!="" and conselho !="" and tipo !="" and carateristica !="":
                                      
                                         # validate=mobiliario.objects.filter(descricao=descricao).count()
                                         # if validate==0:

                                                    mobiliario.objects.create(
                                                                                descricao=descricao,
                                                                                data_entrada=data_entrada,
                                                                                serial_number=serial_number,
                                                                                conselho=conselho,
                                                                                carateristica=carateristica,
                                                                                provinencia=provinencia,
                                                                                modelo=modelo,
                                                                                tipo=tipo,
                                                                                obs=obs,
                                                                                user_create=user_create
                                                                                  )
                                                    message='Mobiliario registado com sucesso!!'
                                                    status= 'success'
                                                    return JsonResponse({'status':status, 'message': message })

                                         # else:
                                          
                                         #    message='Erro, este mobiliario já foi registado!!'
                                         #   status= 'error'
                                         #   return JsonResponse({'status':status, 'message': message })
                                    else:
                                      message='Erro, tem que preencher todos os campos obrigatorios!!'
                                      status= 'error'
                                      return JsonResponse({'status':status, 'message': message })
                    else:

                                if descricao !="" and data_entrada !="" and sala !="" and provinencia!="" and conselho !="" and tipo !="" and carateristica !="":
                                                
                                                   # validate=mobiliario.objects.filter(descricao=descricao).count()
                                                   #if validate==0:

                                                              mobiliario.objects.create(
                                                                                          descricao=descricao,
                                                                                          data_entrada=data_entrada,
                                                                                          serial_number=serial_number,
                                                                                          conselho=conselho,
                                                                                          carateristica=carateristica,
                                                                                          provinencia=provinencia,
                                                                                          modelo=modelo,
                                                                                          sala=sala,
                                                                                          tipo=tipo,
                                                                                          obs=obs,
                                                                                          user_create=user_create
                                                                                            )
                                                              message='Mobiliario registado com sucesso!!'
                                                              status= 'success'
                                                              return JsonResponse({'status':status, 'message': message })

                                                    #else:
                                                    
                                                    # message='Erro, este mobiliario já foi registado!!'
                                                    # status= 'error'
                                                    # return JsonResponse({'status':status, 'message': message })
                                else:
                                 message='Erro, tem que preencher todos os campos obrigatorio'
                                 status= 'error'
                                 return JsonResponse({'status':status, 'message': message })


                    

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

def gestao_mobiliario(request):
   
    conselho_list = conselho.objects.all().filter(status=1)
    sala_list = sala.objects.all().filter(status=1)
    componente ='equipamento'
    sidebar=request.GET.get('modulo')

    if sidebar=='gestao':

                        query = '''
                                        SELECT 
                                        dm.id,
                                        dm.descricao,
                                        dm.data_entrada,
                                        dm.serial_number,
                                        dm.obs,
                                        dm.tipo,
                                        dm.provinencia,
                                        dm.provinencia,
                                        dm.carateristica,
                                        kec.descricao as conselho,
                                        IFNULL(ds.descricao,'') as sala,
                                        'get_mobiliario_gestao(this)' as sidebar,
                                        'sidebar_gestao' as sidebar_descricao
                                        FROM mobiliarios_mobiliario dm
                                        left join kit_eleitoral_conselho as kec on dm.conselho=kec.id
                                        left join departamentos_sala as ds on dm.sala=ds.id
                                        WHERE dm.STATUS=1 order by dm.id desc
                                    '''
    else:

                          query = '''
                                         SELECT 
                                         dm.id,
                                         dm.descricao,
                                         dm.data_entrada,
                                         dm.serial_number,
                                         dm.obs,
                                         dm.tipo,
                                         dm.provinencia,
                                         dm.provinencia,
                                         dm.carateristica,
                                         kec.descricao as conselho,
                                         IFNULL(ds.descricao,'') as sala,
                                         'get_mobiliario(this)' as sidebar,
                                         'sidebar_lancamento' as sidebar_descricao
                                         FROM mobiliarios_mobiliario dm
                                         left join kit_eleitoral_conselho as kec on dm.conselho=kec.id
                                         left join departamentos_sala as ds on dm.sala=ds.id
                                         WHERE dm.STATUS=1 order by dm.id desc
                                                        '''

    with connection.cursor() as cursor:
          cursor.execute(query)
          colunas = [col[0] for col in cursor.description] 
          mobiliario_list = [dict(zip(colunas, row)) for row in cursor.fetchall()]

          paginator = Paginator(mobiliario_list, 7)
          page_number = request.GET.get("page",1)  
          paginator_mobiliario = paginator.get_page(page_number)

          if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                    return render(request, 'mobiliario/index.html',{"mobiliario":paginator_mobiliario,"conselho":conselho_list,"sala":sala_list,"componente":componente})

    return render(request, 'mobiliario/index.html',{"mobiliario":paginator_mobiliario,"conselho":conselho_list,"sala":sala_list,"componente":componente})

@csrf_exempt
def get_mobiliario(request):

    if request.method == "POST":
      try:
                      mobiliario_id = request.POST.get("mobiliario_id")

                      query = '''
                                      SELECT 
                                      dm.id,
                                      dm.descricao,
                                      dm.data_entrada,
                                      dm.serial_number,
                                      dm.obs,
                                      dm.tipo,
                                      dm.provinencia,
                                      carateristica,
                                      kec.descricao as conselho,
                                      kec.id as conselho_id,
                                      IFNULL(ds.descricao,'') as sala,
                                      ds.id as sala_id,
                                      dm.modelo
                                      FROM mobiliarios_mobiliario dm
                                      left join kit_eleitoral_conselho as kec on dm.conselho=kec.id
                                      left join departamentos_sala as ds on dm.sala=ds.id
                                      WHERE dm.STATUS=1 and dm.id=%s
                                  '''
                      with connection.cursor() as cursor:
                            cursor.execute(query,[mobiliario_id])
                            colunas = [col[0] for col in cursor.description] 
                            mobiliar = [dict(zip(colunas, row)) for row in cursor.fetchall()]
                     
                      return JsonResponse({'resultado': mobiliar})

      except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def editar_mobiliario(request): 
  
  if request.method == "POST":
            try:
                    mobiliario_id = request.POST.get("mobiliario_id")
                    descricao= request.POST.get("descricao")
                    conselh= request.POST.get("conselho_edit")
                    sala_id= request.POST.get("sala_id")
                    obs= request.POST.get("obs")
                    user_update= request.POST.get("user_update")

                    if conselh!="23":

                                if conselh!="":
                                        mobiliario_ob=get_object_or_404(mobiliario,id=mobiliario_id)
                                        mobiliario_ob.descricao=descricao
                                        mobiliario_ob.obs=obs
                                        mobiliario_ob.sala=0
                                        mobiliario_ob.conselho=conselh
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



                    else:
                               if conselh!="" and sala_id!="":
                                
                                    mobiliario_ob=get_object_or_404(mobiliario,id=mobiliario_id)
                                    mobiliario_ob.descricao=descricao
                                    mobiliario_ob.obs=obs
                                    mobiliario_ob.sala=sala_id
                                    mobiliario_ob.conselho=conselh
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
                                                                  
                    message='Mobiliario eliminado com sucesso!!'
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
                                                                  
                   message='Mobiliario eliminado com sucesso!!'
                   status= 'success'
                   return JsonResponse({'status':status, 'message': message })
            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


def exportar_Mobiliario_excel(request):
    # Criar workbook e folha
    workbook = openpyxl.Workbook()
    folha = workbook.active
    folha.title = 'Mobiliario'

    query = '''
                SELECT 
                dm.id,
                dm.descricao,
                dm.data_entrada,
                dm.serial_number,
                dm.obs,
                dm.tipo,
                dm.provinencia,
                dm.provinencia,
                dm.carateristica,
                kec.descricao as conselho,
                IFNULL(ds.descricao,'') as sala
                FROM mobiliarios_mobiliario dm
                left join kit_eleitoral_conselho as kec on dm.conselho=kec.id
                left join departamentos_sala as ds on dm.sala=ds.id
                WHERE dm.STATUS=1
              '''
    with connection.cursor() as cursor:
                    cursor.execute(query)

                    colunas = [col[0] for col in cursor.description] 
                    resultados = [dict(zip(colunas, row)) for row in cursor.fetchall()]
                    print(resultados)

                  # Cabeçalhos
                    folha.append(['id','Data Entrada', 'Mobiliario','provinencia','Localização','Sala','Serial Number','carateristica','Tipo Item','Obs'])

                    # Dados
                    for equipamento in resultados:
                        folha.append([equipamento['id'], equipamento['data_entrada'], equipamento['descricao'],equipamento['provinencia'],equipamento['conselho'],equipamento['sala'],equipamento['serial_number'],equipamento['carateristica'],equipamento['tipo'],equipamento['obs']])
                    # Preparar resposta HTTP
                    response = HttpResponse(
                        content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    )
                    response['Content-Disposition'] = 'attachment; filename=Mobiliario_Excel.xlsx'
                    workbook.save(response)

    return response