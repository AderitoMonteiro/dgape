function getCSRFToken() {
    return document.querySelector('meta[name="csrf-token"]').getAttribute("content");
}

function slowReload() {
    setTimeout(() => {
        location.reload();
    }, 2000); // 2 segundos
}

document.getElementById("id_deleteCk_equip_lock").addEventListener("click", function () {

    let checkboxes = document.querySelectorAll(".equipamento-checkbox:checked");
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

        let equipamento_ids = Array.from(checkboxes).map(checkbox => checkbox.value).join(",");
        let user_id = document.getElementById('id_user').value;
        let url;

       

        const data = {
            "id": equipamento_ids,
            "id_user":user_id,
            "X-CSRFToken": getCSRFToken()
        };
        // Configuração da requisição
        jqOld.ajax({
            url: "inventario_equipamento/lock_equipamento_eleitoral_checkbox/",
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

document.getElementById("id_deleteCkunlok").addEventListener("click", function () {

    let checkboxes = document.querySelectorAll(".equipamento-checkbox:checked");
    if (checkboxes.length === 0) {

            let divPai = document.getElementById("alerta_unlock_cheekbox");
            let divalert = document.createElement("div");

            divPai.innerHTML = ''
            divPai.setAttribute("style", "display: block!important;margin: 0 auto; width: 40%;  margin-top: 10px;  text-align: center;font-size: 15px;");
            divalert.setAttribute("class","alert alert-danger");
            divalert.setAttribute( "role","alert");
            divalert.innerHTML = "Selecione pelo menos um para bloquear.";
            divPai.appendChild(divalert);
            slowReload()
        return;
    } else {

        let equipamento_ids = Array.from(checkboxes).map(checkbox => checkbox.value).join(",");
        let user_id = document.getElementById('id_user').value;
        let url;

       

        const data = {
            "id": equipamento_ids,
            "id_user":user_id,
            "X-CSRFToken": getCSRFToken()
        };
        // Configuração da requisição
        jqOld.ajax({
            url: "inventario_equipamento/unlock_equipamento_eleitoral_checkbox/",
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

function get_equipamento(button){

    let quipamento_inventario_id=button.getAttribute("data-id");
 
    const data = {
     "equipamento_id":quipamento_inventario_id,
     "X-CSRFToken": getCSRFToken()
     };
 
     jqOld.ajax({
         url: 'get/equipamento_eleitoral_editar/',
         type: 'POST',
         data: data,
         success: function (data) {
              
            document.getElementById("provinencia_edit").value= data.resultado[0].provinencia;
            document.getElementById("data_entrada_edit").value= data.resultado[0].data_entrada;
            document.getElementById("obs_edit").value= data.resultado[0].obs;
            document.getElementById("equipamento_edit").value=data.resultado[0].equipamento_id;
            document.getElementById("localizacao_edit").value=data.resultado[0].localizacao;


            document.getElementById("provinencia_edit").disabled=true;
            document.getElementById("data_entrada_edit").disabled=true;
            document.getElementById("obs_edit").disabled=true;
            document.getElementById("equipamento_edit").disabled=true;
            document.getElementById("localizacao_edit").disabled=true;
            document.getElementById("edit_equipamento").disabled=true;

          
 
          },
         error: function (xhr, status, error) {
 
             alert('Erro: ' + xhr.responseJSON.message);
         } 
     });
 }

 function get_equipamento_eleitoral_block_inventario(button){

    document.getElementById('id_lock_equipamento').value=button.getAttribute("data-id");
 
 }

 function get_equipamento_eleitoral_unblock_inventario(button){

    document.getElementById('id_unlock_equipamento').value=button.getAttribute("data-id");
 
 }

 function bloquear_equipamento_eleitoral_inventario(){

    let inventario_equipamento_id= document.getElementById('id_lock_equipamento').value;
    let user_update= document.getElementById('id_user').value;
 
    const data = {
     "inventario_equipamento_id":inventario_equipamento_id,
     "user_update":user_update,
     "X-CSRFToken": getCSRFToken()
     };
 
     jqOld.ajax({
         url: 'inventario_equipamento/lock_equipamento_eleitoral_inventario/',
         type: 'POST',
         data: data,
         success: function (data) {
            
 
            let divPai = document.getElementById("lock_equipamento_alert");
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


 function desbloquear_equipamento_eleitoral_inventario(){

    let inventario_equipamento_id= document.getElementById('id_unlock_equipamento').value;
    let user_update= document.getElementById('id_user').value;
 
    const data = {
     "inventario_equipamento_id":inventario_equipamento_id,
     "user_update":user_update,
     "X-CSRFToken": getCSRFToken()
     };
 
     jqOld.ajax({
         url: 'inventario_equipamento/unlock_equipamento_eleitoral_inventario/',
         type: 'POST',
         data: data,
         success: function (data) {
            
 
            let divPai = document.getElementById("alerta_unlok");
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
