from django.shortcuts import render,get_object_or_404
from .models import equipamento,kit_eleit,conselho
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse,JsonResponse
from datetime import datetime
from django.db import connection
from django.core.paginator import Paginator
from django.core.serializers import serialize
from django.db.models import Q
import openpyxl



def gestao_kit_eleitoral(request):

            conselho_lis = conselho.objects.all().filter(status=1)  
            equipament  = equipamento.objects.all().filter(~Q(mac_address=""),status=1)
            impressora  = equipamento.objects.all().filter(mac_address="",status=1)   

            try:
                query = '''     SELECT 
                                KE.id as id, 
                                KE.data_aquisicao as data_aquisicao,
                                KE.cres_id as cres_id, 
                                KE.status as status, 
                                KE.malas as malas, 
                                KE.equipamento_id as portatel, 
                                KE.impresora_id as impresora, 
                                KE.scaner_impresao_digital as scaner_impresao_digital,
                                KE.capitura_assinatura as capitura_assinatura,
                                KE.camara_fotografica as camara_fotografica,
                                KE.guia_entrega as guia_entrega,
                                KE.data_saida as data_saida,
                                kec.descricao as descricao,
                                eq.descricao as equipamento,
                                imp.descricao as impressora,
                                eq.serial_number as serial_number_portatel,
                                imp.serial_number as serial_number_impressora
                                FROM kit_eleitoral_kit_eleit as KE
                                INNER JOIN kit_eleitoral_conselho as kec on ke.cres_id=kec.id
                                INNER JOIN kit_eleitoral_equipamento as eq on KE.equipamento_id=eq.id
                                INNER JOIN kit_eleitoral_equipamento as imp on KE.impresora_id=imp.id
                                where KE.status=1
                            '''
                with connection.cursor() as cursor:
                 cursor.execute(query)
                
                 colunas = [col[0] for col in cursor.description] 
                 resultados = [dict(zip(colunas, row)) for row in cursor.fetchall()]
                 paginator = Paginator(resultados, 7)
                 page_number = request.GET.get("page")  
                 paginator_kit_list = paginator.get_page(page_number)
             

                return render(request, 'Kit_eleitoral/index.html',{"conselho":conselho_lis,"kit_eleitoral":paginator_kit_list,"equipamento":equipament,"impressora":impressora})

            except Exception as e:
                  return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def add_kit(request):
  
  if request.method == "POST":
            try:
                     data_aquisicao = request.POST.get("data_aquisicao")
                     conselho = request.POST.get("conselho")
                     malas = request.POST.get("malas")
                     portatel = request.POST.get("portatel")
                     impressora = request.POST.get("impressora")
                     Scaner_impresao_digital = request.POST.get("Scaner_impresao_digital")
                     capitura_assinatura = request.POST.get("capitura_assinatura")
                     cama_fotografia = request.POST.get("cama_fotografia")
                     guia_entrega = request.POST.get("guia_entrega")
                     data_saida = request.POST.get("data_saida")
                     obs = request.POST.get("obs")
                     user_create = request.POST.get("user_create")

                     if data_aquisicao !="" and conselho !="" and malas !=""  and portatel !="" and impressora !=""and Scaner_impresao_digital !=""and capitura_assinatura !="" and cama_fotografia !=""and guia_entrega !="" and data_saida !="":

                    
                                    kit_eleit.objects.create(
                                                                data_aquisicao = data_aquisicao,
                                                                cres_id = conselho,
                                                                malas = malas,
                                                                equipamento_id = portatel,
                                                                impresora_id = impressora,
                                                                scaner_impresao_digital = Scaner_impresao_digital,
                                                                capitura_assinatura = capitura_assinatura,
                                                                camara_fotografica = cama_fotografia,
                                                                guia_entrega = guia_entrega,
                                                                data_saida = data_saida,
                                                                user_create=user_create,
                                                                obs=obs,
                                                                datecreate=datetime.now()
                                                                  )
                                    message='Kit registado com sucesso!!'
                                    status= 'success'
                                    return JsonResponse({'status':status, 'message': message })

                     else:
                            message='Erro, tem que preencher todos os campos obrigatorios!!'
                            status= 'error'
                            return JsonResponse({'status':status, 'message': message })
                

            except Exception as e:
               return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def get_kit(request):

    kit_id= request.POST.get("kit_id")


    if request.method == "POST":

            try:
                  query = '''   SELECT 
                                KE.id as id, 
                                KE.data_aquisicao as data_aquisicao,
                                KE.cres_id as cres_id, 
                                KE.status as status, 
                                KE.malas as malas, 
                                KE.equipamento_id as portatel, 
                                KE.impresora_id as impresora, 
                                KE.scaner_impresao_digital as scaner_impresao_digital,
                                KE.capitura_assinatura as capitura_assinatura,
                                KE.camara_fotografica as camara_fotografica,
                                KE.guia_entrega as guia_entrega,
                                KE.data_saida as data_saida,
                                kec.descricao as descricao,
                                eq.descricao as equipamento,
                                imp.descricao as impressora,
                                eq.serial_number as serial_number_portatel,
                                imp.serial_number as serial_number_impressora,
                                eq.id as id_portatel,
                                imp.id as id_impressora,
                                eq.marca as marca,
                                eq.modelo as modelo,
                                eq.mac_address as mac_address,
                                eq.any_dask as any_dask,
                                KE.obs as obs
                                FROM kit_eleitoral_kit_eleit as KE
                                INNER JOIN kit_eleitoral_conselho as kec on ke.cres_id=kec.id
                                INNER JOIN kit_eleitoral_equipamento as eq on KE.equipamento_id=eq.id
                                INNER JOIN kit_eleitoral_equipamento as imp on KE.impresora_id=imp.id
                                where KE.id=%s
                            '''
                  with connection.cursor() as cursor:
                      cursor.execute(query,[kit_id])

                      colunas = [col[0] for col in cursor.description] 
                      resultados = [dict(zip(colunas, row)) for row in cursor.fetchall()]
                     
                  return JsonResponse({'resultado': resultados})

            except Exception as e:
                  return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def editar_kit(request):
  
  if request.method == "POST":
            try:
                     kit_el_id = request.POST.get("kit_el_id")
                     data_aquisicao = request.POST.get("data_aquisicao")
                     conselho = request.POST.get("conselho")
                     malas = request.POST.get("malas")
                     portatel = request.POST.get("portatel")
                     impressora = request.POST.get("impressora")
                     Scaner_impresao_digital = request.POST.get("Scaner_impresao_digital")
                     capitura_assinatura = request.POST.get("capitura_assinatura")
                     cama_fotografia = request.POST.get("cama_fotografia")
                     guia_entrega = request.POST.get("guia_entrega")
                     data_saida = request.POST.get("data_saida")
                     user_update = request.POST.get("user_update")
                     obs_edit = request.POST.get("obs_edit")

                     if data_aquisicao !="" and conselho !="" and malas !=""  and portatel !="" and impressora !=""and Scaner_impresao_digital !=""and capitura_assinatura !="" and cama_fotografia !=""and guia_entrega !="" and data_saida !="":


                                    kit_el_edit=get_object_or_404(kit_eleit,id=kit_el_id)
                                    kit_el_edit.data_aquisicao = data_aquisicao
                                    kit_el_edit.cres_id = conselho
                                    kit_el_edit.malas = malas
                                    kit_el_edit.portatel = portatel
                                    kit_el_edit.impresora = impressora
                                    kit_el_edit.scaner_impresao_digital = Scaner_impresao_digital
                                    kit_el_edit.capitura_assinatura = capitura_assinatura
                                    kit_el_edit.camara_fotografica = cama_fotografia
                                    kit_el_edit.guia_entrega = guia_entrega
                                    kit_el_edit.data_saida = data_saida
                                    kit_el_edit.user_update=user_update
                                    kit_el_edit.datecreate=datetime.now()
                                    kit_el_edit.obs=obs_edit
                                    kit_el_edit.save()
                                  
                                                                  
                                    message='Kit alterado com sucesso!!'
                                    status= 'success'
                                    return JsonResponse({'status':status, 'message': message })

                     else:
                        message='Erro, tem que preencher todos os campos obrigatorios!!'
                        status= 'error'
                        return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def delete_kit(request):
  
  if request.method == "POST":
            try:
                    kit_id = request.POST.get("kit_id")
                    user_update= request.POST.get("user_update")

                    kit_ob=get_object_or_404(kit_eleit,id=kit_id)
                    kit_ob.status=0
                    kit_ob.user_update=user_update
                    kit_ob.dateupdate=datetime.now()
                    kit_ob.save()
                                                                  
                    message='Kit eliminado com sucesso!!'
                    status= 'success'
                    return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def delete_kit_checkbox(request):
  
  if request.method == "POST":
            try:
                   id_eq= request.POST.get("id")
                   id_user= request.POST.get("id_user")

                   if id_eq:
                         id_eqs = id_eq.split(",") 
                         kit_eleit.objects.filter(id__in=id_eqs).update(status=0,user_update=id_user,dateupdate=datetime.now())
                                                                  
                   message='Kit eliminado com sucesso!!'
                   status= 'success'
                   return JsonResponse({'status':status, 'message': message })
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

