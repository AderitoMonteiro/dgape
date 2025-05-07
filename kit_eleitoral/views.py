from django.shortcuts import render
from .models import kit_el,conselho
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse,JsonResponse
from datetime import datetime
from django.db import connection



def gestao_kit_eleitoral(request):

            conselho_lis = conselho.objects.all().filter(status=1)     
            try:
                query = ''' SELECT 
                            kit_el.id as kit_el_id,
                            kit_el.data_aquisicao,
                            kit_el.cres_id, 
                            kit_el.status, 
                            kit_el.malas, 
                            kit_el.kit,
                            kit_el.any_dask,
                            kit_el.serial_number, 
                            kit_el.mac, 
                            kit_el.portatel, 
                            kit_el.impresora, 
                            kit_el.scaner_impresao_digital,
                            kit_el.capitura_assinatura,
                            kit_el.camara_fotografica,
                            kit_el.guia_entrega,
                            kit_el.data_saida,
                            kec.descricao as descricao
                            FROM kit_eleitoral_kit_el as kit_el
                            inner join kit_eleitoral_conselho as kec on kit_el.cres_id=kec.id
                            '''
                with connection.cursor() as cursor:
                 cursor.execute(query)
                 print(cursor.fetchall())

                colunas = [col[0] for col in cursor.description] 
                resultados = [dict(zip(colunas, row)) for row in cursor.fetchall()]

                paginator = Paginator(resultados, 7)
                page_number = request.GET.get("page")  
                paginator_kit_list = paginator.get_page(page_number)
              
              
                print(paginator_kit_list)
                return render(request, 'Kit_eleitoral/index.html',{"conselho":conselho_lis,"kit_el":paginator_kit_list})

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
                     user_create = request.POST.get("user_create")

                     if data_aquisicao !="" and conselho !="" and malas !="" and any_dask !="" and kit !="" and portatel !="" and impressora !=""and Scaner_impresao_digital !=""and capitura_assinatura !="" and cama_fotografia !=""and guia_entrega !="" and data_saida !="" and serial_number !="" and mac_address !="":

                                    kit_el.objects.create(
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