import express from 'express';
import conexao from '../models/db.js';
import { exigirLogin } from '../middlewares/autenticacao.js';

const adicionarLivros = express.Router();

// Cria livro
adicionarLivros.post('/', exigirLogin, (req, res, next) => {
  try {
    const { titulo, autor, genero, anoPublicacao, isbn } = req.body;

    if (!titulo || !autor) {
      return res.status(400).json({ erro: "Título e autor são obrigatórios" });
    }

    const stmt = conexao.prepare(`
      INSERT INTO livros (titulo, autor, genero, anoPublicacao, isbn, idUsuario)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    stmt.run(titulo, autor, genero || null, anoPublicacao || null, isbn || null, req.session.usuario.id);

    console.log(`Livro "${titulo}" cadastrado por ${req.session.usuario.nome}`);
    res.redirect('/pages/index.html');
  } catch (error) {
    next(error);
  }
});

// lista todos os livros especifico atraves do id

adicionarLivros.get('/:id', (req, res, next) => {
    try {
        const stmt = conexao.prepare("SELECT * FROM livros WHERE idLivro = ? AND idUsuario = ?");
        const livro = stmt.get(req.params.id, req.session.usuario.id);

        if(!livro) {
            return res.status(400).json({erro: "Livro não encontrado"});
        }

        res.json(livros);
    } catch(error) {
        next(error);
    }
});

export default adicionarLivros;