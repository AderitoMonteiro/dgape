function index() {

  fetch('../equipamento_index/')
      .then(res => res.text())
      .then(html => {
         
        document.getElementById("container_xl").innerHTML = html;
        checkbox_equipamento();
        
        /*const scriptExistente = document.querySelector(`script[data-dinamico]`);

        if (scriptExistente) {

           scriptExistente.remove()

           const script = document.createElement("script");
           script.src = `/static/Equipamento/equipamento.js`+ '?_t=' + Date.now();
           script.setAttribute("data-dinamico", "true");
           document.body.appendChild(script);

           var script_m = document.createElement("script");
           script_m.setAttribute('id','mobiliario_js')
           script_m.src = `/static/Mobiliario/mobiliario.js`+ '?_t=' + Date.now();;
           document.body.appendChild(script_m);


        }else{

          const script = document.createElement("script");
          script.setAttribute('id','equipamento_js')
          script.src = `/static/Equipamento/equipamento.js`;
          script.setAttribute("data-dinamico", "true");
          document.body.appendChild(script);

          var script_m = document.createElement("script");
          script_m.setAttribute('id','mobiliario_js')
          script_m.setAttribute("data-dinamico", "true");
          script_m.src = `/static/Mobiliario/mobiliario.js`;
          document.body.appendChild(script_m);

         
        }

        const scriptcheckbok = document.querySelector(`script[data-dinamico-checkbox]`);

        if (scriptcheckbok) {

           console.log("Ficheiro Existente")
           scriptcheckbok.remove()
           const checkbox = document.createElement("script");
           checkbox.src = `/static/template/checkbox_equipamento.js`+'?_t=' + Date.now();
           checkbox.setAttribute("data-dinamico-checkbox", "true");
           document.head.appendChild(checkbox);

        }else{

          const checkbox = document.createElement("script");
          checkbox.src = `/static/template/checkbox_equipamento.js`;
          checkbox.setAttribute("data-dinamico-checkbox", "true");
          document.head.appendChild(checkbox);

        }*/

      });
};



function equipamento_form() {
  
   
    fetch('../equipamento_index/')
        .then(res => res.text())
        .then(html => {
          document.getElementById("container_xl").innerHTML = html;
          checkbox_equipamento();
        });
    }


function mobiliario_form() {

      fetch('../mobiliario_index/')
          .then(res => res.text())
          .then(html => {
           
            document.getElementById("container_xl").innerHTML = '';
            document.getElementById("container_xl").innerHTML = html;
            checkbox_mobiliario();

          });

      }


function checkbox_equipamento(){

    setTimeout(() => {
      var cabecalho = document.getElementById('selectAll');
      var linhas = document.querySelectorAll('.equipamento-checkbox');


      cabecalho.addEventListener('change', function () {
        
        linhas.forEach(cb => cb.checked = this.checked);
      });

      linhas.forEach(cb => {
        cb.addEventListener('change', function () {
          if (!this.checked) {
            cabecalho.checked = false;
          } else {
            const todosMarcados = Array.from(linhas).every(cb => cb.checked);
            cabecalho.checked = todosMarcados;
          }
        });
      });

  }, 2000); // 2 segundos
}


function checkbox_mobiliario(){

  setTimeout(() => {

    var cabecalho = document.getElementById('selectAll');
    var linhas = document.querySelectorAll('.mobiliario-checkbox');
    
    
            cabecalho.addEventListener('change', function () {
            
            linhas.forEach(cb => cb.checked = this.checked);
            });
    
            linhas.forEach(cb => {
            cb.addEventListener('change', function () {
                if (!this.checked) {
                cabecalho.checked = false;
                } else {
                const todosMarcados = Array.from(linhas).every(cb => cb.checked);
                cabecalho.checked = todosMarcados;
                }
            });
    });
    
}, 1000); // 2 segundos

}


  
