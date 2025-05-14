function getCSRFToken() {
    return document.querySelector('meta[name="csrf-token"]').getAttribute("content");
}

function slowReload() {
    setTimeout(() => {
        location.reload();
    }, 2000); // 2 segundos
}
function add_inventario_mobiliario() {

    
    const provinencia = document.getElementById('provinencia').value;
    const mobiliario = document.getElementById('mobiliario').getAttribute("data-id");;
    const localizacao = document.getElementById('localizacao').value;
    const estado = document.getElementById('obs').value;
    const id_user = document.getElementById('id_user').value;

    // Dados para enviar
    const data = {
        "provinencia": provinencia,
        "mobiliario": mobiliario,
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

function add_inventario_mobiliario_eleitoral() {

    
    const provinencia = document.getElementById('provinencia').value;
    const mobiliario = document.getElementById('mobiliario').value;
    const localizacao = document.getElementById('localizacao').value;
    const estado = document.getElementById('obs').value;
    const id_user = document.getElementById('id_user').value;

    // Dados para enviar
    const data = {
        "provinencia": provinencia,
        "mobiliario": mobiliario,
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


function get_mobiliario_inventario(button){

    let mobiliario_inventario_id=button.getAttribute("data-id");
 
    const data = {
     "mobiliario_id":mobiliario_inventario_id,
     "X-CSRFToken": getCSRFToken()
     };
 
     jqOld.ajax({
         url: '../get/mobiliario_inventario_id/',
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
           
 
          },
         error: function (xhr, status, error) {
 
             alert('Erro: ' + xhr.responseJSON.message);
         } 
     });
 }

 function get_mobiliario_eleitoral_inventario(button){

    let mobiliario_inventario_id=button.getAttribute("data-id");
 
    const data = {
     "mobiliario_id":mobiliario_inventario_id,
     "X-CSRFToken": getCSRFToken()
     };
 
     jqOld.ajax({
         url: '../get/mobiliario_inventario_id/',
         type: 'POST',
         data: data,
         success: function (data) {
 
             
            document.getElementById('data_entrada_edit').value=data.resultado[0].data_entrada
            document.getElementById('provinencia_edit').value=data.resultado[0].provinencia
            document.getElementById('mobiliario_edit').value=data.resultado[0].mobiliario_id
            document.getElementById('localizacao_edit').value=data.resultado[0].localizacao
            document.getElementById('id_inventario_mobiliario').value=data.resultado[0].id
            document.getElementById('obs_edit').value=data.resultado[0].obs

            document.getElementById('data_entrada_edit').disabled=true;
            document.getElementById('provinencia_edit').disabled=true;
            document.getElementById('mobiliario_edit').disabled=true;
           
 
          },
         error: function (xhr, status, error) {
 
             alert('Erro: ' + xhr.responseJSON.message);
         } 
     });
 }

 function add_mobiliario_inventario(){

    let data_entrada_edit = document.getElementById('data_entrada_edit').value
    let provinencia_edit  = document.getElementById('provinencia_edit').value
    let equipamento_edit  = document.getElementById('equipamento_edit').value
    let localizacao_edit = document.getElementById('localizacao_edit').value
    let id_inventario_equipamento = document.getElementById('id_inventario_equipamento').value
    let obs_edit = document.getElementById('obs_edit').value
    let user_update = document.getElementById('id_user').value
  
     const data = {
      "data_entrada":data_entrada_edit,
      "provinencia":provinencia_edit,
      "equipamento":equipamento_edit,
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

function edit_mobiliario_inventario(){

    let localizacao_edit = document.getElementById('localizacao_edit').value
    let id_inventario_mobiliario = document.getElementById('id_inventario_mobiliario').value
    let obs_edit = document.getElementById('obs_edit').value
    let user_update = document.getElementById('id_user').value
  
     const data = {
      "localizacao":localizacao_edit,
      "id":id_inventario_mobiliario,
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

function edit_mobiliario_inventario_eleitoral(){

    let localizacao_edit = document.getElementById('localizacao_edit').value
    let id_inventario_mobiliario = document.getElementById('id_inventario_mobiliario').value
    let obs_edit = document.getElementById('obs_edit').value
    let user_update = document.getElementById('id_user').value
  
     const data = {
      "localizacao":localizacao_edit,
      "id":id_inventario_mobiliario,
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
  function delete_mobiliario_inventario(){

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

 function get_mobiliario_delete_mobiliario(button){

    document.getElementById('delete_inventario_mobiliario').value=button.getAttribute("data-id");
 
 }

 function get_mobiliario_delete_eleitoral(button){

    document.getElementById('delete_inventario_mobiliario').value=button.getAttribute("data-id");
 
 }

 function delete_mobiliario_eleitoral_inventario(){

    let inventario_mobiliario_id= document.getElementById('delete_inventario_mobiliario').value;
    let user_update= document.getElementById('id_user').value;
 
    const data = {
     "inventario_mobiliario_id":inventario_mobiliario_id,
     "user_update":user_update,
     "X-CSRFToken": getCSRFToken()
     };
 
     jqOld.ajax({
         url: 'delete_inventario_mobiliario/',
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

    let checkboxes = document.querySelectorAll(".mobiliario-checkbox:checked");
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
        let user_id = document.getElementById('id_user').value;
        let url;

       

        const data = {
            "id": equipamento_ids,
            "id_user":user_id,
            "X-CSRFToken": getCSRFToken()
        };
        // Configuração da requisição
        jqOld.ajax({
            url: "checkbox_inventario_mobiliario/",
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


 // filtragem drop mobiliario start

 function toggleDropdownmobiliario() {
    const dropdown = document.getElementById("dropdownMenuemobiliario");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    document.getElementById("dropdownInputmobiliario").value = "";
    filterDropdownmobiliario();
    document.getElementById("dropdownInputmobiliario").focus();
  }

  function filterDropdownmobiliario() {
    const input = document.getElementById("dropdownInputmobiliario").value.toLowerCase();
    const items = document.querySelectorAll(".dropdown-item");
    items.forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(input) ? "block" : "none";
    });
  }

  function selectItmobiliario(el) {
    const selectedValue = el.textContent;
    document.getElementById("mobiliario").value = selectedValue;
    document.getElementById("mobiliario").setAttribute("data-id", el.getAttribute("data-id"));
    document.getElementById("dropdownMenuemobiliario").style.display = "none";
  }

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
     const dropdown = document.querySelector(".form-group");

    if (!dropdown.contains(e.target)) {
      document.getElementById("dropdownMenu").style.display = "none";
    }
  });
  // close filtragem drop mobiliario start