function getCSRFToken() {
    return document.querySelector('meta[name="csrf-token"]').getAttribute("content");
}

function slowReload() {
    setTimeout(() => {
        location.reload();
    }, 2000); // 2 segundos
}


function add_kit() {

    
    const conselho = document.getElementById('conselho').getAttribute("data-id");
    const malas = document.getElementById('malas').getAttribute("data-id");
    const portatel = document.getElementById('portatel').getAttribute("data-id");
    const impressora = document.getElementById('impressora').getAttribute("data-id");
    const Scaner_impresao_digital = document.getElementById('Scaner_impresao_digital').getAttribute("data-id");
    const capitura_assinatura = document.getElementById('capitura_assinatura').getAttribute("data-id");
    const camera_fotografia = document.getElementById('cama_fotografia').getAttribute("data-id");
    const guia_entrega = document.getElementById('guia_entrega').value;
    const data_saida = document.getElementById('data_saida').value;
    const obs = document.getElementById('obs').value;
    const id_user = document.getElementById('id_user').value;
    const tripe = document.getElementById('tripe').getAttribute('data-id');
    const cabo = document.getElementById('cabo').getAttribute('data-id');
    const banquinho = document.getElementById('banquinho').getAttribute('data-id');
    


    // Dados para enviar
    const data = {
        "conselho": conselho,
        "malas": malas,
        "portatel": portatel,
        "impressora": impressora,
        "Scaner_impresao_digital": Scaner_impresao_digital,
        "capitura_assinatura": capitura_assinatura,
        "cama_fotografia": camera_fotografia,
        "guia_entrega": guia_entrega,
        "data_saida": data_saida,
        "user_create": id_user,
        "tripe": tripe,
        "cabo": cabo,
        "banquinho": banquinho,
        "obs": obs,
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
            document.getElementById("tripe_edit").value= result.resultado[0].tripe_id;
            document.getElementById("cabo_edit").value= result.resultado[0].cabo_id;
            document.getElementById("banquinho_edit").value= result.resultado[0].banquinho_id;


            document.getElementById("conselho_edit").disabled = true;
            document.getElementById("portatel_edit").disabled = true;
            document.getElementById("impressora_edit").disabled = true;
            document.getElementById("Scaner_impresao_digital_edit").disabled = true;
            document.getElementById("capitura_assinatura_edit").disabled = true;
            document.getElementById("impressora_edit").disabled = true;
            document.getElementById("cama_fotografia_edit").disabled = true;
            document.getElementById("guia_entrega_edit").disabled = true;
            document.getElementById("data_saida_edit").disabled = true;
            document.getElementById("tripe_edit").disabled = true;
            document.getElementById("cabo_edit").disabled = true;
            document.getElementById("banquinho_edit").disabled = true;


          },
         error: function (xhr, status, error) {
 
             alert('Erro: ' + xhr.responseJSON.message);
         } 
     });
 }

 function edit_kit() {
 
 
    //const conselho = document.getElementById('conselho_edit').value;
     const malas = document.getElementById('malas_edit').getAttribute("data-id");
    //const portatel = document.getElementById('portatel_edit').value;
    //const impressora = document.getElementById('impressora_edit').value;
    //const Scaner_impresao_digital = document.getElementById('Scaner_impresao_digital_edit').value;
    //const capitura_assinatura = document.getElementById('capitura_assinatura_edit').value;
    //const cama_fotografia = document.getElementById('cama_fotografia_edit').value;
    //const guia_entrega = document.getElementById('guia_entrega_edit').value;
    //const data_saida = document.getElementById('data_saida_edit').value;
    
    const id_user = document.getElementById('id_user_edit').value;
    const kit_el_id = document.getElementById('kit_el_id').value;
    const obs_edit = document.getElementById('obs_edit').value;


    // Dados para enviar
    const data = {
        "user_update": id_user,
        "kit_el_id": kit_el_id,
        "malas":malas,
        "obs_edit": obs_edit,
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

// filtragem drop conselho start
function toggleDropdown() {

    document.getElementById("dropdownMenumala").style.display = "none";
    document.getElementById("dropdownMenuportatel").style.display = "none";
    document.getElementById("dropdownMenuimpressora").style.display = "none";
    document.getElementById("dropdownMenuscaner").style.display = "none";
    document.getElementById("dropdownMenucapitura").style.display = "none";
    document.getElementById("dropdownMenucamera").style.display = "none";
    document.getElementById("dropdowntripe").style.display = "none";
    document.getElementById("dropdownMenucabo").style.display = "none";
    document.getElementById("dropdownMenubanquinho").style.display = "none";


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

    const dropdownInputmala = document.getElementById("dropdownInputmala");

    jqOld.ajax({
        url: "get_all_patrimonio/",
        type: 'POST',
        data: {"conselho_id":el.getAttribute("data-id")},
        success: function (data) {  

          let dropdownMenu = document.getElementById("dropdownMenumala");
          let inputmala = document.createElement("input");
          inputmala.setAttribute("type",'Text');
          inputmala.setAttribute("id",'dropdownInputmala');
          inputmala.setAttribute("placeholder","Descrição / Serial Number");
          dropdownMenu.appendChild(inputmala);

          const arraymala = JSON.parse(data.mala);
            
          for (const item of arraymala) {

            let div = document.createElement("div");
            div.setAttribute("data-id",item.pk)
            div.setAttribute("class",'dropdown-item')
            div.setAttribute("onclick",'selectItemmala(this)')
            div.innerHTML=item.fields.descricao+' / '+item.fields.serial_number

            dropdownMenu.appendChild(div);
          
           }


           let dropdownMenuportatel = document.getElementById("dropdownMenuportatel");
           let inputportatel = document.createElement("input");
           inputportatel.setAttribute("type",'Text');
           inputportatel.setAttribute("id",'dropdownInputportatel');
           inputportatel.setAttribute("placeholder","Descrição / Serial Number");
           dropdownMenuportatel.appendChild(inputportatel);

           const arrayportatel = JSON.parse(data.portatel);
            
          for (const item of arrayportatel) {

            let div = document.createElement("div");
            div.setAttribute("data-id",item.pk)
            div.setAttribute("class",'dropdown-item')
            div.setAttribute("onclick",'selectIteportatel(this)')
            div.innerHTML=item.fields.descricao+' / '+item.fields.serial_number

            dropdownMenuportatel.appendChild(div);
          
           }

           let dropdownMenuimpressora = document.getElementById("dropdownMenuimpressora");
           let inputimpressora = document.createElement("input");
           inputimpressora.setAttribute("type",'Text');
           inputimpressora.setAttribute("id",'dropdownInputimpressora');
           inputimpressora.setAttribute("placeholder","Descrição / Serial Number");
           dropdownMenuimpressora.appendChild(inputimpressora);

           const arrayimpressora = JSON.parse(data.impressora);
            
          for (const item of arrayimpressora) {

            let div = document.createElement("div");
            div.setAttribute("data-id",item.pk)
            div.setAttribute("class",'dropdown-item')
            div.setAttribute("onclick",'selectItimpressora(this)')
            div.innerHTML=item.fields.descricao+' / '+item.fields.serial_number

            dropdownMenuimpressora.appendChild(div);
          
           }

          
           let dropdownMenuscaner = document.getElementById("dropdownMenuscaner");
           let inputscaner_impresao_digital = document.createElement("input");
           inputscaner_impresao_digital.setAttribute("type",'Text');
           inputscaner_impresao_digital.setAttribute("id",'dropdownInputscaner');
           inputscaner_impresao_digital.setAttribute("placeholder","Descrição / Serial Number");
           dropdownMenuscaner.appendChild(inputscaner_impresao_digital);

          const arrayscaner_impresao_digital = JSON.parse(data.scaner_impresao_digital);
            
          for (const item of arrayscaner_impresao_digital) {

            let div = document.createElement("div");
            div.setAttribute("data-id",item.pk)
            div.setAttribute("class",'dropdown-item')
            div.setAttribute("onclick",'selectItscaner(this)')
            div.innerHTML=item.fields.descricao+' / '+item.fields.serial_number
            dropdownMenuscaner.appendChild(div);
          
           }

           let dropdownMenucapitura = document.getElementById("dropdownMenucapitura");
           let inputscaner_capitura_assinatura = document.createElement("input");
           inputscaner_capitura_assinatura.setAttribute("type",'Text');
           inputscaner_capitura_assinatura.setAttribute("id",'dropdownInputcamera');
           inputscaner_capitura_assinatura.setAttribute("placeholder","Descrição / Serial Number");
           dropdownMenucapitura.appendChild(inputscaner_capitura_assinatura);

          const arrayscaner_capitura_assinatura = JSON.parse(data.capitura_assinatura);
            
          for (const item of arrayscaner_capitura_assinatura) {

            let div = document.createElement("div");
            div.setAttribute("data-id",item.pk)
            div.setAttribute("class",'dropdown-item')
            div.setAttribute("onclick",'selectItcapitura(this)')
            div.innerHTML=item.fields.descricao+' / '+item.fields.serial_number
            dropdownMenucapitura.appendChild(div);
          
           }

           let dropdownMenucamera = document.getElementById("dropdownMenucamera");
           let inputscaner_camara_fotografica = document.createElement("input");
           inputscaner_camara_fotografica.setAttribute("type",'Text');
           inputscaner_camara_fotografica.setAttribute("id",'dropdownInputcamera');
           inputscaner_camara_fotografica.setAttribute("placeholder","Descrição / Serial Number");
           dropdownMenucamera.appendChild(inputscaner_camara_fotografica);

          const arrayscaner_camara_fotografica = JSON.parse(data.camara_fotografica);
            
          for (const item of arrayscaner_camara_fotografica) {

            let div = document.createElement("div");
            div.setAttribute("data-id",item.pk)
            div.setAttribute("class",'dropdown-item')
            div.setAttribute("onclick",'selectItcamera(this)')
            div.innerHTML=item.fields.descricao+' / '+item.fields.serial_number
            dropdownMenucamera.appendChild(div);
          
           }

           let dropdowntripe = document.getElementById("dropdowntripe");
           let inputscaner_tripe = document.createElement("input");
           inputscaner_tripe.setAttribute("type",'Text');
           inputscaner_tripe.setAttribute("id",'dropdownInputtripe');
           inputscaner_tripe.setAttribute("placeholder","Descrição / Serial Number");
           dropdowntripe.appendChild(inputscaner_tripe);

          const arrayscaner_tripe = JSON.parse(data.tripe);
            
          for (const item of arrayscaner_tripe) {

            let div = document.createElement("div");
            div.setAttribute("data-id",item.pk)
            div.setAttribute("class",'dropdown-item')
            div.setAttribute("onclick",'selectItemtripe(this)')
            div.innerHTML=item.fields.descricao+' / '+item.fields.serial_number
            dropdowntripe.appendChild(div);
          
           }

           let dropdownMenucabo = document.getElementById("dropdownMenucabo");
           let inputscaner_cabo = document.createElement("input");
           inputscaner_cabo.setAttribute("type",'Text');
           inputscaner_cabo.setAttribute("id",'dropdownInpucabo');
           inputscaner_cabo.setAttribute("placeholder","Descrição..");
           dropdownMenucabo.appendChild(inputscaner_cabo);

          const arrayscaner_cabo = JSON.parse(data.Acessorios_eletronicos);
            
          for (const item of arrayscaner_cabo) {

            let div = document.createElement("div");
            div.setAttribute("data-id",item.pk)
            div.setAttribute("class",'dropdown-item')
            div.setAttribute("onclick",'selectItemcabo(this)')
            div.innerHTML=item.fields.descricao
            dropdownMenucabo.appendChild(div);
          
           }


           let dropdownMenubanquinho = document.getElementById("dropdownMenubanquinho");
           let inputscaner_banquinho = document.createElement("input");
           inputscaner_banquinho.setAttribute("type",'Text');
           inputscaner_banquinho.setAttribute("id",'dropdownInputbanquinho');
           inputscaner_banquinho.setAttribute("placeholder","Descrição..");
           dropdownMenubanquinho.appendChild(inputscaner_banquinho);

          const arrayscaner_banquinho = JSON.parse(data.banquinho);
            
          for (const item of arrayscaner_banquinho) {

            let div = document.createElement("div");
            div.setAttribute("data-id",item.pk)
            div.setAttribute("class",'dropdown-item')
            div.setAttribute("onclick",'selectItembanquinho(this)')
            div.innerHTML=item.fields.descricao
            dropdownMenubanquinho.appendChild(div);
          
           }

          

        },
        error: function (xhr, status, error) {
            alert('Erro: ' + xhr.responseJSON.message);
        }
    });


  }

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
     const dropdown = document.querySelector(".form-group");

    if (!dropdown.contains(e.target)) {
      document.getElementById("dropdownMenu").style.display = "none";
    }
  });

  // close filtragem drop conselho

  // filtragem drop mala start

  function toggleDropdownmala() {

    document.getElementById("dropdownMenu").style.display = "none";
    document.getElementById("dropdownMenuportatel").style.display = "none";
    document.getElementById("dropdownMenuimpressora").style.display = "none";
    document.getElementById("dropdownMenuscaner").style.display = "none";
    document.getElementById("dropdownMenucapitura").style.display = "none";
    document.getElementById("dropdownMenucamera").style.display = "none";
    document.getElementById("dropdowntripe").style.display = "none";
    document.getElementById("dropdownMenubanquinho").style.display = "none";

    
    const dropdown = document.getElementById("dropdownMenumala");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    document.getElementById("dropdownInputmala").value = "";
    filterDropdownmala();
    document.getElementById("dropdownInputmala").focus();
  }

  function filterDropdownmala() {
    const input = document.getElementById("dropdownInputmala").value.toLowerCase();
    const items = document.querySelectorAll(".dropdown-item");

    items.forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(input) ? "block" : "none";
    });
  }

  function selectItemmala(el) {
    const selectedValue = el.textContent;
    document.getElementById("malas").value = selectedValue;
    document.getElementById("malas").setAttribute("data-id", el.getAttribute("data-id"));
    document.getElementById("dropdownMenumala").style.display = "none";
  }

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
     const dropdown = document.querySelector(".form-group");

    if (!dropdown.contains(e.target)) {
     // document.getElementById("dropdownMenumala").style.display = "none";
    }
  });

  // close filtragem drop mala start

 // filtragem drop portatel start

    function toggleDropdownportatel() {

        document.getElementById("dropdownMenumala").style.display = "none";
        document.getElementById("dropdownMenu").style.display = "none";
        document.getElementById("dropdownMenuimpressora").style.display = "none";
        document.getElementById("dropdownMenuscaner").style.display = "none";
        document.getElementById("dropdownMenucapitura").style.display = "none";
        document.getElementById("dropdownMenucamera").style.display = "none";
        document.getElementById("dropdowntripe").style.display = "none";
        document.getElementById("dropdownMenubanquinho").style.display = "none";

        const dropdown = document.getElementById("dropdownMenuportatel");
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
        document.getElementById("dropdownInputportatel").value = "";
        filterDropdownportatel();
        document.getElementById("dropdownInputportatel").focus();
      }
    
      function filterDropdownportatel() {
        const input = document.getElementById("dropdownInputportatel").value.toLowerCase();
        const items = document.querySelectorAll(".dropdown-item");
    
        items.forEach(item => {
          item.style.display = item.textContent.toLowerCase().includes(input) ? "block" : "none";
        });
      }
    
      function selectIteportatel(el) {
        const selectedValue = el.textContent;
        document.getElementById("portatel").value = selectedValue;
        document.getElementById("portatel").setAttribute("data-id", el.getAttribute("data-id"));
        document.getElementById("dropdownMenuportatel").style.display = "none";
      }
    
      // Close dropdown when clicking outside
      document.addEventListener("click", function (e) {
         const dropdown = document.querySelector(".form-group");

        if (!dropdown.contains(e.target)) {
          document.getElementById("dropdownMenu").style.display = "none";
        }
      });
    
      
      // close filtragem drop portatel start

    // filtragem drop impressora start

    function toggleDropdownimpressora() {
       
        document.getElementById("dropdownMenumala").style.display = "none";
        document.getElementById("dropdownMenu").style.display = "none";
        document.getElementById("dropdownMenuportatel").style.display = "none";
        document.getElementById("dropdownMenuscaner").style.display = "none";
        document.getElementById("dropdownMenucapitura").style.display = "none";
        document.getElementById("dropdownMenucamera").style.display = "none";
        document.getElementById("dropdowntripe").style.display = "none";
        document.getElementById("dropdownMenubanquinho").style.display = "none";

        const dropdown = document.getElementById("dropdownMenuimpressora");
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
        document.getElementById("dropdownInputimpressora").value = "";
        filterDropdownimpressora();
        document.getElementById("dropdownInputimpressora").focus();
        
      }
    
      function filterDropdownimpressora() {
        const input = document.getElementById("dropdownInputimpressora").value.toLowerCase();
        const items = document.querySelectorAll(".dropdown-item");
    
        items.forEach(item => {
          item.style.display = item.textContent.toLowerCase().includes(input) ? "block" : "none";
        });
      }
      
      function selectItimpressora(el) {
        const selectedValue = el.textContent;
        document.getElementById("impressora").value = selectedValue;
        document.getElementById("impressora").setAttribute("data-id", el.getAttribute("data-id"));
        document.getElementById("dropdownMenuimpressora").style.display = "none";
      }
    
      // Close dropdown when clicking outside
      document.addEventListener("click", function (e) {
         const dropdown = document.querySelector(".form-group");

        if (!dropdown.contains(e.target)) {
          document.getElementById("dropdownMenu").style.display = "none";
        }
      });
    
      // close filtragem drop impressora start

     // filtragem drop scanner start

       function toggleDropdownscanner() {

        document.getElementById("dropdownMenumala").style.display = "none";
        document.getElementById("dropdownMenu").style.display = "none";
        document.getElementById("dropdownMenuportatel").style.display = "none";
        document.getElementById("dropdownMenuimpressora").style.display = "none";
        document.getElementById("dropdownMenucapitura").style.display = "none";
        document.getElementById("dropdownMenucamera").style.display = "none";
        document.getElementById("dropdownMenubanquinho").style.display = "none";

        const dropdown = document.getElementById("dropdownMenuscaner");
        document.getElementById("dropdowntripe").style.display = "none";

        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
        document.getElementById("dropdownInputscaner").value = "";
        filterDropdownscaner();
        document.getElementById("dropdownInputscaner").focus();
      }
    
      function filterDropdownscaner() {
        const input = document.getElementById("dropdownInputscaner").value.toLowerCase();
        const items = document.querySelectorAll(".dropdown-item");
    
        items.forEach(item => {
          item.style.display = item.textContent.toLowerCase().includes(input) ? "block" : "none";
        });
      }
    
      function selectItscaner(el) {
        const selectedValue = el.textContent;
        document.getElementById("Scaner_impresao_digital").value = selectedValue;
        document.getElementById("Scaner_impresao_digital").setAttribute("data-id", el.getAttribute("data-id"));
        document.getElementById("dropdownMenuscaner").style.display = "none";
      }
    
      // Close dropdown when clicking outside
      document.addEventListener("click", function (e) {
         const dropdown = document.querySelector(".form-group");

        if (!dropdown.contains(e.target)) {
          document.getElementById("dropdownMenu").style.display = "none";
        }
      });
      // close filtragem drop scanner start
      // filtragem drop scanner start

      function toggleDropdowncapitura() {

        document.getElementById("dropdownMenumala").style.display = "none";
        document.getElementById("dropdownMenu").style.display = "none";
        document.getElementById("dropdownMenuportatel").style.display = "none";
        document.getElementById("dropdownMenuimpressora").style.display = "none";
        document.getElementById("dropdownMenuscaner").style.display = "none";
        document.getElementById("dropdownMenucamera").style.display = "none";
        document.getElementById("dropdowntripe").style.display = "none";
        document.getElementById("dropdownMenubanquinho").style.display = "none";

        const dropdown = document.getElementById("dropdownMenucapitura");
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
        document.getElementById("dropdownInputcamera").value = "";
        filterDropdowncapitura();
        document.getElementById("dropdownInputcamera").focus();
      }
    
      function filterDropdowncapitura() {
        const input = document.getElementById("dropdownInputcamera").value.toLowerCase();
        const items = document.querySelectorAll(".dropdown-item");
        items.forEach(item => {
          item.style.display = item.textContent.toLowerCase().includes(input) ? "block" : "none";
        });
      }
    
      function selectItcapitura(el) {
        const selectedValue = el.textContent;
        document.getElementById("capitura_assinatura").value = selectedValue;
        document.getElementById("capitura_assinatura").setAttribute("data-id", el.getAttribute("data-id"));
        document.getElementById("dropdownMenucapitura").style.display = "none";
      }
    
      // Close dropdown when clicking outside
      document.addEventListener("click", function (e) {
         const dropdown = document.querySelector(".form-group");

        if (!dropdown.contains(e.target)) {
          document.getElementById("dropdownMenu").style.display = "none";
        }
      });
      // close filtragem drop scanner start

      // filtragem drop scanner start

      function toggleDropdowncamera() {

        document.getElementById("dropdownMenumala").style.display = "none";
        document.getElementById("dropdownMenu").style.display = "none";
        document.getElementById("dropdownMenuportatel").style.display = "none";
        document.getElementById("dropdownMenuimpressora").style.display = "none";
        document.getElementById("dropdownMenuscaner").style.display = "none";
        document.getElementById("dropdownMenucapitura").style.display = "none";
        document.getElementById("dropdowntripe").style.display = "none";
        document.getElementById("dropdownMenubanquinho").style.display = "none";

        const dropdown = document.getElementById("dropdownMenucamera");
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
        document.getElementById("dropdownInputcamera").value = "";
        document.getElementById("dropdownInputcamera").focus();
      }
  
      function selectItcamera(el) {
        const selectedValue = el.textContent;
        document.getElementById("cama_fotografia").value = selectedValue;
        document.getElementById("cama_fotografia").setAttribute("data-id", el.getAttribute("data-id"));
        document.getElementById("dropdownMenucamera").style.display = "none";
      }
    
      // Close dropdown when clicking outside
      document.addEventListener("click", function (e) {
         const dropdown = document.querySelector(".form-group");

        if (!dropdown.contains(e.target)) {
          document.getElementById("dropdownMenu").style.display = "none";
        }
      });
      // close filtragem drop scanner start

      // filtragem drop scanner start

      function toggleDropdownmalas_edit() {
        const dropdown = document.getElementById("dropdownMenumalas_edit");
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
        document.getElementById("dropdownInputmalas_edit").value = "";
        filterDropdownmala_edit();
        document.getElementById("dropdownInputmalas_edit").focus();
      }

      function filterDropdownmala_edit() {
        const input = document.getElementById("dropdownInputmalas_edit").value.toLowerCase();
        const items = document.querySelectorAll(".dropdown-item");
        items.forEach(item => {
          item.style.display = item.textContent.toLowerCase().includes(input) ? "block" : "none";
        });
      }
  
      function selectItmalas_edit(el) {
        const selectedValue = el.textContent;
        document.getElementById("malas_edit").value = selectedValue;
        document.getElementById("malas_edit").setAttribute("data-id", el.getAttribute("data-id"));
        document.getElementById("dropdownMenumalas_edit").style.display = "none";
      }
    
      // Close dropdown when clicking outside
      document.addEventListener("click", function (e) {
         const dropdown = document.querySelector(".form-group");

        if (!dropdown.contains(e.target)) {
       //   document.getElementById("dropdownMenu").style.display = "none";
        }
      });
      // close filtragem drop scanner start
  
