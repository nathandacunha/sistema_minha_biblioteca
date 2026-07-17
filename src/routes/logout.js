import express from 'express';

const logout = express.Router();

logout.post('/', (req, res) => {
    req.session.destroy((error) => {
        if(error) {
            console.log(error);
            return res.status(500).json({ erro: "Erro ao encerrar a sessão" });
        }
        console.log("Sessão encerrada com sucesso.");
        res.redirect('/pages/login.html');
    });
});

export default logout; 