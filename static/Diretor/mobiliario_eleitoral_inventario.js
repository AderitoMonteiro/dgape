function getCSRFToken() {
    return document.querySelector('meta[name="csrf-token"]').getAttribute("content");
}

function slowReload() {
    setTimeout(() => {
        location.reload();
    }, 2000); // 2 segundos
}


document.getElementById("id_deleteCkunlok").addEventListener("click", function () {

    let checkboxes = document.querySelectorAll(".mobiliario-checkbox:checked");
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
            url: "unlock_mobiliario_eleitoral_checkbox/",
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

document.getElementById("id_mobiliario_inventario_deleteCk").addEventListener("click", function () {

    let checkboxes = document.querySelectorAll(".mobiliario-checkbox:checked");
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
            url: "lock_mobiliario_eleitoral_checkbox/",
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

function get_mobiliario_inventario(button){

    let mobiliario_inventario_id=button.getAttribute("data-id");
 
    const data = {
     "mobiliario_id":mobiliario_inventario_id,
     "X-CSRFToken": getCSRFToken()
     };
 
     jqOld.ajax({
         url: '../get/mobiliario_eleitoral_editar/',
         type: 'POST',
         data: data,
         success: function (data) {
 
             
            document.getElementById('data_entrada_edit').value=data.resultado[0].data_entrada
            document.getElementById('provinencia_edit').value=data.resultado[0].provinencia
            document.getElementById('mobiliario_edit').value=data.resultado[0].mobiliario_id
            document.getElementById('localizacao_edit').value=data.resultado[0].localizacao
            document.getElementById('id_inventario_mobiliario').value=data.resultado[0].id
            document.getElementById('obs_edit').value=data.resultado[0].obs

            document.getElementById('data_entrada_edit').disabled=true
            document.getElementById('provinencia_edit').disabled=true
            document.getElementById('mobiliario_edit').disabled=true
            document.getElementById('localizacao_edit').disabled=true
            document.getElementById('obs_edit').disabled=true
            document.getElementById('editar_mobiliario').disabled=true
           
 
          },
         error: function (xhr, status, error) {
 
             alert('Erro: ' + xhr.responseJSON.message);
         } 
     });
 }

 function get_mobiliario_eleitoral_block_inventario(button){

    document.getElementById('id_lock_mobiliario').value=button.getAttribute("data-id");
 
 }
 function get_mobiliario_eleitoral_unblock_inventario(button){

    document.getElementById('id_unlock_mobil').value=button.getAttribute("data-id");
 
 }


 function bloquear_mobiliario_eleitoral_inventario(){

    let inventario_mobiliario_id= document.getElementById('id_lock_mobiliario').value;
    let user_update= document.getElementById('id_user').value;
 
    const data = {
     "inventario_mobiliario_id":inventario_mobiliario_id,
     "user_update":user_update,
     "X-CSRFToken": getCSRFToken()
     };
 
     jqOld.ajax({
         url: 'lock_mobiliario_eleitoral_inventario/',
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

 function desbloquear_mobiliario_eleitoral_inventario(){

    let inventario_mobiliario_id= document.getElementById('id_unlock_mobil').value;
    let user_update= document.getElementById('id_user').value;
 
    const data = {
     "inventario_mobiliario_id":inventario_mobiliario_id,
     "user_update":user_update,
     "X-CSRFToken": getCSRFToken()
     };
 
     jqOld.ajax({
         url: 'unlock_mobiliario_eleitoral_inventario/',
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