import express from 'express';
import { body, validationResult } from 'express-validator';
import { error } from 'node:console';
import conexao from '../models/db.js';
import bcrypt from 'bcrypt';

const login = express.Router();

// criando regras de validação para o login
const regrasLogin = [
    body('cpf')
        .trim()
        .customSanitizer(valor => valor.replace(/\D/g, ''))
        .notEmpty().withMessage('CPF é obrigatório'),
    
    body('senha')
        .notEmpty().withMessage('A senha é obrigatoria'),
];

// criar uma rota post
login.post('/', regrasLogin, async (req, res) => {
    try {
        const erros = validationResult(req);

        if(!erros.isEmpty()) {
            return res.status(400).json({ erros: erros.array() });
        }

        const { cpf, senha } = req.body;

        const stmt = conexao.prepare("SELECT * FROM usuarios WHERE cpf = ?");
        const usuario = stmt.get(cpf);

        console.log("Usuario encontrado: ", usuario);

        if(!usuario) {
            return res.status(400).json( { erro: `CPF ou senha do usuário inválido`});
        }

        // comparando a senha digita com o hash salvo
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

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