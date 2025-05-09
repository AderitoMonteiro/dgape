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
    const portatel = document.getElementById('portatel').value;
    const impressora = document.getElementById('impressora').value;
    const Scaner_impresao_digital = document.getElementById('Scaner_impresao_digital').value;
    const capitura_assinatura = document.getElementById('capitura_assinatura').value;
    const cama_fotografia = document.getElementById('cama_fotografia').value;
    const guia_entrega = document.getElementById('guia_entrega').value;
    const data_saida = document.getElementById('data_saida').value;
    const id_user = document.getElementById('id_user').value;
    


    // Dados para enviar
    const data = {
        "data_aquisicao": data_aquisicao,
        "conselho": conselho,
        "malas": malas,
        "portatel": portatel,
        "impressora": impressora,
        "Scaner_impresao_digital": Scaner_impresao_digital,
        "capitura_assinatura": capitura_assinatura,
        "cama_fotografia": cama_fotografia,
        "guia_entrega": guia_entrega,
        "data_saida": data_saida,
        "user_create": id_user,
        "X-CSRFToken": getCSRFToken()
    };

    // Configuração da requisição
    jqOld.ajax({
        url: '../add/',
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

function get_kit(button){

    let kit_id=button.getAttribute("data-id");
 
    const data = {
     "kit_id": kit_id
     };
 
     jqOld.ajax({
         url: '../get/kit_editar/',
         type: 'POST',
         data: data,
         success: function (data) {
 
            const jsonString = JSON.stringify(data);  
            const result = JSON.parse(jsonString);               
             
            document.getElementById("data_aquisicao_edit").value= result.resultado[0].data_aquisicao;
            document.getElementById("conselho_edit").value= result.resultado[0].cres_id;
            document.getElementById("malas_edit").value= result.resultado[0].malas;
            document.getElementById("portatel_edit").value= result.resultado[0].id_portatel;
            document.getElementById("impressora_edit").value= result.resultado[0].id_impressora;
            document.getElementById("Scaner_impresao_digital_edit").value= result.resultado[0].scaner_impresao_digital;
            document.getElementById("capitura_assinatura_edit").value= result.resultado[0].capitura_assinatura;
            document.getElementById("portatel_edit").value= result.resultado[0].id_portatel;
            document.getElementById("impressora_edit").value= result.resultado[0].id_impressora;
            document.getElementById("cama_fotografia_edit").value= result.resultado[0].camara_fotografica;
            document.getElementById("guia_entrega_edit").value= result.resultado[0].guia_entrega;
            document.getElementById("data_saida_edit").value= result.resultado[0].data_saida;
            document.getElementById("kit_el_id").value= result.resultado[0].id;

          },
         error: function (xhr, status, error) {
 
             alert('Erro: ' + xhr.responseJSON.message);
         } 
     });
 }

 function edit_kit() {
 
     
    const data_aquisicao = document.getElementById('data_aquisicao_edit').value;
    const conselho = document.getElementById('conselho_edit').value;
    const malas = document.getElementById('malas_edit').value;
    const portatel = document.getElementById('portatel_edit').value;
    const impressora = document.getElementById('impressora_edit').value;
    const Scaner_impresao_digital = document.getElementById('Scaner_impresao_digital_edit').value;
    const capitura_assinatura = document.getElementById('capitura_assinatura_edit').value;
    const cama_fotografia = document.getElementById('cama_fotografia_edit').value;
    const guia_entrega = document.getElementById('guia_entrega_edit').value;
    const data_saida = document.getElementById('data_saida_edit').value;
    const id_user = document.getElementById('id_user_edit').value;
    const kit_el_id = document.getElementById('kit_el_id').value;


    // Dados para enviar
    const data = {
        "data_aquisicao": data_aquisicao,
        "conselho": conselho,
        "malas": malas,
        "portatel": portatel,
        "impressora": impressora,
        "Scaner_impresao_digital": Scaner_impresao_digital,
        "capitura_assinatura": capitura_assinatura,
        "cama_fotografia": cama_fotografia,
        "guia_entrega": guia_entrega,
        "data_saida": data_saida,
        "user_update": id_user,
        "kit_el_id": kit_el_id,
        "X-CSRFToken": getCSRFToken()
    };

    // Configuração da requisição
    jqOld.ajax({
        url: '../edit/',
        type: 'POST',
        data: data,
        success: function (data) {


            let divPai = document.getElementById("alerta_edit");
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

function get_kit_delete(button){
 
    let equipamento_id=button.getAttribute("data-id");
    document.getElementById('kit_delete').value=equipamento_id;
 
 }

 function delete_kit() {
 
 
    const kit_id = document.getElementById('kit_delete').value;
    const id_users = document.getElementById('id_user_delete').value;


    // Dados para enviar
    const data = {
        "kit_id": kit_id,
        "user_update": id_users,
        "X-CSRFToken": getCSRFToken()
    };

    // Configuração da requisição
    jqOld.ajax({
        url: '../delete/',
        type: 'POST',
        data: data,
        success: function (data) {

            let divPai = document.getElementById("alerta_delete");
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

document.getElementById("id_deleteCk").addEventListener("click", function () {

    let checkboxes = document.querySelectorAll(".kit-checkbox:checked");
    if (checkboxes.length === 0) {

            let divPai = document.getElementById("alerta_delete_cheekbox");
            let divalert = document.createElement("div");

            divPai.innerHTML = ''
            divPai.setAttribute("style", "display: block!important;margin: 0 auto; width: 40%;  margin-top: 10px;  text-align: center;font-size: 15px;");
            divalert.setAttribute("class","alert alert-danger");
            divalert.setAttribute( "role","alert");
            divalert.innerHTML = "Selecione pelo menos um para eliminar.";
            divPai.appendChild(divalert);

        return;
    } else {

        let kit_ids = Array.from(checkboxes).map(checkbox => checkbox.value).join(",");
        let user_id = document.getElementById('id_user_delete').value;
        let url;

       

        const data = {
            "id": kit_ids,
            "id_user":user_id,
            "X-CSRFToken": getCSRFToken()
        };
        // Configuração da requisição
        jqOld.ajax({
            url: "../checkbox/",
            type: 'POST',
            data: data,
            success: function (data) {
                    

            let divPai = document.getElementById("alerta_delete_cheekbox");
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

});

