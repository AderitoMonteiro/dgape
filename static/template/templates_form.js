function index() {

  fetch('../equipamento_index/')
      .then(res => res.text())
      .then(html => {
        console.log('ali');
        document.getElementById("container_xl").innerHTML = html;
      });
};

function equipamento_form() {

    fetch('../equipamento_index/')
        .then(res => res.text())
        .then(html => {
          console.log('ali');
          document.getElementById("container_xl").innerHTML = html;
        });
    }


  function mobiliario_form() {

      fetch('../mobiliario_index/')
          .then(res => res.text())
          .then(html => {
            console.log('ali');
            document.getElementById("container_xl").innerHTML = html;
          });
      }