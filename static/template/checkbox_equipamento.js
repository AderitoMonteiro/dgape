const cabecalho = document.getElementById('selectAll');
const linhas = document.querySelectorAll('.equipamento-checkbox');

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