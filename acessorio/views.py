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
from openpyxl.styles import Font
import openpyxl


def gestao_acessorio(request):
   
    sidebar=request.GET.get('modulo')

    if sidebar=='gestao':
     
          query = '''
                        SELECT 
                        dm.id,
                        dm.descricao,
                        dm.data_entrada,
                        dm.obs,
                        dm.provinencia,
                        dm.provinencia,
                        dm.carateristica,
                        dm.serial_number,
                        kec.descricao as conselho,
                        IFNULL(ds.descricao,'') as sala,
                        'get_acessorio_gestao(this)' as sidebar,
                        'sidebar_gestao' as sidebar_descricao
                        FROM acessorio_acessorios dm
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
                    dm.obs,
                    dm.provinencia,
                    dm.provinencia,
                    dm.carateristica,
                    dm.serial_number,
                    kec.descricao as conselho,
                    IFNULL(ds.descricao,'') as sala,
                    'get_acessorio(this)' as sidebar,
                    'sidebar_lancamento' as sidebar_descricao
                    FROM acessorio_acessorios dm
                    left join kit_eleitoral_conselho as kec on dm.conselho=kec.id
                    left join departamentos_sala as ds on dm.sala=ds.id
                    WHERE dm.STATUS=1 order by dm.id desc
                '''

    
    conselho_list = conselho.objects.all().filter(status=1)
    sala_list = sala.objects.all().filter(status=1)
    componente ='acessorio'
  
    with connection.cursor() as cursor:
          cursor.execute(query)
          colunas = [col[0] for col in cursor.description] 
          acessorios_list = [dict(zip(colunas, row)) for row in cursor.fetchall()]

          paginator = Paginator(acessorios_list, 7)
          page_number = request.GET.get("page",1)  
          paginator_acessorios = paginator.get_page(page_number)

          if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                   return render(request, 'Acessorio/index.html',{"acessorio":paginator_acessorios,"conselho":conselho_list,"sala":sala_list,"componente":componente})

    return render(request, 'Acessorio/index.html',{"acessorio":paginator_acessorios,"conselho":conselho_list,"sala":sala_list,"componente":componente})

