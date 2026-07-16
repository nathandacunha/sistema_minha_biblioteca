import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// simula o __dirname em ESmodules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3300;

app.use(express.static(path.join(__dirname, 'public')));

// rota raiz que redireciona para o login
app.get('/', (req, res) => {
    res.redirect('/src/public/pages/login.html');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});