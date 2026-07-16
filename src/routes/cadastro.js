import express from 'express';
import { error } from 'node:console';
const router = express.Router();

// cria uma rota post 
router.post('/', (req, res) => {
    try {
        console.log(req.body);
        const { cpf, nome, senha } = req.body;

        // verificando se os campos estão vazios
        if(!cpf === "" || !nome === "" || !senha === "") {
            return res.status(400).json({ erro: "Preenche todos os campos"});
        }

        console.log("Cadastro recebido com sucesso!");
        res.redirect("/pages/login.html");
    } catch(error) {
        return res.status(500).json({ erro: "Erro interno no servidor. Tente mais tarde" });
    }
});

export default router;