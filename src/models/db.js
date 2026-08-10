import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// simula o __dirname em ESmodules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// conexao com o banco
const conexao = new Database(path.join(__dirname, "..", "..", "minhaBiblioteca.db"));

// criando uma table usuarios
conexao.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cpf TEXT NOT NULL UNIQUE,
        nome TEXT NOT NULL,
        senha TEXT NOT NULL
    )
`);

// criando uma table livros
conexao.exec(`
    CREATE TABLE IF NOT EXISTS livros (
        idLivro INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        autor TEXT NOT NULL,
        genero TEXT,
        anoPublicacao INTEGER,
        isbn TEXT,
        idUsuario INTEGER NOT NULL,
        FOREIGN KEY (idUsuario) REFERENCES usuarios(id)
    )    
`);

export default conexao;