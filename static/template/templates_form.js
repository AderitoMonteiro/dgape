function index() {

  fetch('../equipamento_index/')
      .then(res => res.text())
      .then(html => {
         
        document.getElementById("container_xl").innerHTML = html;

        const script = document.createElement("script");
        script.setAttribute('id','equipamento_js')
        script.src = `/static/Equipamento/equipamento.js`;
        script.className = "js-dinamico";
        document.body.appendChild(script);

      });
};

function equipamento_form() {

    fetch('../equipamento_index/')
        .then(res => res.text())
        .then(html => {
          console.log('ali');
          document.getElementById("container_xl").innerHTML = html;
        });

        const script = document.createElement("script");
        script.setAttribute('id','equipamento_js')
        script.src = `/static/Equipamento/equipamento.js`;
        script.className = "js-dinamico";
        document.body.appendChild(script);
    }


  function mobiliario_form() {

      fetch('../mobiliario_index/')
          .then(res => res.text())
          .then(html => {
            console.log('ali');
            document.getElementById("container_xl").innerHTML = html;
          });

         const script = document.createElement("script");
         script.setAttribute('id','mobiliario_js')
         script.src = `/static/Mobiliario/mobiliario.js`;
         script.className = "js-dinamico";
         document.body.appendChild(script);
      }