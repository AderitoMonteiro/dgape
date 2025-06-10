try{

function index() {

  fetch('../equipamento_index/')
      .then(res => res.text())
      .then(html => {
         
        document.getElementById("container_xl").innerHTML = html;
        checkbox_equipamento();
        date_entrada();
        filter_table_equipamento();
        toggleDropdown_equipamento_update();
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
           date_entrada();
        });
}

function acessorio_form() {
  
   
  fetch('../gestao_acessorio/')
      .then(res => res.text())
      .then(html => {
        document.getElementById("container_xl").innerHTML = html;
        date_entrada();
        date_entrada_edit()
        filter_table_acessorio();
        checkbox_acessorio();
      });
}


function mobiliario_form() {

      fetch('../mobiliario_index/')
          .then(res => res.text())
          .then(html => {
           
            document.getElementById("container_xl").innerHTML = '';
            document.getElementById("container_xl").innerHTML = html;
            checkbox_mobiliario();
            date_entrada();
            filter_table_mobiliario();
            enable_div();
            preencher_serial_nunber();

          });

      }

 function kit_form(){

    fetch('../gestao_kit_eleitoral/')
          .then(res => res.text())
          .then(html => {

            document.getElementById("container_xl").innerHTML = html;
            data_saida();
            checkbox_kit();
            filter_table_kit();
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

  }, 1000); // 2 segundos
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

function checkbox_kit(){

  setTimeout(() => {

    var cabecalho = document.getElementById('selectAll');
    var linhas = document.querySelectorAll('.kit-checkbox');
    
    
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

function date_entrada(){

  setTimeout(() => {
    flatpickr("#data_entrada", {
        dateFormat: "Y-m-d",
        locale: "pt"
        });
      }, 1000); // 2 segundos
  }

  function date_entrada_edit(){

    setTimeout(() => {
      flatpickr("#data_entrada_edit", {
          dateFormat: "Y-m-d",
          locale: "pt"
          });
        }, 1000); // 2 segundos
    }

function filter_table_equipamento() {
  
  setTimeout(() => {
    /** script.js **/
               let input = document.getElementById('searchInput');
               let table = document.getElementById('equipamento_table');
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
   }, 1000); // 2 segundos
}


function filter_table_mobiliario(){

                setTimeout(() => {
                  let input = document.getElementById('searchInput');
                  let table = document.getElementById('mobiliario_table');
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
              });   }, 1000); // 2 segundos
}

function data_saida(){

  setTimeout(() => {

          flatpickr("#data_saida", {
            dateFormat: "Y-m-d",
            locale: "pt"
          });
        
    
      }, 2000); // 2 segundos
}



function filter_table_kit(){

  setTimeout(() => {
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
}, 1000); // 2 segundos

}

function toggleDropdown_equipamento_update() {
  const dropdown = document.getElementById("dropdownMenu");
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  document.getElementById("dropdownInput").value = "";
  filterDropdown(); // show all items when opening
  document.getElementById("dropdownInput").focus();
}

function enable_div(){

    document.getElementById('tipo_item').addEventListener('change', function () {
      const valorSelecionado = this.value;

      if (valorSelecionado=='Mesa' || valorSelecionado=='Cadeira'){

        document.getElementById('div_modelo').setAttribute('style',"display: block;")
        document.getElementById('div_serial').setAttribute('style',"display: block;")
        document.getElementById('id_modelo').value = '';
        document.getElementById('serial_number').value = '';
        document.getElementById('serial_number').disabled = true;

      }else{

        document.getElementById('div_modelo').setAttribute('style',"display: none;")
        document.getElementById('div_serial').setAttribute('style',"display: none;")
      }
     
    });
}

function preencher_serial_nunber(){

   document.getElementById('id_modelo').addEventListener('change', function () {

   var modelo=this.value;
   const timestamp = Date.now();
    
   document.getElementById('serial_number').value = modelo.replace(/ /g, '')+timestamp;

   });

}

function filter_table_acessorio(){

  setTimeout(() => {
  let input = document.getElementById('searchInput');
 let table = document.getElementById('acessorio_table');
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
}, 1000); // 2 segundos

}

function checkbox_acessorio(){

  setTimeout(() => {

    var cabecalho = document.getElementById('selectAll');
    var linhas = document.querySelectorAll('.acessorio-checkbox');
    
    
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



} catch (e) {
  console.error("Erro ao executar função:", e);
}
  
