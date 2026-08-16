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

// editar um livro

adicionarLivros.put('/:id', (req, res, next) => {
    try {
        const { titulo, autor, genero, anoPublicacao, isbn } = req.body;

        // verifica se esta vazio nos campos de titulo e autor
        if(!titulo || !autor) {
            return res.status(400).json({erro: "Titulo e autor são obrigatórios"});
        }

        const stmt = conexao.prepare(`
            UPDATE livros
            SET titulo = ?, autor = ?, genero = ?, anoPublicacao = ?, isbn = ?
            WHERE idLivro = ? AND idUsuario = ?
        `);

        const resultado = stmt.run(
            titulo, autor, genero || null, anoPublicacao || null, isbn || null, 
            req.params.id, req.session.usuario.id
        );

        if(resultado.changes === 0) {
            return res.status(404).json({ erro: "Livro não encontrado" });
        }

        res.json({ mensagem: "Livro atualizado com sucesso" });
    } catch(error) {
        next(error);
    }
});

// delete um livro

adicionarLivros.delete('/:id', (req, res, next) => {
    try {
        const stmt = conexao.prepare("DELETE FROM livros WHERE idLivro = ? AND idUsuario = ?");
        const resultado = stmt.run(req.params.id, req.session.usuario.id);

        if(resultado.changes === 0) {
            return res.status(404).json({ erro: "Livro não encontrado" });
        }

        res.status(204).send();
     } catch(error) {
        next(error);
    }
});

export default adicionarLivros;