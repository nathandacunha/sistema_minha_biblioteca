import express from 'express';
import { error } from 'node:console';
import conexao from '../models/db.js';
import bcrypt from 'bcrypt';

const login = express.Router();

// criar uma rota get
login.post('/', (req, res) => {
    try {
        const {cpf, senha} = req.body;

        // verificando se os campos estão vazios
        if(!cpf || !senha ) {
            return res.status(400).json({ erro: "Preenche todos os campos"});
        }

        const stmt = conexao.prepare("SELECT * FROM usuarios WHERE cpf = ?");
        const usuario = stmt.get(cpf);

        if(!usuario) {
            return res.status(400).json( { erro: `CPF ou senha do usuário inválido`});
        }

        // comparando a senha digita com o hash salvo
        if(!senhaCorreta) {
            return res.status(400).json({ erro: "CPF ou senha do usuário inválido" });
        }

        req.session.usuario = { id: usuario.id, nome: usuario.nome };
        console.log("Login bem-sucessido: ", usuario.nome);
        res.redirect('/pages/index.html');
    } catch(error) {
        return res.status(400).json( { erro: "Erro interno no servidor. Tente mais tarde"});
    }
});

export default login;