import express from 'express';
import { body, validationResult } from 'express-validator';
import { error } from 'node:console';
import conexao from '../models/db.js';
import bcrypt from 'bcrypt';

const cadastro = express.Router();
 
// criação das regras de validação uma por campo
const regrasValidacoes = [ 
    body('cpf') 
        .trim()
        .customSanitizer(valor => valor.replace(/\D/g, '')) // remove a pontuacao
        .isLength( { min: 11, max: 11 } ).withMessage("CPF deve ter 11 digitos"),

    body('nome')
        .trim()
        .isLength({ min: 6, max: 25 }).withMessage("Nome deve ter entre 6 a 25 caracteres"),

    body('senha')
        .isLength({ min: 8, max: 16 }).withMessage("Senha deve ter entre 8 a 16 caracteres"),
];

// cria uma rota post 
cadastro.post('/', regrasValidacoes, async (req, res, next) => {
    try {
        // verificacao se alguma regra falhou
        const erros = validationResult(req);

        if(!erros.isEmpty()) {
            return res.status(400).json({ erros: erros.array() });
        }

        const { cpf, nome, senha } = req.body;

        // gerando uma senha hash (10 é o numero de "rounds")
        const senhaHash = await bcrypt.hash(senha, 10);

        // inserindo as informações do usuário no banco de dados
        const stmt = conexao.prepare("INSERT INTO usuarios (cpf, nome, senha) VALUES (?,?,?)");
        stmt.run(cpf, nome, senhaHash);

        console.log("Cadastro recebido com sucesso!");
        res.redirect("/pages/login.html");
    } catch(error) {
        next(error);
    }
});

export default cadastro;