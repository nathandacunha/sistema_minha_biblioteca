import express from 'express';
const router = express.Router();

// cria uma rota post 
router.post('/', (req, res) => {
    try {
        console.log(req.body);
        const { cpf, nome, senha } = req.body;

        console.log("Cadastro recebido com sucesso!");
        res.redirect("/pages/login.html");
    } catch(error) {
        console.log(error);
    }
});

export default router;