def gestao_equipamento(request):

                      

                      equipamento_list = equipamento.objects.all().filter(status=1)
                      paginator = Paginator(equipamento_list, 7)
                      page_number = request.GET.get("page")  
                      paginator_equipamento = paginator.get_page(page_number)
                  
                      return render(request, 'Equipamento_kit/index.html',{"equipamento":paginator_equipamento})

@csrf_exempt
def add_equipamento(request):
  
  if request.method == "POST":
            try:
                    descricao= request.POST.get("descricao")
                    marca= request.POST.get("marca")
                    modelo= request.POST.get("modelo")
                    serial_number= request.POST.get("serial_number")
                    mac_address= request.POST.get("mac_address")
                    any_desk= request.POST.get("any_desk")
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
                                                                any_dask=any_desk,
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
                                                                  
                    message='Equipamento eliminado com sucesso!!'
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
                         equipamento.objects.filter(id__in=id_mbs).update(status=0,user_update=id_user,dateupdate=datetime.now())
                                                                  
                   message='Equipamento eliminado com sucesso!!'
                   status= 'success'
                   return JsonResponse({'status':status, 'message': message })
            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


def gestao_impressora(request):

                      

                      equipamento_list = equipamento.objects.all().filter(status=1)
                      paginator = Paginator(equipamento_list, 7)
                      page_number = request.GET.get("page")  
                      paginator_equipamento = paginator.get_page(page_number)
                  
                      return render(request, 'Impressora_kit/index.html',{"equipamento":paginator_equipamento})

