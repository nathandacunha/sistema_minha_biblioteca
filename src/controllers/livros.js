import express from 'express';
import conexao from '../models/db.js';

const adicionarLivros = express.Router();

adicionarLivros.post('/', (req, res) => {
    try {
        // protegendo a rota, usuário só logado pode cadastrar livros
        if(!req.session.usuario) {
            return res.status(401).json( { erro: "Você precisa estar logado" } );
        }

        const { titulo, autor, genero, anoPublicacao, isbn } = req.body;

        // verificando se titulo ou autor estão vazios
        if((!titulo) || (!autor)) {
            return res.status(400).json( { erro: "Titulo e ano são obrigatórios" } );
        }

        const stmt = conexao.prepare(`INSERT INTO livros (titulo, autor, genero, anoPublicacao, isbn, idUsuario) VALUES (?, ?, ?, ?, ?, ?)`);

        stmt.run(titulo, autor, genero || null, anoPublicacao || null, isbn || null, req.session.usuario.id );

        console.log(`Livro "${titulo}" cadastrado por ${req.session.usuario.nome}`);
        res.redirect('/pages/index.html');
    } catch(error) {
        res.status(500).json({ erro: "Erro interno no servidor. Tente mais tarde"});
    }
});

adicionarLivros.get('/', (req, res) => {
    try {
        if (!req.session.usuario) {
            return res.status(401).json({ erro: "Você precisa estar logado" });
        }

        const stmt = conexao.prepare('SELECT * FROM livros WHERE idUsuario = ?');
        const livros = stmt.all(req.session.usuario.id);

        res.json(livros);
    } catch(error) {
        console.log(error);
        res.status(500).json({ erro: "Erro interno no servidor. Tente mais tarde" });
    }
});
export default adicionarLivros;