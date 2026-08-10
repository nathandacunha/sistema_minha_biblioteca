import express from 'express';
import { error } from 'node:console';
import conexao from '../models/db.js';
import bcrypt from 'bcrypt';

const cadastro = express.Router();

// cria uma rota post 
cadastro.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const { cpf, nome, senha } = req.body;

        
        // verificando se os campos estão vazios
        if(!cpf || !nome || !senha ) {
            return res.status(400).json({ erro: "Preenche todos os campos"});
        }

        // salvando o cpf sem a formatação
        const cpfLimpo = cpf.replace(/\D/g, '');

        // verifica o tamanho dos digitos 
        if(cpf.length !== 14) {
            return res.status(400).json( { erro: "Seu cpf deve ter 14 digitos "})
        }


        // verifica o tamanho do nome
        if((nome.length < 6) || (nome.length > 25)) {
            return res.status(400).json( { erro: "Seu nome deve ter entre 6 a 25 caracteres "})
        }

        console.log("Senha recebida: ", senha, " - Tamanho: ", senha.length);
        // verifica o tamanho da senha
        if((senha.length < 8) || (senha.length > 16)) {
            return res.status(400).json( { erro: "Sua senha deve ter entre 8 a 16 caracteres "});
        }

        // gerando uma senha hash (10 é o numero de "rounds")
        const senhaHash = await bcrypt.hash(senha, 10);

        // inserindo as informações do usuário no banco de dados
        const stmt = conexao.prepare("INSERT INTO usuarios (cpf, nome, senha) VALUES (?,?,?)");
        stmt.run(cpf, nome, senha);

        console.log("Cadastro recebido com sucesso!");
        res.redirect("/pages/login.html");
    } catch(error) {
        return res.status(500).json({ erro: "Erro interno no servidor. Tente mais tarde" });
    }
});

export default cadastro;