// filtragem drop mala start

function toggleDropdowntripe() {

  document.getElementById("dropdownMenu").style.display = "none";
  document.getElementById("dropdownMenuportatel").style.display = "none";
  document.getElementById("dropdownMenuimpressora").style.display = "none";
  document.getElementById("dropdownMenuscaner").style.display = "none";
  document.getElementById("dropdownMenucapitura").style.display = "none";
  document.getElementById("dropdownMenucamera").style.display = "none";
  document.getElementById("dropdownMenubanquinho").style.display = "none";
  
  const dropdown = document.getElementById("dropdowntripe");
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  document.getElementById("dropdownInputripe").value = "";
  filterDropdowntripe();
  document.getElementById("dropdownInputripe").focus();
}

function filterDropdowntripe() {
  const input = document.getElementById("dropdownInputripe").value.toLowerCase();
  const items = document.querySelectorAll(".dropdown-item");

  items.forEach(item => {
    item.style.display = item.textContent.toLowerCase().includes(input) ? "block" : "none";
  });
}

function selectItemtripe(el) {
  const selectedValue = el.textContent;
  document.getElementById("tripe").value = selectedValue;
  document.getElementById("tripe").setAttribute("data-id", el.getAttribute("data-id"));
  document.getElementById("dropdowntripe").style.display = "none";
}

