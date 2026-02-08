// middlewares/checkToken.js
import jwt from 'jsonwebtoken';

const checkToken = (req, res, next) => {
    try {
        // Récupérer le token depuis l'en-tête Authorization
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Token manquant ou mal formaté." });
        }

        // Extraire le token (sans le mot "Bearer ")
        const token = authHeader.split(" ")[1];

        // Vérifier et décoder le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.id_Users = decoded.id_Users;



        // Passer à l'étape suivante
        next();
    } catch (error) {
        console.error("Erreur lors de la vérification du token :", error);
        return res.status(401).json({ message: "Token invalide ou expiré." });
    }
};

export default checkToken;
