function getCSRFToken() {
    return document.querySelector('meta[name="csrf-token"]').getAttribute("content");
}

function slowReload() {
    setTimeout(() => {
        location.reload();
    }, 2000); // 2 segundos
}

document.getElementById("id_deleteCk_kit_lock").addEventListener("click", function () {

    let checkboxes = document.querySelectorAll(".kit-checkbox:checked");
    if (checkboxes.length === 0) {

            let divPai = document.getElementById("alerta_lock_cheekbox");
            let divalert = document.createElement("div");

            divPai.innerHTML = ''
            divPai.setAttribute("style", "display: block!important;margin: 0 auto; width: 40%;  margin-top: 10px;  text-align: center;font-size: 15px;");
            divalert.setAttribute("class","alert alert-danger");
            divalert.setAttribute( "role","alert");
            divalert.innerHTML = "Selecione pelo menos um para bloquear.";
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
            url: "lock_bloquear_kit_checkbox/",
            type: 'POST',
            data: data,
            success: function (data) {
                    

            let divPai = document.getElementById("alerta_lock_cheekbox");
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

document.getElementById("id_deleteCk_mob_unlock").addEventListener("click", function () {

    let checkboxes = document.querySelectorAll(".kit-checkbox:checked");
    if (checkboxes.length === 0) {

            let divPai = document.getElementById("alerta_unlock_cheekbox");
            let divalert = document.createElement("div");

            divPai.innerHTML = ''
            divPai.setAttribute("style", "display: block!important;margin: 0 auto; width: 40%;  margin-top: 10px;  text-align: center;font-size: 15px;");
            divalert.setAttribute("class","alert alert-danger");
            divalert.setAttribute( "role","alert");
            divalert.innerHTML = "Selecione pelo menos um para bloquear.";
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
            url: "unlock_bloquear_kit_checkbox/",
            type: 'POST',
            data: data,
            success: function (data) {
                    

            let divPai = document.getElementById("alerta_unlock_cheekbox");
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
             
            document.getElementById("conselho_edit").value= result.resultado[0].cres_id;
            document.getElementById("malas_edit").value= result.resultado[0].malas_descricao;
            document.getElementById("malas_edit").setAttribute("data-id",  result.resultado[0].malas);
            document.getElementById("portatel_edit").value= result.resultado[0].portatel_id;
            document.getElementById("impressora_edit").value= result.resultado[0].id_impressora;
            document.getElementById("Scaner_impresao_digital_edit").value= result.resultado[0].scaner_impresao_digital_id;
            document.getElementById("capitura_assinatura_edit").value= result.resultado[0].capitura_assinatura_id;
            document.getElementById("impressora_edit").value= result.resultado[0].impresora_id;
            document.getElementById("cama_fotografia_edit").value= result.resultado[0].camara_fotografica_id;
            document.getElementById("guia_entrega_edit").value= result.resultado[0].guia_entrega;
            document.getElementById("data_saida_edit").value= result.resultado[0].data_saida;
            document.getElementById("kit_el_id").value= result.resultado[0].id;
            document.getElementById("obs_edit").value= result.resultado[0].obs;


            document.getElementById("conselho_edit").disabled = true;
            document.getElementById("portatel_edit").disabled = true;
            document.getElementById("impressora_edit").disabled = true;
            document.getElementById("Scaner_impresao_digital_edit").disabled = true;
            document.getElementById("capitura_assinatura_edit").disabled = true;
            document.getElementById("impressora_edit").disabled = true;
            document.getElementById("cama_fotografia_edit").disabled = true;
            document.getElementById("guia_entrega_edit").disabled = true;
            document.getElementById("data_saida_edit").disabled = true;
            document.getElementById("editar_kit").disabled = true;
            document.getElementById("malas_edit").disabled = true;
            document.getElementById("obs_edit").disabled = true;


          },
         error: function (xhr, status, error) {
 
             alert('Erro: ' + xhr.responseJSON.message);
         } 
     });
 }


 function get_kit_block(button){

    document.getElementById('id_kit_lock').value=button.getAttribute("data-id");
 
 }
 function get_kit_unblock(button){

    document.getElementById('id_kit_unlock').value=button.getAttribute("data-id");
 
 }

 
 function bloquear_kit(){

    let id_lock= document.getElementById('id_kit_lock').value;
    let user_update= document.getElementById('id_user').value;
 
    const data = {
     "id_lock":id_lock,
     "user_update":user_update,
     "X-CSRFToken": getCSRFToken()
     };
 
     jqOld.ajax({
         url: 'lock_kit/',
         type: 'POST',
         data: data,
         success: function (data) {
            
 
            let divPai = document.getElementById("lock_kit_alert");
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

 function desbloquear_kit(){

    let id_unlock= document.getElementById('id_kit_unlock').value;
    let user_update= document.getElementById('id_user').value;
 
    const data = {
     "id_unlock":id_unlock,
     "user_update":user_update,
     "X-CSRFToken": getCSRFToken()
     };
 
     jqOld.ajax({
         url: 'unlock_kit/',
         type: 'POST',
         data: data,
         success: function (data) {
            
 
            let divPai = document.getElementById("unlock_mobiliario_alert");
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