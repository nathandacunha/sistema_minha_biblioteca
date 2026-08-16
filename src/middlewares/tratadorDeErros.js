export function tratadorErros(err, req, res, next) {
    console.error(error);

    // erro na validação do sqlite, exemplo: cpf duplicado
    if(err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return res.status(409).json({ erro: "Esse cpf já esta cadastrado" });
    }

    // error generico/não previsto
    res.status(500).json({ erro: "Erro interno no servidor. Tente mais tarde" });
}