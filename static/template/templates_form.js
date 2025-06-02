function index() {

  fetch('../equipamento_index/')
      .then(res => res.text())
      .then(html => {
         
        document.getElementById("container_xl").innerHTML = html;

        
        const scriptExistente = document.querySelector(`script[data-dinamico]`);

        if (scriptExistente) {

           scriptExistente.remove()

           const script = document.createElement("script");
           script.src = `/static/Equipamento/equipamento.js`+ '?_t=' + Date.now();
           script.setAttribute("data-dinamico", "true");
           document.body.appendChild(script);


        }else{

          const script = document.createElement("script");
          script.setAttribute('id','equipamento_js')
          script.src = `/static/Equipamento/equipamento.js`;
          script.setAttribute("data-dinamico", "true");
          document.body.appendChild(script);

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

        }

      });
};



function equipamento_form() {
  
   
    fetch('../equipamento_index/')
        .then(res => res.text())
        .then(html => {
          document.getElementById("container_xl").innerHTML = '';
          document.getElementById("container_xl").innerHTML = html;
        });

      const scriptExistente = document.querySelector(`script[data-dinamico]`);

        if (scriptExistente) {

           console.log("Ficheiro Existente")

        }else{

          const script = document.createElement("script");
          script.setAttribute('id','equipamento_js')
          script.src = `/static/Equipamento/equipamento.js`;
          script.setAttribute("data-dinamico", "true");
          document.body.appendChild(script);

        }

        const scriptcheckbok = document.querySelector(`script[data-dinamico-checkbox]`);

        if (scriptcheckbok) {

           console.log("Ficheiro Existente")

        }else{

          const checkbox = document.createElement("script");
          checkbox.src = `/static/template/checkbox_equipamento.js`;
          checkbox.setAttribute("data-dinamico-checkbox", "true");
          document.head.appendChild(checkbox);

        }

      
    }


  function mobiliario_form() {

      document.querySelectorAll("script[data-dinamico]").forEach(s => s.remove());

      fetch('../mobiliario_index/')
          .then(res => res.text())
          .then(html => {
            console.log('ali');
            document.getElementById("container_xl").innerHTML = html;
          });

         const script = document.createElement("script");
         script.setAttribute('id','mobiliario_js')
         script.src = `/static/mobiliario/mobiliario.js`;
         script.setAttribute("data-dinamico", "true");
         document.body.appendChild(script);
      }

  
