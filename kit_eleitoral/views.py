from django.shortcuts import render
from .models import kit_eleitoral,conselho
def gestao_kit_eleitoral(request):

    conselho_lis = conselho.objects.all().filter(status=1)     

    
    return render(request, 'Kit_eleitoral/index.html',{"conselho":conselho_lis})