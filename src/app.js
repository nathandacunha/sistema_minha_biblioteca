import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cadastroRoutes from './routes/cadastro.js';
import loginRoutes from '../src/routes/login.js';
import logoutRoutes from '../src/routes/logout.js';
import session from 'express-session';
import Database from './models/db.js';
import adicionarLivrosRoutes from './controllers/livros.js';

// simula o __dirname em ESmodules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// rota raiz que redireciona para o cadastro
app.get('/', (req, res) => {
    res.redirect('/pages/cadastro.html');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/pages/cadastro.html`);
});

// adiciona a session 
app.use(session({
    secret: "Uma frase quaisquer",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000*60*60 }
}));


// usando a rota cadastro e de login
app.use(express.urlencoded({ extended: true}));
app.use('/cadastro', cadastroRoutes);
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
app.use('/livros', adicionarLivrosRoutes);