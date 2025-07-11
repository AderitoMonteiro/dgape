try {
function slowReload() {
    setTimeout(() => {
        location.reload();
    }, 2000); // 2 segundos
}

function id_deleteCk_equipamento(){

    console.log("teste");
    
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
            "X-CSRFToken": document.querySelector('meta[name="csrf-token"]').getAttribute("content")
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
                
                setTimeout(() => {

                    fetch('../equipamento_index/', {
                        headers: {
                          'Cache-Control': 'no-cache',
                          'Pragma': 'no-cache'
                        }
                      })
                      .then(res => res.text())
                      .then(html => {
                        document.getElementById("container_xl").innerHTML = html;
                      });

                      document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
              
                }, 2000); 

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
}



function get_equipamento(button){

    let equipamento_id=button.getAttribute("data-id");
    let sidebar_menu=button.getAttribute("data-sidebar-descricao");
 
    const data = {
     "equipamento_id":equipamento_id
     };
 
     jqOld.ajax({
         url: '../get/equipamento_editar/',
         type: 'POST',
         data: data,
         success: function (data) {
 
             
             document.getElementById("descricao_edit").value= data.resultado[0].descricao;
             document.getElementById("data_entrada_edit").value= data.resultado[0].data_entrada;
             document.getElementById("obs_edit").value= data.resultado[0].obs;
             document.getElementById("marca_edit").value=data.resultado[0].marca;
             document.getElementById("modelo_edit").value=data.resultado[0].modelo;
             document.getElementById("serial_number_edit").value=data.resultado[0].serial_number;
             document.getElementById("mac_address_edit").value=data.resultado[0].mac_address;
             document.getElementById("conselho_edit").value=data.resultado[0].descricao_conselho;
             document.getElementById("conselho_edit").setAttribute("data-id", data.resultado[0].conselho_id)
             document.getElementById("tipo_item_edit").value=data.resultado[0].tipo;
             document.getElementById("sidebar_id").value=sidebar_menu;
             document.getElementById("provinencia_edit").value=data.resultado[0].provinencia;

             document.getElementById("equipamento_id").value=equipamento_id;

             if(data.resultado[0].descricao_conselho=="DGAPE"){

                document.getElementById("saladiv_edit").style.display = 'block';
                document.getElementById("saladiv_edit-select").value= data.resultado[0].sala_id;
             }
          /*
             document.getElementById("descricao_edit").disabled=true;
             document.getElementById("data_entrada_edit").disabled=true;
             document.getElementById("marca_edit").disabled=true;
             document.getElementById("modelo_edit").disabled=true;
             document.getElementById("serial_number_edit").disabled=true;
             document.getElementById("mac_address_edit").disabled=true;
             document.getElementById("tipo_item_edit").disabled=true;
             document.getElementById("provinencia_edit").disabled=true;*/
 
          },
         error: function (xhr, status, error) {
 
             alert('Erro: ' + xhr.responseJSON.message);
         } 
     });
 }


 function get_equipamento_gestao(button){

    let equipamento_id=button.getAttribute("data-id");
     let sidebar_menu=button.getAttribute("data-sidebar-descricao");
 
    const data = {
     "equipamento_id":equipamento_id
     };
 
     jqOld.ajax({
         url: '../get/equipamento_editar/',
         type: 'POST',
         data: data,
         success: function (data) {
 
             
             document.getElementById("descricao_edit").value= data.resultado[0].descricao;
             document.getElementById("data_entrada_edit").value= data.resultado[0].data_entrada;
             document.getElementById("obs_edit").value= data.resultado[0].obs;
             document.getElementById("marca_edit").value=data.resultado[0].marca;
             document.getElementById("modelo_edit").value=data.resultado[0].modelo;
             document.getElementById("serial_number_edit").value=data.resultado[0].serial_number;
             document.getElementById("mac_address_edit").value=data.resultado[0].mac_address;
             document.getElementById("conselho_edit").value=data.resultado[0].descricao_conselho;
             document.getElementById("conselho_edit").setAttribute("data-id", data.resultado[0].conselho_id)
             document.getElementById("tipo_item_edit").value=data.resultado[0].tipo;
             document.getElementById("sidebar_id").value=sidebar_menu;
             document.getElementById("provinencia_edit").value=data.resultado[0].provinencia;

             document.getElementById("equipamento_id").value=equipamento_id;

             if(data.resultado[0].descricao_conselho=="DGAPE"){

                document.getElementById("saladiv_edit").style.display = 'block';
                document.getElementById("saladiv_edit-select").value= data.resultado[0].sala_id;
             }
          
             document.getElementById("descricao_edit").disabled=true;
             document.getElementById("data_entrada_edit").disabled=true;
             document.getElementById("marca_edit").disabled=true;
             document.getElementById("modelo_edit").disabled=true;
             document.getElementById("serial_number_edit").disabled=true;
             document.getElementById("mac_address_edit").disabled=true;
             document.getElementById("tipo_item_edit").disabled=true;
             document.getElementById("provinencia_edit").disabled=true;
 
          },
         error: function (xhr, status, error) {
 
             alert('Erro: ' + xhr.responseJSON.message);
         } 
     });
 }

function get_equipamento_eleitoral(button){

    let equipamento_id=button.getAttribute("data-id");
 
    const data = {
     "equipamento_id":equipamento_id
     };
 
     jqOld.ajax({
         url: '../get/equipamento_eleitoral_editar/',
         type: 'POST',
         data: data,
         success: function (data) {
 
             const datajs = JSON.parse(data);
             
             document.getElementById("data_entrada_edit").value= datajs[0].fields.data_entrada;
             document.getElementById("obs_edit").value= datajs[0].fields.obs;
             document.getElementById("descricao_edit").value= datajs[0].fields.descricao;
             document.getElementById("marca_edit").value=datajs[0].fields.marca;
             document.getElementById("modelo_edit").value=datajs[0].fields.modelo;
             document.getElementById("serial_number_edit").value=datajs[0].fields.serial_number;
             document.getElementById("mac_address_edit").value=datajs[0].fields.mac_address;
             document.getElementById("equipamento_id").value=equipamento_id;

             document.getElementById("data_entrada_edit").disabled=true;
             document.getElementById("descricao_edit").disabled=true;
             document.getElementById("marca_edit").disabled=true;
             document.getElementById("modelo_edit").disabled=true;
             document.getElementById("serial_number_edit").disabled=true;
             document.getElementById("mac_address_edit").disabled=true;
 
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
 
  function get_equipamento_eleitoral_delete(button){
 
    let equipamento_id=button.getAttribute("data-id");
    document.getElementById('equipamento_delete').value=equipamento_id;
 
 }
 
 
 function edit_equipamanto() {
 
     const obs = document.getElementById('obs_edit').value;
     const id_user = document.getElementById('id_user_edit').value;
     const equipamento_id = document.getElementById('equipamento_id').value;
     const conselho = document.getElementById('conselho_edit').getAttribute("data-id");
     const sala_id = document.getElementById('saladiv_edit-select').value;
     const sidebar_id = document.getElementById('sidebar_id').value;
     let divPai = document.getElementById("alerta_edit");
     let divalert = document.createElement("div");
     
    if(sidebar_id=='sidebar_gestao'){

        if(conselho=='23'){

                if(!sala_id){

                    divPai.setAttribute("style", "display: block!important;margin: 0 auto; width: 40%;  margin-top: 10px;  text-align: center; font-size: 15px;");
                    divalert.setAttribute("class","alert alert-danger");
                    divalert.setAttribute( "style","text-align;");
                    divalert.setAttribute( "role","alert");
                    divalert.innerHTML = 'Erro, tem que preencher todos os campos obrigatorios!!';
                    divPai.appendChild(divalert);

                    return;
                }

        }else if(!conselho){

                    divPai.setAttribute("style", "display: block!important;margin: 0 auto; width: 40%;  margin-top: 10px;  text-align: center; font-size: 15px;");
                    divalert.setAttribute("class","alert alert-danger");
                    divalert.setAttribute( "style","text-align;");
                    divalert.setAttribute( "role","alert");
                    divalert.innerHTML = 'Erro, tem que preencher todos os campos obrigatorios!!';
                    divPai.appendChild(divalert);

                    return;
        }

    }
 
     // Dados para enviar
     const data = {
         "obs": obs,
         "user_create": id_user,
         "equipamento_id": equipamento_id,
         "conselho_edit": conselho,
         "sala_id": sala_id,
         "X-CSRFToken": document.querySelector('meta[name="csrf-token"]').getAttribute("content")
     };
 
     // Configuração da requisição
     jqOld.ajax({
         url: 'edit/',
         type: 'POST',
         data: data,
         success: function (data) {
 
             if (data.status == 'success') {
                 
                 divPai.innerHTML = ''
 
                 divPai.setAttribute("style", "display: block!important;margin: 0 auto; width: 40%;  margin-top: 10px;  text-align: center;font-size: 15px;");
                 divalert.setAttribute("class","alert alert-success");
                 divalert.setAttribute( "role","alert");
                 divalert.innerHTML = data.message;
                 divPai.appendChild(divalert);
                 var modulo;

                 if(sidebar_id=='sidebar_gestao'){

                    modulo='gestao';

                    }else{

                        modulo='lancamento';
                    }

                 setTimeout(() => {

                    fetch('../equipamento_index/?modulo='+modulo)
                      .then(res => res.text())
                      .then(html => {
                        document.getElementById("container_xl").innerHTML = html;
                        filter_table_equipamento();
                      });

                      document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
              
                }, 2000); 
 
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

 function edit_equipamanto_eleitoral() {
 
     
    const obs_edit = document.getElementById('obs_edit').value;
    const id_user = document.getElementById('id_user_edit').value;
    const equipamento_id = document.getElementById('equipamento_id').value;


    // Dados para enviar
    const data = {
        "obs_edit": obs_edit,
        "user_create": id_user,
        "equipamento_id": equipamento_id,
        "X-CSRFToken": document.querySelector('meta[name="csrf-token"]').getAttribute("content")
    };

    // Configuração da requisição
    jqOld.ajax({
        url: 'edit/',
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
                setTimeout(() => {

                    fetch('../equipamento_index/', {
                        headers: {
                          'Cache-Control': 'no-cache',
                          'Pragma': 'no-cache'
                        }
                      })
                      .then(res => res.text())
                      .then(html => {
                        document.getElementById("container_xl").innerHTML = html;
                      });

                      document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
              
                }, 2000); 

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
         "X-CSRFToken": document.querySelector('meta[name="csrf-token"]').getAttribute("content")
     };
 
     // Configuração da requisição
     jqOld.ajax({
         url: 'delete/',
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
                 setTimeout(() => {

                    fetch('../equipamento_index/', {
                        headers: {
                          'Cache-Control': 'no-cache',
                          'Pragma': 'no-cache'
                        }
                      })
                      .then(res => res.text())
                      .then(html => {
                        document.getElementById("container_xl").innerHTML = html;
                      });

                      document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
              
                }, 2000); 
 
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

 function delete_equipamanto_eleitoral() {
 
 
    const equipamento_id = document.getElementById('equipamento_delete').value;
    const id_users = document.getElementById('id_user_delete').value;


    // Dados para enviar
    const data = {
        "equipamento_id": equipamento_id,
        "user_update": id_users,
        "X-CSRFToken": document.querySelector('meta[name="csrf-token"]').getAttribute("content")
    };

    // Configuração da requisição
    jqOld.ajax({
        url: 'delete/',
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
                setTimeout(() => {

                    fetch('../equipamento_index/', {
                        headers: {
                          'Cache-Control': 'no-cache',
                          'Pragma': 'no-cache'
                        }
                      })
                      .then(res => res.text())
                      .then(html => {
                        document.getElementById("container_xl").innerHTML = html;
                      });

                      document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
              
                }, 2000); 

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
    const obs = document.getElementById('obs').value;
    const marca = document.getElementById('marca').value;
    const provinencia = document.getElementById('provinencia').value;
    const modelo = document.getElementById('modelo').value;
    const serial_number = document.getElementById('serial_number').value;
    const mac_address = document.getElementById('mac_address').value;
    const id_user = document.getElementById('id_user').value;
    const sala_id = document.getElementById('ac-aa-select').value;
    const tipo_item = document.getElementById('tipo_item').value;
    const conselho = document.getElementById('conselho').getAttribute("data-id");



    // Dados para enviar
    const data = {
        "descricao": descricao,
        "data_entrada": data_entrada,
        "obs": obs,
        "marca": marca,
        "modelo": modelo,
        "serial_number": serial_number,
        "mac_address": mac_address,
        "user_create": id_user,
        "conselho":conselho,
        "sala_id":sala_id,
        "tipo_item":tipo_item,
        "provinencia":provinencia,
        "X-CSRFToken": document.querySelector('meta[name="csrf-token"]').getAttribute("content")
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
                setTimeout(() => {

                    fetch('../equipamento_index/', {
                        headers: {
                          'Cache-Control': 'no-cache',
                          'Pragma': 'no-cache'
                        }
                      })
                      .then(res => res.text())
                      .then(html => {
                        document.getElementById("container_xl").innerHTML = html;
                      });

                      document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
              
                }, 2000); 

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

function add_equipamanto_eleitoral() {

    const data_entrada = document.getElementById('data_entrada').value;
    const obs = document.getElementById('obs').value;
    const descricao = document.getElementById('descricao').value;
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const serial_number = document.getElementById('serial_number').value;
    const mac_address = document.getElementById('mac_address').value;
    const id_user = document.getElementById('id_user').value;

    // Dados para enviar
    const data = {
        "descricao": descricao,
        "data_entrada": data_entrada,
        "obs": descricao,
        "marca": marca,
        "modelo": modelo,
        "serial_number": serial_number,
        "mac_address": mac_address,
        "user_create": id_user,
        "X-CSRFToken": document.querySelector('meta[name="csrf-token"]').getAttribute("content")
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

// filtragem drop conselho start
function toggleDropdown_equipamento() {
    console.log("ali")
    const dropdown = document.getElementById("dropdownMenu");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    document.getElementById("dropdownInput").value = "";
    filterDropdown_equipamento(); // show all items when opening
    document.getElementById("dropdownInput").focus();
  }

  function filterDropdown_equipamento() {
    const input = document.getElementById("dropdownInput").value.toLowerCase();
    const items = document.querySelectorAll(".dropdown-item");

    items.forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(input) ? "block" : "none";
    });
  }

  function selectItem_equipamento(el) {
    const selectedValue = el.textContent;
    document.getElementById("conselho").value = selectedValue;
    document.getElementById("conselho").setAttribute("data-id", el.getAttribute("data-id"));
    document.getElementById("dropdownMenu").style.display = "none";
    const div = document.getElementById('saladiv');

    if(selectedValue=='DGAPE')
    {
        div.style.display = 'block';
        document.getElementById("ac-aa-select").value = 6;
    }else{
        div.style.display = 'none';
    }
  }

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
     const dropdown = document.querySelector(".modal-body");

    if (!dropdown.contains(e.target)) {
      document.getElementById("dropdownMenu").style.display = "none";
    }
  });

  // close filtragem drop conselho

  // filtragem drop conselho start
function toggleDropdown_edit() {
    
    console.log("01")

    const dropdown = document.getElementById("dropdownMenu_edit");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";

    console.log(dropdown.style.display)

    document.getElementById("dropdownInput_edit").value = "";
    filterDropdown_edit(); // show all items when opening
    document.getElementById("dropdownInput_edit").focus();
  }

  function filterDropdown_edit() {
    const input = document.getElementById("dropdownInput_edit").value.toLowerCase();
    const items = document.querySelectorAll(".dropdown-item-edit");

    items.forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(input) ? "block" : "none";
    });
  }

  function selectItem_edit(el) {
    const selectedValue = el.textContent;
    document.getElementById("conselho_edit").value = selectedValue;
    document.getElementById("conselho_edit").setAttribute("data-id", el.getAttribute("data-id"));
    document.getElementById("dropdownMenu_edit").style.display = "none";
    const div = document.getElementById('saladiv_edit');

    if(selectedValue=='DGAPE')
    {
        div.style.display = 'block';
        
    }else{
        div.style.display = 'none';
    }
  }

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
     const dropdown = document.querySelector(".modal-body");

    if (!dropdown.contains(e.target)) {
      document.getElementById("dropdownMenu").style.display = "none";
    }
  });

  // close filtragem drop conselho

  
  function mac_active(){

    mac = document.getElementById("tipo_item").value
    const div = document.getElementById('mac_ads_id');

    if(mac=="Portatel"){

        div.style.display = 'block';
    }else{

        div.style.display = 'none';
    }

 }

} catch (e) {
    console.error("Erro ao executar função:", e);
}