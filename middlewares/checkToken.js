import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";
dotenv.config();

const checkToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ message: "Vous devez être connecter." });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token manquant." });
    } else {
        jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {

            if (err) {
                return res.status(401).json({ message: "Le token est invalide." });
            }
            req.userId = decoded.id_Users;
            req.userEmail = decoded.email_connexion;
            next();
        })
    }
}

export default checkToken;