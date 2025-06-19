from django.shortcuts import render,get_object_or_404
from .models import equipamento
from departamentos.models import sala
from mobiliarios.models import mobiliario
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
                                equipamentos_equipamento.id,
                                equipamentos_equipamento.descricao,
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
                                equipamentos_equipamento
                                left join departamentos_sala on equipamentos_equipamento.sala=departamentos_sala.id
                                left join kit_eleitoral_conselho on equipamentos_equipamento.conselho=kit_eleitoral_conselho.id
                                where equipamentos_equipamento.status=1 order by equipamentos_equipamento.id desc
                                '''
                      else:
                          
                          query = '''
                                SELECT 
                                equipamentos_equipamento.id,
                                equipamentos_equipamento.descricao,
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
                                equipamentos_equipamento
                                left join departamentos_sala on equipamentos_equipamento.sala=departamentos_sala.id
                                left join kit_eleitoral_conselho on equipamentos_equipamento.conselho=kit_eleitoral_conselho.id
                                where equipamentos_equipamento.status=1 order by equipamentos_equipamento.id desc
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

@csrf_exempt
def get_equipamento(request):

    if request.method == "POST":
      try:
        
                      equipamento_id = request.POST.get("equipamento_id")

                      query = ''' select 
                                  equipamentos_equipamento.id,
                                  equipamentos_equipamento.descricao,
                                  mac_address,
                                  data_entrada,
                                  marca,
                                  modelo,
                                  provinencia,
                                  obs,
                                  serial_number,
                                  tipo,
                                  IFNULL(departamentos_sala.descricao,'') as sala,
                                  departamentos_sala.id as sala_id,
                                  kit_eleitoral_conselho.descricao as descricao_conselho,
                                  kit_eleitoral_conselho.id as conselho_id
                                  from 
                                  equipamentos_equipamento
                                  left join departamentos_sala on equipamentos_equipamento.sala=departamentos_sala.id
                                  left join kit_eleitoral_conselho on equipamentos_equipamento.conselho=kit_eleitoral_conselho.id
                                  where equipamentos_equipamento.id=%s'''
                      with connection.cursor() as cursor:
                          cursor.execute(query,[equipamento_id])
                          
                          colunas = [col[0] for col in cursor.description] 
                          equipament = [dict(zip(colunas, row)) for row in cursor.fetchall()]
                          print(equipament)
                     
                          return JsonResponse({'resultado': equipament})

      except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

  
@csrf_exempt
def editar_equipamento(request):
  
  if request.method == "POST":
            try:
                    equipamento_id = request.POST.get("equipamento_id")
                    obs= request.POST.get("obs")
                    serial_number= request.POST.get("serial_number")
                    conselho= request.POST.get("conselho_edit")
                    sala_id= request.POST.get("sala_id")
                    mac_address= request.POST.get("mac_address")
                    user_update= request.POST.get("user_create")

                    if conselho=="23":

                            if sala_id!="":

                                  equipamento_ob=get_object_or_404(equipamento,id=equipamento_id)
                                  equipamento_ob.obs=obs
                                  equipamento_ob.sala=sala_id
                                  equipamento_ob.conselho=conselho
                                  equipamento_ob.user_update=user_update
                                  equipamento_ob.dateupdate=datetime.now()
                                  equipamento_ob.save()
                                                                                
                                  message='Equipamento alterado com sucesso!!'
                                  status= 'success'
                                  return JsonResponse({'status':status, 'message': message })
                            else:
                              message='Erro, tem que preencher os campos abrigatorio!!'
                              status= 'error'
                              return JsonResponse({'status':status, 'message': message })

                    else:
                          
                          if conselho!="":

                              equipamento_ob=get_object_or_404(equipamento,id=equipamento_id)
                              equipamento_ob.obs=obs
                              equipamento_ob.conselho=conselho
                              equipamento_ob.sala=""
                              equipamento_ob.user_update=user_update
                              equipamento_ob.dateupdate=datetime.now()
                              equipamento_ob.save()
                                                                            
                              message='Equipamento alterado com sucesso!!'
                              status= 'success'
                              return JsonResponse({'status':status, 'message': message })

                          else:
                              message='Erro, tem que preencher os campos abrigatorio!!'
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
                                                                  
                    message='Equipamento eliminado com sucesso!!'
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
                                                                  
                   message='Equipamento eliminado com sucesso!!'
                   status= 'success'
                   return JsonResponse({'status':status, 'message': message })
            except Exception as e:
                return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


def exportar_equipamento_excel(request):
    # Criar workbook e folha
    workbook = openpyxl.Workbook()
    folha = workbook.active
    folha.title = 'Equipamento'

    query = '''
                SELECT 
                equipamentos_equipamento.id,
                equipamentos_equipamento.descricao,
                mac_address,
                data_entrada,
                provinencia,
                marca,
                modelo,
                obs,
                serial_number,
                tipo,
                IFNULL(departamentos_sala.descricao,'') as sala,
                kit_eleitoral_conselho.descricao as conselho
                FROM 
                equipamentos_equipamento
                left join departamentos_sala on equipamentos_equipamento.sala=departamentos_sala.id
                left join kit_eleitoral_conselho on equipamentos_equipamento.conselho=kit_eleitoral_conselho.id
                where equipamentos_equipamento.status=1
              '''
    with connection.cursor() as cursor:
                    cursor.execute(query)

                    colunas = [col[0] for col in cursor.description] 
                    resultados = [dict(zip(colunas, row)) for row in cursor.fetchall()]
                    print(resultados)

                  # Cabeçalhos
                    folha.append(['id','Data Entrada', 'Equipamento','provinencia','Localização','Sala','Modelo','Serial Number','Mac Addres','Marca','Tipo Item','Obs'])
                    folha.font = Font(bold=True)

                    # Dados
                    for equipamento in resultados:
                        folha.append([equipamento['id'], equipamento['data_entrada'], equipamento['descricao'],equipamento['provinencia'],equipamento['conselho'],equipamento['sala'],equipamento['modelo'],equipamento['serial_number'],equipamento['mac_address'],equipamento['marca'],equipamento['tipo'],equipamento['obs']])
                    # Preparar resposta HTTP
                    response = HttpResponse(
                        content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    )
                    response['Content-Disposition'] = 'attachment; filename=Equipamento_Excel.xlsx'
                    workbook.save(response)

    return response
         