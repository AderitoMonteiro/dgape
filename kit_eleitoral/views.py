from django.shortcuts import render
from .models import kit_eleit,conselho
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse,JsonResponse
from datetime import datetime
from django.db import connection
from django.core.paginator import Paginator



def gestao_kit_eleitoral(request):

            conselho_lis = conselho.objects.all().filter(status=1)     
            try:
                query = '''     SELECT 
                                KE.id as id, 
                                KE.data_aquisicao as data_aquisicao,
                                KE.cres_id as cres_id, 
                                KE.status as status, 
                                KE.malas as malas, 
                                KE.kit as kit ,
                                KE.any_dask as any_dask,
                                KE.serial_number as serial_number, 
                                KE.mac as mac, 
                                KE.portatel as portatel, 
                                KE.impresora as impresora, 
                                KE.scaner_impresao_digital as scaner_impresao_digital,
                                KE.capitura_assinatura as capitura_assinatura,
                                KE.camara_fotografica as camara_fotografica,
                                KE.guia_entrega as guia_entrega,
                                KE.data_saida as data_saida,
                                kec.descricao as descricao
                                FROM kit_eleitoral_kit_eleit as KE
                                INNER JOIN kit_eleitoral_conselho as kec on ke.cres_id=kec.id
                                where KE.status=1
                            '''
                with connection.cursor() as cursor:
                 cursor.execute(query)
                
                 colunas = [col[0] for col in cursor.description] 
                 resultados = [dict(zip(colunas, row)) for row in cursor.fetchall()]
                 paginator = Paginator(resultados, 7)
                 page_number = request.GET.get("page")  
                 paginator_kit_list = paginator.get_page(page_number)
             

                return render(request, 'Kit_eleitoral/index.html',{"conselho":conselho_lis,"kit_eleitoral":paginator_kit_list})

            except Exception as e:
                  return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@csrf_exempt
def add_kit(request):
  
  if request.method == "POST":
            try:
                     data_aquisicao = request.POST.get("data_aquisicao")
                     conselho = request.POST.get("conselho")
                     malas = request.POST.get("malas")
                     any_dask = request.POST.get("any_dask")
                     kit = request.POST.get("kit")
                     portatel = request.POST.get("portatel")
                     impressora = request.POST.get("impressora")
                     Scaner_impresao_digital = request.POST.get("Scaner_impresao_digital")
                     capitura_assinatura = request.POST.get("capitura_assinatura")
                     cama_fotografia = request.POST.get("cama_fotografia")
                     guia_entrega = request.POST.get("guia_entrega")
                     data_saida = request.POST.get("data_saida")
                     serial_number = request.POST.get("serial_number")
                     mac_address = request.POST.get("mac_address")
                     user_create = request.POST.get("id_user")

                     if data_aquisicao !="" and conselho !="" and malas !="" and any_dask !="" and kit !="" and portatel !="" and impressora !=""and Scaner_impresao_digital !=""and capitura_assinatura !="" and cama_fotografia !=""and guia_entrega !="" and data_saida !="" and serial_number !="" and mac_address !="":

                                    kit_eleitoral.objects.create(
                                                                data_aquisicao = data_aquisicao,
                                                                cres_id = conselho,
                                                                malas = malas,
                                                                any_dask = any_dask,
                                                                kit = kit,
                                                                portatel = portatel,
                                                                impresora = impressora,
                                                                scaner_impresao_digital = Scaner_impresao_digital,
                                                                capitura_assinatura = capitura_assinatura,
                                                                camara_fotografica = cama_fotografia,
                                                                guia_entrega = guia_entrega,
                                                                data_saida = data_saida,
                                                                serial_number=serial_number,
                                                                mac=mac_address,
                                                                user_create=user_create,
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