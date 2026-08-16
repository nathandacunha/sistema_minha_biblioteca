export function exigirLogin(req, res, next) {
    if(!req.session.usuario) {
        return res.status(401).json({ erro: "Você precisa estar logado" });
    }
    next();
} 