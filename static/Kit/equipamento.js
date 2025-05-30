function getCSRFToken() {
    return document.querySelector('meta[name="csrf-token"]').getAttribute("content");
}

function slowReload() {
    setTimeout(() => {
        location.reload();
    }, 2000); // 2 segundos
}

document.getElementById("id_deleteCk").addEventListener("click", function () {

    let checkboxes = document.querySelectorAll(".equipamento-checkbox:checked");
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

        let equipamento_ids = Array.from(checkboxes).map(checkbox => checkbox.value).join(",");
        let user_id = document.getElementById('id_user_delete').value;
        let url;

       

        const data = {
            "id": equipamento_ids,
            "id_user":user_id,
            "X-CSRFToken": getCSRFToken()
        };
        // Configuração da requisição
        jqOld.ajax({
            url: "../checkbox_equipamento/",
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

document.getElementById("id_equipamento_eleitoral_deleteCk").addEventListener("click", function () {

    let checkboxes = document.querySelectorAll(".equipamento-checkbox:checked");
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

        let equipamento_ids = Array.from(checkboxes).map(checkbox => checkbox.value).join(",");
        let user_id = document.getElementById('id_user_delete').value;
        let url;

       

        const data = {
            "id": equipamento_ids,
            "id_user":user_id,
            "X-CSRFToken": getCSRFToken()
        };
        // Configuração da requisição
        jqOld.ajax({
            url: "checkbox/",
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

function get_equipamento(button){

    let equipamento_id=button.getAttribute("data-id");
 
    const data = {
     "equipamento_id":equipamento_id
     };
 
     jqOld.ajax({
         url: '../get/equipamento_editar/',
         type: 'POST',
         data: data,
         success: function (data) {
 
             const datajs = JSON.parse(data);
             
             document.getElementById("data_entrada_edit").value= datajs[0].fields.data_aquisicao;
             document.getElementById("descricao_edit").value= datajs[0].fields.descricao;
             document.getElementById("marca_edit").value=datajs[0].fields.marca;
             document.getElementById("modelo_edit").value=datajs[0].fields.modelo;
             document.getElementById("serial_number_edit").value=datajs[0].fields.serial_number;
             document.getElementById("mac_address_edit").value=datajs[0].fields.mac_address;
             document.getElementById("tipo_item_edit").value=datajs[0].fields.tipo_item;
             document.getElementById("any_desk_edit").value=datajs[0].fields.any_dask;
             document.getElementById("localizacao_edit").value=datajs[0].fields.localizacao;
             document.getElementById("obs_edit").value=datajs[0].fields.obs;
             document.getElementById("equipamento_id").value=equipamento_id;

             document.getElementById("data_entrada_edit").disabled = true;
             document.getElementById("modelo_edit").disabled = true;
             document.getElementById("descricao_edit").disabled = true;
             document.getElementById("marca_edit").disabled = true;
             document.getElementById("serial_number_edit").disabled = true;
             document.getElementById("mac_address_edit").disabled = true;
             document.getElementById("tipo_item_edit").disabled = true;
             document.getElementById("any_desk_edit").disabled = true;
          },
         error: function (xhr, status, error) {
 
             alert('Erro: ' + xhr.responseJSON.message);
         } 
     });
 }


 function edit_equipamanto() {
 
     
     const localizacao_edit = document.getElementById('localizacao_edit').value;
     const obs_edit = document.getElementById('obs_edit').value;
     const id_user = document.getElementById('id_user').value;
     const equipamento_id = document.getElementById('equipamento_id').value;

   
 
 
     // Dados para enviar
     const data = {
         "localizacao_edit": localizacao_edit,
         "obs_edit": obs_edit,
         "user_create": id_user,
         "equipamento_id":equipamento_id,
         "X-CSRFToken": getCSRFToken()
     };
 
     // Configuração da requisição
     jqOld.ajax({
         url: '../editar_equipamento/',
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

 function delete_equipamanto() {
 
 
     const equipamento_id = document.getElementById('equipamento_delete').value;
     const id_users = document.getElementById('id_user_delete').value;
 
 
     // Dados para enviar
     const data = {
         "equipamento_id": equipamento_id,
         "user_update": id_users,
         "X-CSRFToken": getCSRFToken()
     };
 
     // Configuração da requisição
     jqOld.ajax({
         url: '../delete_equipamento/',
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

 
function add_equipamanto() {

    
    const descricao = document.getElementById('descricao').value;
    const data_entrada = document.getElementById('data_entrada').value;
    const tipo_item = document.getElementById('tipo_item').value;
    const localizacao = document.getElementById('localizacao').value;
    const obs = document.getElementById('obs').value;
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const serial_number = document.getElementById('serial_number').value;
    const mac_address = document.getElementById('mac_address').value;
    const any_desk = document.getElementById('any_desk').value;
    const id_user = document.getElementById('id_user').value;

    // Dados para enviar
    const data = {
        "descricao": descricao,
        "marca": marca,
        "modelo": modelo,
        "serial_number": serial_number,
        "mac_address": mac_address,
        "user_create": id_user,
        "any_desk": any_desk,
        "data_entrada": data_entrada,
        "tipo_item": tipo_item,
        "localizacao": localizacao,
        "obs": obs,
        "X-CSRFToken": getCSRFToken()
    };

    // Configuração da requisição
    jqOld.ajax({
        url: '../add_equipamento/',
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

function get_equipamento_delete(button){
 
    let equipamento_id=button.getAttribute("data-id");
    document.getElementById('equipamento_delete').value=equipamento_id;
 
 }

