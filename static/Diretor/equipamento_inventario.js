function getCSRFToken() {
    return document.querySelector('meta[name="csrf-token"]').getAttribute("content");
}

function slowReload() {
    setTimeout(() => {
        location.reload();
    }, 2000); // 2 segundos
}

function add_inventario_equipamanto() {

    const provinencia = document.getElementById('provinencia').value;
    const equipamento = document.getElementById('equipamento').getAttribute("data-id");
    const localizacao = document.getElementById('localizacao').value;
    const estado = document.getElementById('obs').value;
    const id_user = document.getElementById('id_user').value;

    // Dados para enviar
    const data = {
        "provinencia": provinencia,
        "equipamento": equipamento,
        "localizacao": localizacao,
        "estado": estado,
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

function add_inventario_equipamanto_eleitoral() {

    
    const provinencia = document.getElementById('provinencia').value;
    const equipamento = document.getElementById('equipamento').value;
    const localizacao = document.getElementById('localizacao').value;
    const estado = document.getElementById('obs').value;
    const id_user = document.getElementById('id_user').value;

    // Dados para enviar
    const data = {
        "provinencia": provinencia,
        "equipamento": equipamento,
        "localizacao": localizacao,
        "estado": estado,
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

function get_equipamento_inventario(button){

    let quipamento_inventario_id=button.getAttribute("data-id");
 
    const data = {
     "equipamento_id":quipamento_inventario_id,
     "X-CSRFToken": getCSRFToken()
     };
 
     jqOld.ajax({
         url: '../get/equipamento_inventario_id/',
         type: 'POST',
         data: data,
         success: function (data) {
 
             
            document.getElementById('data_entrada_edit').value=data.resultado[0].data_entrada
            document.getElementById('provinencia_edit').value=data.resultado[0].provinencia
            document.getElementById('equipamento_edit').value=data.resultado[0].equipamento_id
            document.getElementById('localizacao_edit').value=data.resultado[0].localizacao
            document.getElementById('id_inventario_equipamento').value=data.resultado[0].id
            document.getElementById('obs_edit').value=data.resultado[0].obs
           

            document.getElementById('data_entrada_edit').disabled=true
            document.getElementById('provinencia_edit').disabled=true
            document.getElementById('equipamento_edit').disabled=true
            document.getElementById('localizacao_edit').disabled=true
            document.getElementById('obs_edit').disabled=true
 
          },
         error: function (xhr, status, error) {
 
             alert('Erro: ' + xhr.responseJSON.message);
         } 
     });
 }

 function get_equipamento_inventario_eleitoral(button){

    let quipamento_inventario_id=button.getAttribute("data-id");
 
    const data = {
     "equipamento_id":quipamento_inventario_id,
     "X-CSRFToken": getCSRFToken()
     };
 
     jqOld.ajax({
         url: '../get/equipamento_inventario_id/',
         type: 'POST',
         data: data,
         success: function (data) {
 
             
            document.getElementById('data_entrada_edit').value=data.resultado[0].data_entrada
            document.getElementById('provinencia_edit').value=data.resultado[0].provinencia
            document.getElementById('equipamento_edit').value=data.resultado[0].equipamento_id
            document.getElementById('localizacao_edit').value=data.resultado[0].localizacao
            document.getElementById('id_inventario_equipamento').value=data.resultado[0].id
            document.getElementById('obs_edit').value=data.resultado[0].obs
           
            document.getElementById('data_entrada_edit').disabled=true
            document.getElementById('provinencia_edit').disabled=true
            document.getElementById('equipamento_edit').disabled=true
 
          },
         error: function (xhr, status, error) {
 
             alert('Erro: ' + xhr.responseJSON.message);
         } 
     });
 }

 function get_equipamento_block_inventario(button){

    document.getElementById('lock_inventario_equipamento').value=button.getAttribute("data-id");
 
 }
 function get_equipamento_unblock_inventario(button){

    document.getElementById('id_unlok_inventario_equipamento').value=button.getAttribute("data-id");
 
 }


 function get_equipamento_delete_inventario_eleitoral(button){

    document.getElementById('delete_inventario_equipamento').value=button.getAttribute("data-id");
 
 }

 function bloquear_equipamento_inventario(){

    let inventario_equipamento_id= document.getElementById('lock_inventario_equipamento').value;
    let user_update= document.getElementById('id_user').value;
 
    const data = {
     "inventario_equipamento_id":inventario_equipamento_id,
     "user_update":user_update,
     "X-CSRFToken": getCSRFToken()
     };
 
     jqOld.ajax({
         url: 'lock_inventario_equipamento/',
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

 function desbloquear_equipamento_inventario(){

    let inventario_equipamento_id= document.getElementById('id_unlok_inventario_equipamento').value;
    let user_update= document.getElementById('id_user').value;
 
    const data = {
     "inventario_equipamento_id":inventario_equipamento_id,
     "user_update":user_update,
     "X-CSRFToken": getCSRFToken()
     };
 
     jqOld.ajax({
         url: 'unlock_inventario_equipamento/',
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

 function delete_equipamento_eleitoral_inventario(){

    let inventario_equipamento_id= document.getElementById('delete_inventario_equipamento').value;
    let user_update= document.getElementById('id_user').value;
 
    const data = {
     "inventario_equipamento_id":inventario_equipamento_id,
     "user_update":user_update,
     "X-CSRFToken": getCSRFToken()
     };
 
     jqOld.ajax({
         url: 'delete_inventario_equipamento/',
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
 function edit_equipamento_inventario(){

   let localizacao_edit = document.getElementById('localizacao_edit').value
   let id_inventario_equipamento = document.getElementById('id_inventario_equipamento').value
   let obs_edit = document.getElementById('obs_edit').value
   let user_update = document.getElementById('id_user').value
 
    const data = {
     "localizacao":localizacao_edit,
     "id":id_inventario_equipamento,
     "obs":obs_edit,
     "user_update":user_update,
     "X-CSRFToken": getCSRFToken()
     };
 
     jqOld.ajax({
         url: 'edit_inventario_equipamento/',
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

 

 document.getElementById("id_deleteCk").addEventListener("click", function () {

    let checkboxes = document.querySelectorAll(".equipamento-checkbox:checked");
    if (checkboxes.length === 0) {

            let divPai = document.getElementById("alerta_delete_cheekbox");
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
            url: "lock_inventario_equipamento/",
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

 document.getElementById("id_deleteCkunlok").addEventListener("click", function () {

    let checkboxes = document.querySelectorAll(".equipamento-checkbox:checked");
    if (checkboxes.length === 0) {

            let divPai = document.getElementById("alerta_unlock_cheekbox");
            let divalert = document.createElement("div");

            divPai.innerHTML = ''
            divPai.setAttribute("style", "display: block!important;margin: 0 auto; width: 40%;  margin-top: 10px;  text-align: center;font-size: 15px;");
            divalert.setAttribute("class","alert alert-danger");
            divalert.setAttribute( "role","alert");
            divalert.innerHTML = "Selecione pelo menos um para desbloquear.";
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
            url: "unlockcheckbox_inventario_equipamento/",
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


 // filtragem drop equipamento start

 function toggleDropdownequipamento() {
    const dropdown = document.getElementById("dropdownMenuequipamento");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    document.getElementById("dropdownInputequipamento").value = "";
    filterDropdownequipamento();
    document.getElementById("dropdownInputequipamento").focus();
  }

  function filterDropdownequipamento() {
    const input = document.getElementById("dropdownInputequipamento").value.toLowerCase();
    const items = document.querySelectorAll(".dropdown-item");
    items.forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(input) ? "block" : "none";
    });
  }

  function selectItequipamento(el) {
    const selectedValue = el.textContent;
    document.getElementById("equipamento").value = selectedValue;
    document.getElementById("equipamento").setAttribute("data-id", el.getAttribute("data-id"));
    document.getElementById("dropdownMenuequipamento").style.display = "none";
  }

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
     const dropdown = document.querySelector(".form-group");

    if (!dropdown.contains(e.target)) {
      document.getElementById("dropdownMenu").style.display = "none";
    }
  });
  // close filtragem drop equipamento start