// Close dropdown when clicking outside
// filtragem drop mala start

function toggleDropdowncabo() {

  document.getElementById("dropdownMenu").style.display = "none";
  document.getElementById("dropdownMenuportatel").style.display = "none";
  document.getElementById("dropdownMenuimpressora").style.display = "none";
  document.getElementById("dropdownMenuscaner").style.display = "none";
  document.getElementById("dropdownMenucapitura").style.display = "none";
  document.getElementById("dropdownMenucamera").style.display = "none";
  document.getElementById("dropdowntripe").style.display = "none";
  document.getElementById("dropdownMenubanquinho").style.display = "none";
  
  const dropdown = document.getElementById("dropdownMenucabo");
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  document.getElementById("dropdownInpucabo").value = "";
  filterDropdowncabo();
  document.getElementById("dropdownInpucabo").focus();
}

function filterDropdowncabo() {
  const input = document.getElementById("dropdownInpucabo").value.toLowerCase();
  const items = document.querySelectorAll(".dropdown-item");

  items.forEach(item => {
    item.style.display = item.textContent.toLowerCase().includes(input) ? "block" : "none";
  });
}

function selectItemcabo(el) {
  const selectedValue = el.textContent;
  document.getElementById("cabo").value = selectedValue;
  document.getElementById("cabo").setAttribute("data-id", el.getAttribute("data-id"));
  document.getElementById("dropdownMenucabo").style.display = "none";
}

