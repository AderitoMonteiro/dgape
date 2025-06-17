
try {
    
function get_mobiliario_delete(button){

    let equipamento_id=button.getAttribute("data-id");
    document.getElementById('mobiliario_delete').value=equipamento_id;
 
 }

 function get_mobiliario_eleitoral_delete(button){

    let equipamento_id=button.getAttribute("data-id");
    document.getElementById('mobiliario_delete').value=equipamento_id;
 
 }

function id_deleteCkmobiliario() {

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
        let user_id = document.getElementById('id_user_delete').value;
        let url;

       

        const data = {
            "id": equipamento_ids,
            "id_user":user_id,
            "X-CSRFToken": getCSRFToken()
        };
        // Configuração da requisição
        jqOld.ajax({
            url: "checkbox_mobiliario/",
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

                    fetch('../mobiliario_index/', {
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

};

function add_mobiliario() {

    
    const descricao = document.getElementById('descricao').value;
    const data_entrada = document.getElementById('data_entrada').value;
    const serial_number = document.getElementById('serial_number').value;
    const conselho = document.getElementById('conselho').getAttribute('data-id');
    const sala = document.getElementById('sala_id').value;
    const tipo = document.getElementById('tipo_item').value;
    const obs = document.getElementById('obs').value;
    const modelo = document.getElementById('id_modelo').value;
    const provinencia = document.getElementById('provinencia').value;
    const carateristica = document.getElementById('carateristica').value;
    const id_user = document.getElementById('id_user').value;

    // Dados para enviar
    const data = {
        "descricao": descricao,
        "serial_number":serial_number,
        "data_entrada":data_entrada,
        "obs": obs,
        "conselho": conselho,
        "tipo": tipo,
        "sala": sala,
        "carateristica":carateristica,
        "user_create": id_user,
        "provinencia": provinencia,
        "modelo": modelo,
        "X-CSRFToken": getCSRFToken()
    };

    // Configuração da requisição
    jqOld.ajax({
        url: '../mobiliario_index/add/',
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
                divPai.appendChild(divalert)

                setTimeout(() => {

                    fetch('../mobiliario_index/', {
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

function add_mobiliario_eleitoral() {

    const data_entrada = document.getElementById('data_entrada').value;
    const descricao = document.getElementById('descricao').value;
    const serial_number = document.getElementById('serial_number').value;
    const obs = document.getElementById('obs').value;
    const id_user = document.getElementById('id_user').value;

    // Dados para enviar
    const data = {
        "data_entrada":data_entrada,
        "descricao": descricao,
        "serial_number":serial_number,
        "obs": obs,
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

function get_mobiliario(button){

    let mobiliario_id=button.getAttribute("data-id");
    let sidebar_menu=button.getAttribute("data-sidebar-descricao");
 
    const data = {
     "mobiliario_id":mobiliario_id
     };
 
     jqOld.ajax({
         url: '../get/mobiliario_editar/',
         type: 'POST',
         data: data,
         success: function (data) {
 
             
             document.getElementById("descricao_edit").value= data.resultado[0].descricao;
             document.getElementById("data_entrada_edit").value= data.resultado[0].data_entrada;
             document.getElementById("serial_number_edit").value= data.resultado[0].serial_number;
             document.getElementById("obs_edit").value=data.resultado[0].obs;
             document.getElementById("mobiliario_id").value=mobiliario_id;
             document.getElementById("conselho_edit").value=data.resultado[0].conselho;
             document.getElementById("tipo_item_edit").value=data.resultado[0].tipo;
             document.getElementById("conselho_edit").setAttribute('data-id',data.resultado[0].conselho_id)
             document.getElementById("carateristica_edit").value=data.resultado[0].carateristica;
             document.getElementById("provinencia_edit").value=data.resultado[0].provinencia;
             document.getElementById("sidebar_id").value=sidebar_menu;

             if(data.resultado[0].conselho=="DGAPE"){

                document.getElementById("saladiv_edit").style.display = 'block';
                document.getElementById("saladiv_edit-select").value= data.resultado[0].sala_id;

             }

             if(data.resultado[0].tipo =="Mesa" ||data.resultado[0].tipo =="Cadeira"){

                document.getElementById('div_modelo_edit').setAttribute('style',"display: block;");
                document.getElementById('div_serial_edit').setAttribute('style',"display: block;");

                document.getElementById('id_modelo_edit').value=data.resultado[0].modelo;
                document.getElementById('serial_number_edit').value=data.resultado[0].serial_number;

             }
            /*
             document.getElementById("data_entrada_edit").disabled=true;
             document.getElementById("descricao_edit").disabled=true;
             document.getElementById("tipo_item_edit").disabled=true;
             document.getElementById("serial_number_edit").disabled=true;
             document.getElementById("carateristica_edit").disabled=true;
             document.getElementById("provinencia_edit").disabled=true;*/
          },
         error: function (xhr, status, error) {
 
             alert('Erro: ' + xhr.responseJSON.message);
         } 
     });
 }

 function get_mobiliario_gestao(button){

    let mobiliario_id=button.getAttribute("data-id");
    let sidebar_menu=button.getAttribute("data-sidebar-descricao");
 
    const data = {
     "mobiliario_id":mobiliario_id
     };
 
     jqOld.ajax({
         url: '../get/mobiliario_editar/',
         type: 'POST',
         data: data,
         success: function (data) {
 
             
             document.getElementById("descricao_edit").value= data.resultado[0].descricao;
             document.getElementById("data_entrada_edit").value= data.resultado[0].data_entrada;
             document.getElementById("serial_number_edit").value= data.resultado[0].serial_number;
             document.getElementById("obs_edit").value=data.resultado[0].obs;
             document.getElementById("mobiliario_id").value=mobiliario_id;
             document.getElementById("conselho_edit").value=data.resultado[0].conselho;
             document.getElementById("tipo_item_edit").value=data.resultado[0].tipo;
             document.getElementById("conselho_edit").setAttribute('data-id',data.resultado[0].conselho_id)
             document.getElementById("carateristica_edit").value=data.resultado[0].carateristica;
             document.getElementById("provinencia_edit").value=data.resultado[0].provinencia;
            document.getElementById("sidebar_id").value=sidebar_menu;

             if(data.resultado[0].conselho=="DGAPE"){

                document.getElementById("saladiv_edit").style.display = 'block';
                document.getElementById("saladiv_edit-select").value= data.resultado[0].sala_id;

             }

             if(data.resultado[0].tipo =="Mesa" ||data.resultado[0].tipo =="Cadeira"){

                document.getElementById('div_modelo_edit').setAttribute('style',"display: block;");
                document.getElementById('div_serial_edit').setAttribute('style',"display: block;");

                document.getElementById('id_modelo_edit').value=data.resultado[0].modelo;
                document.getElementById('serial_number_edit').value=data.resultado[0].serial_number;

             }
          
             document.getElementById("data_entrada_edit").disabled=true;
             document.getElementById("descricao_edit").disabled=true;
             document.getElementById("tipo_item_edit").disabled=true;
             document.getElementById("serial_number_edit").disabled=true;
             document.getElementById("carateristica_edit").disabled=true;
             document.getElementById("provinencia_edit").disabled=true;
             document.getElementById("id_modelo_edit").disabled=true;
          },
         error: function (xhr, status, error) {
 
             alert('Erro: ' + xhr.responseJSON.message);
         } 
     });
 }
 function get_mobiliario_eleitoral(button){

    let mobiliario_id=button.getAttribute("data-id");
 
    const data = {
     "mobiliario_id":mobiliario_id
     };
 
     jqOld.ajax({
         url: '../get/mobiliario_eleitoral_editar/',
         type: 'POST',
         data: data,
         success: function (data) {
 
             const datajs = JSON.parse(data);
             
             document.getElementById("descricao_edit").value= datajs[0].fields.descricao;
             document.getElementById("data_entrada_edit").value= datajs[0].fields.data_entrada;
             document.getElementById("serial_number_edit").value= datajs[0].fields.serial_number;
             document.getElementById("obs_edit").value=datajs[0].fields.obs;
             document.getElementById("mobiliario_id").value=mobiliario_id;

             document.getElementById("descricao_edit").disabled=true;
             document.getElementById("serial_number_edit").disabled=true;
             document.getElementById("data_entrada_edit").disabled=true;
 
          },
         error: function (xhr, status, error) {
 
             alert('Erro: ' + xhr.responseJSON.message);
         } 
     });
 }
 function edit_mobiliario() {

    
    const descricao = document.getElementById('descricao_edit').value;
    const obs = document.getElementById('obs_edit').value;
    const conselho_edit = document.getElementById('conselho_edit').getAttribute("data-id");
    const sala_id = document.getElementById('saladiv_edit-select').value;
    const id_user = document.getElementById('id_user_edit').value;
    const mobiliario_id = document.getElementById('mobiliario_id').value;
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
        "descricao": descricao,
        "conselho_edit":conselho_edit,
        "sala_id":sala_id,
        "obs": obs,
        "user_update": id_user,
        "mobiliario_id": mobiliario_id,
        "X-CSRFToken": getCSRFToken()
    };

    // Configuração da requisição
    jqOld.ajax({
        url: '../mobiliario_index/edit/',
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

                    fetch('../mobiliario_index/?modulo='+modulo)
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

function edit_mobiliario_eleitoral() {

    
    const descricao = document.getElementById('descricao_edit').value;
    const obs = document.getElementById('obs_edit').value;
    const id_user = document.getElementById('id_user_edit').value;
    const mobiliario_id = document.getElementById('mobiliario_id').value;


    // Dados para enviar
    const data = {
        "descricao": descricao,
        "obs": obs,
        "user_update": id_user,
        "mobiliario_id": mobiliario_id,
        "X-CSRFToken": getCSRFToken()
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

function delete_mobiliario() {


    const mobiliario_id = document.getElementById('mobiliario_delete').value;
    const id_users = document.getElementById('id_user_delete').value;


    // Dados para enviar
    const data = {
        "mobiliario_id": mobiliario_id,
        "user_update": id_users,
        "X-CSRFToken": getCSRFToken()
    };

    // Configuração da requisição
    jqOld.ajax({
        url: '../mobiliario_index/delete/',
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

                    fetch('../mobiliario_index/', {
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


function delete_mobiliario_eleitoral() {


    const mobiliario_id = document.getElementById('mobiliario_delete').value;
    const id_users = document.getElementById('id_user_delete').value;


    // Dados para enviar
    const data = {
        "mobiliario_id": mobiliario_id,
        "user_update": id_users,
        "X-CSRFToken": getCSRFToken()
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
function toggleDropdown() {
    const dropdown = document.getElementById("dropdownMenu");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    document.getElementById("dropdownInput").value = "";
    filterDropdown(); // show all items when opening
    document.getElementById("dropdownInput").focus();
  }

  function filterDropdown() {
    const input = document.getElementById("dropdownInput").value.toLowerCase();
    const items = document.querySelectorAll(".dropdown-item");

    items.forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(input) ? "block" : "none";
    });
  }

  function selectItem(el) {
    const selectedValue = el.textContent;
    document.getElementById("conselho").value = selectedValue;
    document.getElementById("conselho").setAttribute("data-id", el.getAttribute("data-id"));
    document.getElementById("dropdownMenu").style.display = "none";
    const div = document.getElementById('saladiv');

    if(selectedValue=='DGAPE')
    {
        div.style.display = 'block';
        document.getElementById("sala_id").value = 6;
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
 /** script.js **/



} catch (e) {
    console.error("Erro ao executar função:", e);
  }