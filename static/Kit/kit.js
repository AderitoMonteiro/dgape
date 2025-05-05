function getCSRFToken() {
    return document.querySelector('meta[name="csrf-token"]').getAttribute("content");
}

function slowReload() {
    setTimeout(() => {
        location.reload();
    }, 2000); // 2 segundos
}


function add_kit() {

    
    const data_aquisicao = document.getElementById('data_aquisicao').value;
    const conselho = document.getElementById('conselho').value;
    const malas = document.getElementById('malas').value;
    const any_dask = document.getElementById('any_dask').value;
    const kit = document.getElementById('kit').value;
    const portatel = document.getElementById('kit').value;
    const impressora = document.getElementById('impressora').value;
    const Scaner_impresao_digital = document.getElementById('Scaner_impresao_digital').value;
    const capitura_assinatura = document.getElementById('capitura_assinatura').value;
    const cama_fotografia = document.getElementById('cama_fotografia').value;
    const guia_entrega = document.getElementById('guia_entrega').value;
    const data_saida = document.getElementById('data_saida').value;
    const serial_number = document.getElementById('serial_number').value;
    const mac_address = document.getElementById('mac_address').value;
    const id_user = document.getElementById('id_user').value;
    


    // Dados para enviar
    const data = {
        "data_aquisicao": data_aquisicao,
        "conselho": conselho,
        "malas": malas,
        "any_dask": any_dask,
        "kit": any_dask,
        "portatel": portatel,
        "impressora": impressora,
        "Scaner_impresao_digital": Scaner_impresao_digital,
        "capitura_assinatura": capitura_assinatura,
        "cama_fotografia": cama_fotografia,
        "guia_entrega": guia_entrega,
        "data_saida": data_saida,
        "serial_number": serial_number,
        "mac_address": mac_address,
        "user_create": id_user,
        "X-CSRFToken": getCSRFToken()
    };

    // Configuração da requisição
    jqOld.ajax({
        url: 'add/',
        type: 'POST',
        data: data,
        success: function (data) {

            let divPai = document.getElementById("alerta");
            let divalert = document.createElement("div");


            if (data.status == 'success') {
                
                divPai.innerHTML = ''

                divPai.setAttribute("style", "display: block!important;margin: 0 auto; width: 40%;  margin-top: 10px;  text-align: center;font-size: 15px;");
                divalert.setAttribute("class","alert alert-success");
                divalert.setAttribute( "role","alert");
                divalert.innerHTML = data.message;
                divPai.appendChild(divalert);
                slowReload()

            } else {

                divPai.innerHTML = ''
                
                divPai.setAttribute("style", "display: block!important;margin: 0 auto; width: 40%;  margin-top: 10px;  text-align: center; font-size: 15px;");
                divalert.setAttribute("class","alert alert-danger");
                divalert.setAttribute( "style","text-align;");
                divalert.setAttribute( "role","alert");
                divalert.innerHTML = data.message;
                divPai.appendChild(divalert);

                setTimeout(() => {
                    divPai.setAttribute("style", "display: none!important;margin: 0 auto; width: 40%;  margin-top: 10px;  text-align: center; font-size: 15px;");
                }, 9000);
            }


           

        },
        error: function (xhr, status, error) {
            alert('Erro: ' + xhr.responseJSON.message);
        }
    });

}