// Close dropdown when clicking outside

// filtragem drop mala start

function toggleDropdownbanquinho() {

  document.getElementById("dropdownMenu").style.display = "none";
  document.getElementById("dropdownMenuportatel").style.display = "none";
  document.getElementById("dropdownMenuimpressora").style.display = "none";
  document.getElementById("dropdownMenuscaner").style.display = "none";
  document.getElementById("dropdownMenucapitura").style.display = "none";
  document.getElementById("dropdownMenucamera").style.display = "none";
  document.getElementById("dropdowntripe").style.display = "none";
  document.getElementById("dropdownMenucabo").style.display = "none";
  
  const dropdown = document.getElementById("dropdownMenubanquinho");
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  document.getElementById("dropdownInputbanquinho").value = "";
  filterDropdownbanquinho();
  document.getElementById("dropdownInputbanquinho").focus();
}

function filterDropdownbanquinho() {
  const input = document.getElementById("dropdownInputbanquinho").value.toLowerCase();
  const items = document.querySelectorAll(".dropdown-item");

  items.forEach(item => {
    item.style.display = item.textContent.toLowerCase().includes(input) ? "block" : "none";
  });
}

function selectItembanquinho(el) {
  const selectedValue = el.textContent;
  document.getElementById("banquinho").value = selectedValue;
  document.getElementById("banquinho").setAttribute("data-id", el.getAttribute("data-id"));
  document.getElementById("dropdownMenubanquinho").style.display = "none";
}

// Close dropdown when clicking outside

let input = document.getElementById('searchInput');
 let table = document.getElementById('kit_table');
 let rows = table.getElementsByTagName('tr');
 let noMatchMessage = document.getElementById('noMatch');
 
 input.addEventListener('input', function () {
     let filter = input
         .value
         .toLowerCase();
     let matchFound = false;
 
     for (let i = 1; i < rows.length; i++) {
         let row = rows[i];
         let cells = row
             .getElementsByTagName('td');
         let found = false;
 
         for (let j = 0; j < cells.length; j++) {
             let cell = cells[j];
             if (cell.textContent.toLowerCase().indexOf(filter) > -1) {
                 found = true;
                 matchFound = true;
                 break;
             }
         }
 
         if (found) {
             row.style.display = '';
         } else {
             row.style.display = 'none';
         }
     }
 
     if (!matchFound) {
         noMatchMessage.style.display = 'block';
     } else {
         noMatchMessage.style.display = 'none';
     }
 });