def exportar_kit_excel(request):
    # Criar workbook e folha
    workbook = openpyxl.Workbook()
    folha = workbook.active
    folha.title = 'Kit Eleitoral'

    query = '''   SELECT 
                                KE.id as id, 
                                KE.data_aquisicao as data_aquisicao,
                                kec.descricao as conselho,
                                KE.malas as malas, 
                                KE.equipamento_id as portatel, 
                                KE.impresora_id as impresora, 
                                KE.scaner_impresao_digital as scaner_impresao_digital,
                                KE.capitura_assinatura as capitura_assinatura,
                                KE.camara_fotografica as camara_fotografica,
                                KE.guia_entrega as guia_entrega,
                                KE.data_saida as data_saida,
                                eq.descricao as portatel,
                                imp.descricao as impressora,
                                eq.serial_number as serial_number_portatel,
                                imp.serial_number as serial_number_impressora,
                                eq.id as id_portatel,
                                imp.id as id_impressora,
                                eq.marca as marca_portatel,
                                eq.modelo as modelo_portatel,
                                imp.marca as marca_impressora,
                                imp.modelo as modelo_impressora,
                                eq.mac_address as mac_address,
                                eq.any_dask as  any_dask_portatel,
                                imp.any_dask as any_dask_impressora
                                FROM kit_eleitoral_kit_eleit as KE
                                INNER JOIN kit_eleitoral_conselho as kec on ke.cres_id=kec.id
                                INNER JOIN kit_eleitoral_equipamento as eq on KE.equipamento_id=eq.id
                                INNER JOIN kit_eleitoral_equipamento as imp on KE.impresora_id=imp.id
                                where KE.status=1
                            '''
    with connection.cursor() as cursor:
                    cursor.execute(query)

                    colunas = [col[0] for col in cursor.description] 
                    resultados = [dict(zip(colunas, row)) for row in cursor.fetchall()]

                  # Cabeçalhos
                    folha.append(['id','Data Aquisicao', 'Conselho', 'Malas','Portatel','Serial Number portatel','Marca Portatel','Modelo Portatel','Mac Address','Any Desk Portatel','Impressora','Marca Impressora','Modelo Impressora','Serial Number Impressora','Any Desk Impressora','Scanner Impressao Digital','Capitura Assinatura','Camara Fotografica','Guia Entrega','Data Saida'])

                    # Dados
                    for kit in resultados:
                        folha.append([kit['id'],kit['data_aquisicao'], kit['conselho'], kit['malas'],kit['portatel'],kit['serial_number_portatel'],kit['marca_portatel'],kit['modelo_portatel'],kit['mac_address'],kit['any_dask_portatel'],kit['marca_impressora'],kit['modelo_impressora'],kit['serial_number_impressora'],kit['any_dask_impressora'],kit['scaner_impresao_digital'],kit['capitura_assinatura'],kit['camara_fotografica'],kit['camara_fotografica'],kit['guia_entrega'],kit['data_saida']])

                    # Preparar resposta HTTP
                    response = HttpResponse(
                        content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    )
                    response['Content-Disposition'] = 'attachment; filename=Kit_eleitoral.xlsx'
                    workbook.save(response)

    return response