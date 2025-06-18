from django.shortcuts import render,get_object_or_404
from .models import equipamento
from departamentos.models import sala,mobiliario

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
def add_equipamento(request):
  
  
  if request.method == "POST":
            try:
                    descricao= request.POST.get("descricao")
                    data_entrada= request.POST.get("data_entrada")
                    obs= request.POST.get("obs")
                    marca= request.POST.get("marca")
                    provinencia= request.POST.get("provinencia")
                    modelo= request.POST.get("modelo")
                    tipo_item= request.POST.get("tipo_item")
                    sala_id= request.POST.get("sala_id")
                    conselho= request.POST.get("conselho")
                    serial_number= request.POST.get("serial_number")
                    mac_address= request.POST.get("mac_address")
                    user_create= request.POST.get("user_create")

                    validate=equipamento.objects.filter(serial_number=serial_number).count()

                    if validate==0:
                       
                            if tipo_item =="Portatel":
                                            if conselho!="23":
                                                          if descricao !="" and marca !="" and modelo !="" and data_entrada !="" and conselho!=""and tipo_item!="" and serial_number!="" and mac_address !="":

                                                                    equipamento.objects.create(
                                                                                                descricao=descricao,
                                                                                                data_entrada=data_entrada,
                                                                                                obs=obs,
                                                                                                marca=marca,
                                                                                                modelo=modelo,
                                                                                                provinencia=provinencia,
                                                                                                conselho=conselho,
                                                                                                tipo=tipo_item,
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
                                                                if descricao !="" and marca !="" and modelo !="" and data_entrada !="" and conselho!="" and sala_id!="" and tipo_item!="" and serial_number!="" and mac_address !="":

                                                                                  equipamento.objects.create(
                                                                                                              descricao=descricao,
                                                                                                              data_entrada=data_entrada,
                                                                                                              obs=obs,
                                                                                                              marca=marca,
                                                                                                              modelo=modelo,
                                                                                                              conselho=conselho,
                                                                                                              tipo=tipo_item,
                                                                                                              provinencia=provinencia,
                                                                                                              sala=sala_id,
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

                                if conselho!="23":
                                                          if descricao !="" and marca !="" and modelo !="" and data_entrada !="" and conselho!=""and tipo_item!="" and serial_number!="":

                                                                    equipamento.objects.create(
                                                                                                descricao=descricao,
                                                                                                data_entrada=data_entrada,
                                                                                                obs=obs,
                                                                                                marca=marca,
                                                                                                modelo=modelo,
                                                                                                provinencia=provinencia,
                                                                                                conselho=conselho,
                                                                                                tipo=tipo_item,
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
                                                    if descricao !="" and marca !="" and modelo !="" and data_entrada !="" and conselho!="" and sala_id!="" and tipo_item!="" and serial_number!="":

                                                                      equipamento.objects.create(
                                                                                                  descricao=descricao,
                                                                                                  data_entrada=data_entrada,
                                                                                                  obs=obs,
                                                                                                  marca=marca,
                                                                                                  modelo=modelo,
                                                                                                  conselho=conselho,
                                                                                                  tipo=tipo_item,
                                                                                                  provinencia=provinencia,
                                                                                                  sala=sala_id,
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
                             message='Erro, este equipamento já foi registado!!'
                             status= 'error'
                             return JsonResponse({'status':status, 'message': message })

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


def gestao_equipamento(request):

                      conselho_lis = conselho.objects.all().filter(status=1)
                      sala_lis = sala.objects.all().filter(status=1)  
                      equipamento_list = equipamento.objects.all().filter(status=1)
                      componente ='equipamento'
                      sidebar=request.GET.get('modulo')

                      if sidebar=='gestao':

                          query = '''
                                SELECT 
                                departamentos_equipamento.id,
                                departamentos_equipamento.descricao,
                                mac_address,
                                data_entrada,
                                provinencia,
                                marca,
                                modelo,
                                obs,
                                serial_number,
                                tipo,
                                IFNULL(departamentos_sala.descricao,'') as sala,
                                kit_eleitoral_conselho.descricao as conselho,
                                'get_equipamento_gestao(this)' as sidebar,
                                'sidebar_gestao' as sidebar_descricao
                                FROM 
                                departamentos_equipamento
                                left join departamentos_sala on departamentos_equipamento.sala=departamentos_sala.id
                                left join kit_eleitoral_conselho on departamentos_equipamento.conselho=kit_eleitoral_conselho.id
                                where departamentos_equipamento.status=1 order by departamentos_equipamento.id desc
                                '''
                      else:
                          
                          query = '''
                                SELECT 
                                departamentos_equipamento.id,
                                departamentos_equipamento.descricao,
                                mac_address,
                                data_entrada,
                                provinencia,
                                marca,
                                modelo,
                                obs,
                                serial_number,
                                tipo,
                                IFNULL(departamentos_sala.descricao,'') as sala,
                                kit_eleitoral_conselho.descricao as conselho,
                                'get_equipamento(this)' as sidebar,
                                'sidebar_lancamento' as sidebar_descricao
                                FROM 
                                departamentos_equipamento
                                left join departamentos_sala on departamentos_equipamento.sala=departamentos_sala.id
                                left join kit_eleitoral_conselho on departamentos_equipamento.conselho=kit_eleitoral_conselho.id
                                where departamentos_equipamento.status=1 order by departamentos_equipamento.id desc
                                '''
                                

                      with connection.cursor() as cursor:
                          cursor.execute(query)

                          colunas = [col[0] for col in cursor.description] 
                          equipamento_list = [dict(zip(colunas, row)) for row in cursor.fetchall()]
                          paginator = Paginator(equipamento_list, 7)
                          page_number = request.GET.get("page",1)  
                          paginator_equipamento = paginator.get_page(page_number)

                          if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                             return render(request, 'Equipamento/index.html',{"equipamento":paginator_equipamento,"conselho":conselho_lis,"sala":sala_lis,"componente":componente})
                  
                      return render(request, 'Equipamento/index.html',{"equipamento":paginator_equipamento,"conselho":conselho_lis,"sala":sala_lis,"componente":componente})