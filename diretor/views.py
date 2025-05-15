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
                    CONCAT(cr.first_name,' ',cr.last_name) as user_create
                    FROM 
                    departamentos_inventario_equipamento as die
                    inner join departamentos_equipamento as de on die.equipamento_id=de.id
                    inner join auth_user as cr on cr.id=die.user_create
                    where die.status=1
                '''
    with connection.cursor() as cursor:
          cursor.execute(query)


          colunas = [col[0] for col in cursor.description] 
          resultados = [dict(zip(colunas, row)) for row in cursor.fetchall()]

          paginator = Paginator(resultados, 7)
          page_number = request.GET.get("page")  
          paginator_equipamento_inventario = paginator.get_page(page_number)


    return render(request, 'Diretor_inventario_equipamento/index.html',{"equipamento":equipamento_list,"equipamento_inventario":paginator_equipamento_inventario})
