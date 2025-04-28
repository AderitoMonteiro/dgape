function getCSRFToken() {
    return document.querySelector('meta[name="csrf-token"]').getAttribute("content");
}

function slowReload() {
    setTimeout(() => {
        location.reload();
    }, 2000); // 2 segundos
}

function add_inventario_equipamanto() {

    
    const data_entrada = document.getElementById('data_entrada').value;
    const provinencia = document.getElementById('provinencia').value;
    const equipamento = document.getElementById('equipamento').value;
    const localizacao = document.getElementById('localizacao').value;
    const estado = document.getElementById('obs').value;
    const id_user = document.getElementById('id_user').value;

    // Dados para enviar
    const data = {
        "data_entrada": data_entrada,
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
 
             const datajs = JSON.parse(data);
             
             console.log(datajs)
           
 
          },
         error: function (xhr, status, error) {
 
             alert('Erro: ' + xhr.responseJSON.message);
         } 
     });
 }
