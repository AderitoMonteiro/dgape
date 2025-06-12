from django.shortcuts import render,get_object_or_404
from .models import equipamento,kit_eleit,conselho
from departamentos.models import mobiliario, equipamento as equipamento_departamento
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse,JsonResponse
from datetime import datetime
from django.db import connection
from django.core.paginator import Paginator
from django.core.serializers import serialize
from django.db.models import Q
import openpyxl
from django.db.models import Subquery




def gestao_kit_eleitoral(request):

            conselho_lis = conselho.objects.all().filter(status=1)  
            portatel  = equipamento_departamento.objects.all().filter(tipo="Portatel")  
            impressora  = equipamento_departamento.objects.all().filter(tipo="Impressora",status=1) 
            mala  = mobiliario.objects.all().filter(tipo="Mala",status=1) 
            tripe  = mobiliario.objects.all().filter(tipo="Tripe",status=1) 
            scaner  = equipamento_departamento.objects.all().filter(tipo="Scaner Impresão Digital",status=1)
            camera  = equipamento_departamento.objects.all().filter(tipo="Camara Fotografica",status=1) 
            assinatura  = equipamento_departamento.objects.all().filter(tipo="Capitura Assinatura",status=1) 
            cabo  = mobiliario.objects.all().filter(tipo="Acessórios eletrônicos",status=1)   
            banquinho  = mobiliario.objects.all().filter(tipo="Banquinho",status=1)   
               

            try:
                query = '''     SELECT 
                                KE.id as id, 
                                KE.cres_id as cres_id, 
                                KE.status as status, 
                                KE.malas as malas, 
                                ml.descricao as malas_descricao,
                                scaner.descricao as scaner_impresao_digital,
                                KE.impresora_id as impresora, 
                                KE.guia_entrega as guia_entrega,
                                KE.data_saida as data_saida,
                                kec.descricao as descricao,
                                eq.descricao as equipamento,
                                imp.descricao as impressora,
                                eq.serial_number as serial_number_portatel,
                                imp.serial_number as serial_number_impressora,
                                ass.descricao as capitura_assinatura,
                                cm.descricao as camara_fotografica
                                FROM kit_eleitoral_kit_eleit as KE
                                left JOIN kit_eleitoral_conselho as kec on ke.cres_id=kec.id
                                left JOIN departamentos_equipamento as eq on KE.portatel_id=eq.id
                                left JOIN departamentos_equipamento as imp on KE.impresora_id=imp.id
                                left JOIN departamentos_equipamento as scaner on KE.Scaner_impresao_digital=scaner.id
                                left JOIN departamentos_equipamento as ass on KE.capitura_assinatura=ass.id
                                left JOIN departamentos_equipamento as cm on KE.camera_fotografia=cm.id
                                left JOIN departamentos_mobiliario as ml on KE.malas=ml.id
                                where KE.status=1
                            '''
                with connection.cursor() as cursor:
                 cursor.execute(query)
                
                 colunas = [col[0] for col in cursor.description] 
                 resultados = [dict(zip(colunas, row)) for row in cursor.fetchall()]
                 paginator = Paginator(resultados, 5)
                 page_number = request.GET.get("page",1)  
                 paginator_kit_list = paginator.get_page(page_number)

                 if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                            return render(request, 'Kit_eleitoral/index.html',{"conselho":conselho_lis,"kit_eleitoral":paginator_kit_list,"portatel":portatel,"impressora":impressora,"mala":mala,"scaner":scaner,"camera":camera,"assinatura":assinatura,"tripe":tripe,"Cabo":cabo,"Banquinho":banquinho})
             

                return render(request, 'Kit_eleitoral/index.html',{"conselho":conselho_lis,"kit_eleitoral":paginator_kit_list,"portatel":portatel,"impressora":impressora,"mala":mala,"scaner":scaner,"camera":camera,"assinatura":assinatura,"tripe":tripe,"Cabo":cabo,"Banquinho":banquinho})

            except Exception as e:
                  return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def add_kit(request):
  
  if request.method == "POST":
            try:
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
                     tripe = request.POST.get("tripe")
                     cabo = request.POST.get("cabo")
                     banquinho = request.POST.get("banquinho")
                     user_create = request.POST.get("user_create")

                     if tripe !="" and cabo !="" and banquinho !="" and conselho !="" and malas !=""  and portatel !="" and impressora !=""and Scaner_impresao_digital !=""and capitura_assinatura !="" and cama_fotografia !=""and guia_entrega !="" and data_saida !="":

                    
                                    kit_eleit.objects.create(
                                                                cres_id = conselho,
                                                                malas = malas,
                                                                portatel_id = portatel,
                                                                impresora_id = impressora,
                                                                Scaner_impresao_digital = Scaner_impresao_digital,
                                                                capitura_assinatura = capitura_assinatura,
                                                                camera_fotografia = cama_fotografia,
                                                                guia_entrega = guia_entrega,
                                                                tripe_id = tripe,
                                                                banquinho_id=banquinho,
                                                                cabo_id=cabo,
                                                                status=1,
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
                                KE.cres_id as cres_id, 
                                KE.status as status, 
                                KE.malas as malas, 
                                ml.descricao as malas_descricao, 
                                scaner.descricao as scaner_impresao_digital,
                                scaner.id as scaner_impresao_digital_id,
                                KE.impresora_id as impresora_id, 
                                KE.guia_entrega as guia_entrega,
                                KE.data_saida as data_saida,
                                kec.descricao as descricao,
                                eq.descricao as equipamento,
                                eq.id as portatel_id,
                                imp.descricao as impressora,
                                eq.serial_number as serial_number_portatel,
                                imp.serial_number as serial_number_impressora,
                                ass.descricao as capitura_assinatura,
                                ass.id as capitura_assinatura_id,
                                cm.descricao as camara_fotografica,
                                cm.id as camara_fotografica_id,
                                tp.id as tripe_id,
                                cb.id as cabo_id,
                                bq.id as banquinho_id,
                                KE.obs
                                FROM kit_eleitoral_kit_eleit as KE
                                left JOIN kit_eleitoral_conselho as kec on ke.cres_id=kec.id
                                left JOIN departamentos_equipamento as eq on KE.portatel_id=eq.id
                                left JOIN departamentos_equipamento as imp on KE.impresora_id=imp.id
                                left JOIN departamentos_equipamento as scaner on KE.Scaner_impresao_digital=scaner.id
                                left JOIN departamentos_equipamento as ass on KE.capitura_assinatura=ass.id
                                left JOIN departamentos_equipamento as cm on KE.camera_fotografia=cm.id
                                left JOIN departamentos_mobiliario as ml on KE.malas=ml.id
                                left JOIN departamentos_mobiliario as tp on KE.tripe_id=tp.id
                                left JOIN departamentos_mobiliario as cb on KE.cabo_id=cb.id
                                left JOIN departamentos_mobiliario as bq on KE.banquinho_id=bq.id
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
                     malas_id = request.POST.get("malas")
                     user_update = request.POST.get("user_update")
                     obs_edit = request.POST.get("obs_edit")

                     kit_el_edit=get_object_or_404(kit_eleit,id=kit_el_id)
                     kit_el_edit.user_update=user_update
                     kit_el_edit.malas=malas_id
                     kit_el_edit.datecreate=datetime.now()
                     kit_el_edit.obs=obs_edit
                     kit_el_edit.save()
                                  
                                                                  
                     message='Kit alterado com sucesso!!'
                     status= 'success'
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
                      paginator = Paginator(equipamento_list, 5)
                      page_number = request.GET.get("page")  
                      paginator_equipamento = paginator.get_page(page_number)
                  
                      return render(request, 'Equipamento_kit/index.html',{"equipamento":paginator_equipamento})

@csrf_exempt
def add_equipamento(request):
  
  if request.method == "POST":
            try:
                    descricao= request.POST.get("descricao")
                    marca= request.POST.get("marca")
                    
                    data_entrada = request.POST.get("data_entrada")
                    tipo_item = request.POST.get("tipo_item")
                    localizacao = request.POST.get("localizacao")
                    obs = request.POST.get("obs")
                    modelo= request.POST.get("modelo")
                    serial_number= request.POST.get("serial_number")
                    mac_address= request.POST.get("mac_address")
                    any_desk= request.POST.get("any_desk")
                    user_create= request.POST.get("user_create")

                    if data_entrada !="" and descricao !="" and marca !="" and data_entrada !="" and serial_number !="" and tipo_item !="" and localizacao !="":
                     
                      validate=equipamento.objects.filter(descricao=descricao,marca=marca,data_aquisicao=data_entrada,serial_number=serial_number).count()

                      if validate==0:

                                    equipamento.objects.create(
                                                                  descricao=descricao,
                                                                  marca=marca,
                                                                  modelo=modelo,
                                                                  serial_number=serial_number,
                                                                  mac_address=mac_address,
                                                                  any_dask=any_desk,
                                                                  user_create=user_create,
                                                                  data_aquisicao = data_entrada,
                                                                  tipo_item = tipo_item,
                                                                  localizacao = localizacao,
                                                                  obs = obs
                                                                  )
                                    message='Item registado com sucesso!!'
                                    status= 'success'
                                    return JsonResponse({'status':status, 'message': message })

                      else:
                            message='Erro, este equipamento já está registado!!'
                            status= 'error'
                            return JsonResponse({'status':status, 'message': message })
                    else:
                      message='Erro, tem que preencher todos os campos obrigatorios!!'
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
                    localizacao_edit= request.POST.get("localizacao_edit")
                    obs_edit= request.POST.get("obs_edit")
                    user_update= request.POST.get("user_create")
                    equipamento_id= request.POST.get("equipamento_id")


                    equipamento_ob=get_object_or_404(equipamento,id=equipamento_id)
                    equipamento_ob.localizacao=localizacao_edit
                    equipamento_ob.obs=obs_edit
                    equipamento_ob.user_update=user_update
                    equipamento_ob.dateupdate=datetime.now()
                    equipamento_ob.save()
                                                                  
                    message='Item alterado com sucesso!!'
                    status= 'success'
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
                                                                  
                    message='Item eliminado com sucesso!!'
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
                                                                  
                   message='Item eliminado com sucesso!!'
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


@csrf_exempt
def get_all_patrimonio(request):

   if request.method == "POST":
      try:
                      conselho_id = request.POST.get("conselho_id")

                      mala_kit_lansado = kit_eleit.objects.values('malas').filter(status=1)
                      tripe_list_lansado = kit_eleit.objects.values('tripe_id').filter(status=1)
                      equipamento_p_lansado = kit_eleit.objects.values('portatel_id').filter(status=1)
                      equipamento_i_lansado = kit_eleit.objects.values('impresora_id').filter(status=1)
                      scaner_impresao_digital_lansado = kit_eleit.objects.values('Scaner_impresao_digital').filter(status=1)
                      capitura_assinatura_lansado = kit_eleit.objects.values('capitura_assinatura').filter(status=1)
                      camara_fotografica_lansado = kit_eleit.objects.values('camera_fotografia').filter(status=1)

                     
                      mobiliario_list= mobiliario.objects.exclude(id__in=Subquery(mala_kit_lansado)).filter(tipo="Mala",status=1)
                      tripe_list= mobiliario.objects.exclude(id__in=Subquery(tripe_list_lansado)).filter(tipo="Tripe",status=1)
                      equipamento_p = equipamento_departamento.objects.exclude(id__in=Subquery(equipamento_p_lansado)).filter(tipo="Portatel",status=1)
                      equipamento_i = equipamento_departamento.objects.exclude(id__in=Subquery(equipamento_i_lansado)).filter(tipo="Impressora",status=1)
                      scaner_impresao_digital= equipamento_departamento.objects.exclude(id__in=Subquery(scaner_impresao_digital_lansado)).filter(tipo="Scaner Impresão Digital",status=1)
                      capitura_assinatura= equipamento_departamento.objects.exclude(id__in=Subquery(capitura_assinatura_lansado)).filter(tipo="Capitura Assinatura",status=1)
                      camara_fotografica= equipamento_departamento.objects.exclude(id__in=Subquery(camara_fotografica_lansado)).filter(tipo="Camara Fotografica",status=1)

                      Acessorios_eletronicos= mobiliario.objects.filter(tipo="Acessórios eletrônicos",status=1)
                      banquinho= mobiliario.objects.filter(tipo="Banquinho",status=1)


                     
                      return JsonResponse({'banquinho': serialize("json", banquinho),'Acessorios_eletronicos': serialize("json", Acessorios_eletronicos),'tripe': serialize("json", tripe_list),'mala': serialize("json", mobiliario_list),'portatel': serialize("json", equipamento_p),'impressora': serialize("json", equipamento_i),'scaner_impresao_digital': serialize("json", scaner_impresao_digital),'capitura_assinatura': serialize("json", capitura_assinatura),'camara_fotografica': serialize("json", camara_fotografica)})

      except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


def exportar_kit_excel(request):
    # Criar workbook e folha
    workbook = openpyxl.Workbook()
    folha = workbook.active
    folha.title = 'Kit'

    query = '''
                SELECT 
                KE.id as id, 
                KE.cres_id as cres_id, 
                KE.status as status, 
                KE.malas as malas, 
                ml.descricao as malas_descricao,
                scaner.descricao as scaner_impresao_digital,
                KE.impresora_id as impresora, 
                KE.guia_entrega as guia_entrega,
                KE.data_saida as data_saida,
                kec.descricao as descricao,
                eq.descricao as equipamento,
                imp.descricao as impressora,
                eq.serial_number as serial_number_portatel,
                imp.serial_number as serial_number_impressora,
                ass.descricao as capitura_assinatura,
                cm.descricao as camara_fotografica,
                KE.obs,
                tp.descricao as tripe,
                acessorio.descricao as acessorio,
                bq.descricao as banquinho
                FROM kit_eleitoral_kit_eleit as KE
                left JOIN kit_eleitoral_conselho as kec on ke.cres_id=kec.id
                left JOIN departamentos_equipamento as eq on KE.portatel_id=eq.id
                left JOIN departamentos_equipamento as imp on KE.impresora_id=imp.id
                left JOIN departamentos_equipamento as scaner on KE.Scaner_impresao_digital=scaner.id
                left JOIN departamentos_equipamento as ass on KE.capitura_assinatura=ass.id
                left JOIN departamentos_equipamento as cm on KE.camera_fotografia=cm.id
                left JOIN departamentos_equipamento as ml on KE.malas=ml.id
                left JOIN departamentos_mobiliario as tp on KE.tripe_id=tp.id
                left JOIN departamentos_mobiliario as acessorio on KE.cabo_id=acessorio.id
                left JOIN departamentos_mobiliario as bq on KE.banquinho_id=bq.id
                where KE.status=1
              '''
    with connection.cursor() as cursor:
                    cursor.execute(query)

                    colunas = [col[0] for col in cursor.description] 
                    resultados = [dict(zip(colunas, row)) for row in cursor.fetchall()]

                  # Cabeçalhos
                    folha.append(['id','CRES', 'Mala','Portatel','Impressora','Scanner Impresão Digital','Capitura Assinatura','Camera Fotografica','Tripe','Cabo','Banquinho','Guia Entrega','Data Saida','Obs'])

                    # Dados
                    for kit in resultados:
                        folha.append([kit['id'], kit['descricao'], kit['malas_descricao'],kit['equipamento'],kit['impressora'],kit['scaner_impresao_digital'],kit['capitura_assinatura'],kit['camara_fotografica'],kit['tripe'],kit['acessorio'],kit['banquinho'],kit['guia_entrega'],kit['data_saida'],kit['obs']])
                    # Preparar resposta HTTP
                    response = HttpResponse(
                        content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    )
                    response['Content-Disposition'] = 'attachment; filename=Kit_Excel.xlsx'
                    workbook.save(response)

    return response