@csrf_exempt
def add_acessorio(request):
  
  
  if request.method == "POST":
            try:
                    descricao= request.POST.get("descricao")
                    data_entrada= request.POST.get("data_entrada")
                    obs= request.POST.get("obs")
                    provinencia = request.POST.get("provinencia")
                    carateristica = request.POST.get("carateristica")
                    serial_number = request.POST.get("serial_number")
                    sala_id= request.POST.get("sala_id")
                    conselho= request.POST.get("conselho")
                    user_create= request.POST.get("user_create")

                            
                    if conselho!="23":
                        if descricao !="" and data_entrada !="" and conselho!="":

                                acessorios.objects.create(

                                    descricao=descricao,
                                    data_entrada=data_entrada,
                                    obs=obs,
                                    provinencia=provinencia,
                                    serial_number=serial_number,
                                    carateristica=carateristica,
                                    conselho=conselho,
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
                                if descricao !="" and data_entrada !="" and conselho!="" and sala_id!="" :

                                                                                  acessorios.objects.create(
                                                                                                              descricao=descricao,
                                                                                                              data_entrada=data_entrada,
                                                                                                              obs=obs,
                                                                                                              conselho=conselho,
                                                                                                              carateristica=carateristica,
                                                                                                              serial_number=serial_number,
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
                                  dm.provinencia,
                                  dm.provinencia,
                                  dm.carateristica,
                                  dm.serial_number,
                                  kec.descricao as conselho,
                                  kec.id as conselho_id,
                                  IFNULL(ds.descricao,'') as sala,
                                  IFNULL(ds.id,'') as sala_id
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

  
@csrf_exempt
def editar_acessorio(request): 
  
  if request.method == "POST":
            try:
                    acessorio_id = request.POST.get("acessorio_id")
                    descricao= request.POST.get("descricao")
                    data_entrada= request.POST.get("data_entrada")
                    provinencia= request.POST.get("provinencia")
                    conselh= request.POST.get("conselho_edit")
                    serial_number= request.POST.get("serial_number")
                    sala_id= request.POST.get("sala_id")
                    carateristica= request.POST.get("carateristica")
                    obs= request.POST.get("obs")
                    user_update= request.POST.get("user_update")

                    if conselh!="23":

                                if serial_number !="" and conselh!="" and descricao !="" and data_entrada !="" and provinencia !="" and conselh !="" and carateristica !="":

                                        acessorio_ob=get_object_or_404(acessorios,id=acessorio_id)
                                        acessorio_ob.descricao=descricao
                                        acessorio_ob.data_entrada=data_entrada
                                        acessorio_ob.provinencia=provinencia
                                        acessorio_ob.serial_number=serial_number
                                        acessorio_ob.obs=obs
                                        acessorio_ob.carateristica=carateristica
                                        acessorio_ob.sala=0
                                        acessorio_ob.conselho=conselh
                                        acessorio_ob.user_update=user_update
                                        acessorio_ob.dateupdate=datetime.now()
                                        acessorio_ob.save()
                                                                      
                                        message='Acessorio alterado com sucesso!!'
                                        status= 'success'
                                        return JsonResponse({'status':status, 'message': message })
                                else:
                                        message='Erro, tem que preencher todos os campos obrigatorios!!'
                                        status= 'error'
                                        return JsonResponse({'status':status, 'message': message })



                    else:
                               if serial_number !="" and conselh!="" and sala_id!="" and descricao !="" and data_entrada !="" and provinencia !="" and conselh !="" and carateristica !="":
                                
                                    acessorio_ob=get_object_or_404(acessorios,id=acessorio_id)
                                    acessorio_ob.descricao=descricao
                                    acessorio_ob.data_entrada=data_entrada
                                    acessorio_ob.provinencia=provinencia
                                    acessorio_ob.serial_number=serial_number
                                    acessorio_ob.obs=obs
                                    acessorio_ob.carateristica=carateristica
                                    acessorio_ob.sala=sala_id
                                    acessorio_ob.conselho=conselh
                                    acessorio_ob.user_update=user_update
                                    acessorio_ob.dateupdate=datetime.now()
                                    acessorio_ob.save()
                                                                  
                                    message='Acessorio alterado com sucesso!!'
                                    status= 'success'
                                    return JsonResponse({'status':status, 'message': message })
                               else:
                                    message='Erro, tem que preencher todos os campos obrigatorios!!'
                                    status= 'error'
                                    return JsonResponse({'status':status, 'message': message })
                        

                  
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def editar_acessorio_gestao(request): 
  
  if request.method == "POST":
            try:    
                    acessorio_id = request.POST.get("acessorio_id")
                    conselh= request.POST.get("conselho_edit")
                    sala_id= request.POST.get("sala_id")
                    obs= request.POST.get("obs")
                    user_update= request.POST.get("user_update")

                    if conselh!="23":

                                if conselh !="":

                                        acessorio_ob=get_object_or_404(acessorios,id=acessorio_id)
                                        acessorio_ob.obs=obs
                                        acessorio_ob.sala=0
                                        acessorio_ob.conselho=conselh
                                        acessorio_ob.user_update=user_update
                                        acessorio_ob.dateupdate=datetime.now()
                                        acessorio_ob.save()
                                                                      
                                        message='Acessorio alterado com sucesso!!'
                                        status= 'success'
                                        return JsonResponse({'status':status, 'message': message })
                                else:
                                        message='Erro, tem que preencher todos os campos obrigatorios!!'
                                        status= 'error'
                                        return JsonResponse({'status':status, 'message': message })



                    else:
                               if   sala_id!="" and conselh !="" and obs !="":
                                
                                    acessorio_ob=get_object_or_404(acessorios,id=acessorio_id)
                                    acessorio_ob.obs=obs
                                    acessorio_ob.sala=sala_id
                                    acessorio_ob.conselho=conselh
                                    acessorio_ob.user_update=user_update
                                    acessorio_ob.dateupdate=datetime.now()
                                    acessorio_ob.save()
                                                                  
                                    message='Acessorio alterado com sucesso!!'
                                    status= 'success'
                                    return JsonResponse({'status':status, 'message': message })
                               else:
                                    message='Erro, tem que preencher todos os campos obrigatorios!!'
                                    status= 'error'
                                    return JsonResponse({'status':status, 'message': message })
                        

                  
         

            except Exception as e:
             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
def exportar_acessorio_excel(request):
    # Criar workbook e folha
    workbook = openpyxl.Workbook()
    folha = workbook.active
    folha.title = 'Acessorio'

    query = '''
                SELECT 
                dm.id,
                dm.descricao,
                dm.data_entrada,
                dm.obs,
                dm.tipo,
                dm.provinencia,
                dm.carateristica,
                kec.descricao as conselho,
                kec.id as conselho_id,
                IFNULL(ds.descricao,'') as sala,
                ds.id as sala_id
                FROM acessorio_acessorios dm
                left join kit_eleitoral_conselho as kec on dm.conselho=kec.id
                left join departamentos_sala as ds on dm.sala=ds.id
              '''
    with connection.cursor() as cursor:
                    cursor.execute(query)

                    colunas = [col[0] for col in cursor.description] 
                    resultados = [dict(zip(colunas, row)) for row in cursor.fetchall()]

                  # Cabeçalhos
                    folha.append(['id','Descricao', 'Data Entrada','Tipo','Provinencia','Carateristica','Conselho','sala','Obs'])

                    # Dados
                    for kit in resultados:
                        folha.append([kit['id'], kit['descricao'], kit['data_entrada'],kit['tipo'],kit['provinencia'],kit['carateristica'],kit['sala'],kit['obs']])
                    # Preparar resposta HTTP
                    response = HttpResponse(
                        content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    )
                    response['Content-Disposition'] = 'attachment; filename=Acessorio_Excel.xlsx'
                    workbook.save(response)

    return response

