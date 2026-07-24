fetch('/livros')
    .then(resposta => resposta.json())
    .then(livros => {
        const lista = document.getElementById('listarLivros');

        livros.forEach(livro => {
            const item = document.createElement('li');
            item.textContent = `${livro.titulo} - ${livro.autor}  (${livro.anoPublicacao || 'ano não informado'})`;
            lista.appendChild(item);
        });
    })
    .catch(error => console.log(error));