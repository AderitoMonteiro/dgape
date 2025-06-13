function add_acessorio() {

    
    const descricao = document.getElementById('descricao').value;
    const data_entrada = document.getElementById('data_entrada').value;
    const obs = document.getElementById('obs').value;
    const provinencia = document.getElementById('provinencia').value;
    const carateristica = document.getElementById('carateristica').value;
    const id_user = document.getElementById('id_user').value;
    const sala_id = document.getElementById('sala_id').value;
    const quantidade = document.getElementById('quantidade').value;
    const serial_number = document.getElementById('serial_number').value;
    const conselho = document.getElementById('conselho').getAttribute("data-id");



    // Dados para enviar
    const data = {
        "descricao": descricao,
        "data_entrada": data_entrada,
        "carateristica":carateristica,
        "obs": obs,
        "user_create": id_user,
        "conselho":conselho,
        "sala_id":sala_id,
        "quantidade":quantidade,
        "provinencia":provinencia,
        "serial_number":serial_number,
        "X-CSRFToken": document.querySelector('meta[name="csrf-token"]').getAttribute("content")
    };

    // Configuração da requisição
    jqOld.ajax({
        url: 'add_acessorio/',
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

                    fetch('../gestao_acessorio/', {
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

function id_deleteCkacessorio() {

    let checkboxes = document.querySelectorAll(".acessorio-checkbox:checked");
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
            url: "checkbox_acessorio/",
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

                    fetch('../gestao_acessorio/', {
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

function delete_acessorio() {


    const acessorio_id = document.getElementById('acessorio_delete').value;
    const id_users = document.getElementById('id_user_delete').value;


    // Dados para enviar
    const data = {
        "acessorio_id": acessorio_id,
        "user_update": id_users,
        "X-CSRFToken": getCSRFToken()
    };

    // Configuração da requisição
    jqOld.ajax({
        url: 'acessorio/delete/',
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

                    fetch('../gestao_acessorio/', {
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

function get_acessorio_delete(button){

    let acessorio_id=button.getAttribute("data-id");
    document.getElementById('acessorio_delete').value=acessorio_id;
 
 }


function get_acessorio(button){

    let acessorio_id=button.getAttribute("data-id");
 
    const data = {
     "acessorio_id":acessorio_id
     };
 
     jqOld.ajax({
         url: '../get/acessorio_editar/',
         type: 'POST',
         data: data,
         success: function (data) {
 
             
             document.getElementById("descricao_edit").value= data.resultado[0].descricao;
             document.getElementById("data_entrada_edit").value= data.resultado[0].data_entrada;
             document.getElementById("serial_number_edit").value= data.resultado[0].serial_number;
             document.getElementById("obs_edit").value=data.resultado[0].obs;
             document.getElementById("acessorio_id").value=acessorio_id;
             document.getElementById("conselho_edit").value=data.resultado[0].conselho;
             document.getElementById("quantidade_edit").value=data.resultado[0].quantidade;
             document.getElementById("conselho_edit").setAttribute('data-id',data.resultado[0].conselho_id)
             document.getElementById("carateristica_edit").value=data.resultado[0].carateristica;
             document.getElementById("provinencia_edit").value=data.resultado[0].provinencia;

             if(data.resultado[0].conselho=="DGAPE"){

                document.getElementById("saladiv_edit").style.display = 'block';
                document.getElementById("saladiv_edit-select").value= data.resultado[0].sala_id;

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

 function edit_acessorio() {

    
    const descricao = document.getElementById('descricao_edit').value;
    const data_entrada_edit = document.getElementById('data_entrada_edit').value;
    const provinencia_edit = document.getElementById('provinencia_edit').value;
    const quantidade = document.getElementById('quantidade_edit').value;
    const serial_number = document.getElementById('serial_number_edit').value;
    const obs = document.getElementById('obs_edit').value;
    const conselho_edit = document.getElementById('conselho_edit').getAttribute("data-id");
    const sala_id = document.getElementById('saladiv_edit-select').value;
    const id_user = document.getElementById('id_user_edit').value;
    const carateristica = document.getElementById('carateristica_edit').value;
    const acessorio_id = document.getElementById('acessorio_id').value;


    // Dados para enviar
    const data = {
        "descricao": descricao,
        "conselho_edit":conselho_edit,
        "sala_id":sala_id,
        "obs": obs,
        "user_update": id_user,
        "acessorio_id": acessorio_id,
        "data_entrada":data_entrada_edit,
        "provinencia":provinencia_edit,
        "carateristica":carateristica,
        "quantidade":quantidade,
        "serial_number":serial_number,
        "X-CSRFToken": getCSRFToken()
    };

    // Configuração da requisição
    jqOld.ajax({
        url: 'acessorio/edit/',
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

                        fetch('../gestao_acessorio/', {
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

// filtragem drop conselho start
function toggleDropdown_acessorio() {
    const dropdown = document.getElementById("dropdownMenu");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    document.getElementById("dropdownInput").value = "";
    filterDropdown_acessorio(); // show all items when opening
    document.getElementById("dropdownInput").focus();
  }

  function filterDropdown_acessorio() {
    const input = document.getElementById("dropdownInput").value.toLowerCase();
    const items = document.querySelectorAll(".dropdown-item");

    items.forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(input) ? "block" : "none";
    });
  }

  function selectItem_acessorio(el) {
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
     // document.getElementById("dropdownMenu").style.display = "none";
    }
  });