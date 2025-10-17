function carregarPagina(layout) {
  return new Promise((resolve, reject) => {
    fetch(layout)
      .then(response => response.text())
      .then(data => {
        const container = document.getElementById('conteudo');
        container.innerHTML = data;

        // Encontra e executa scripts inline presentes no conteúdo carregado
        const scripts = container.querySelectorAll('script');
        scripts.forEach(script => {
          const novoScript = document.createElement('script');
          novoScript.textContent = script.textContent;

          // Copia atributos do script original (opcional, para type="module", etc.)
          [...script.attributes].forEach(attr => {
            novoScript.setAttribute(attr.name, attr.value);
          });

          document.body.appendChild(novoScript); // Executa o script
        });

        resolve(true);
      })
      .catch((erro) => {
        reject(erro);
      });
  });
}