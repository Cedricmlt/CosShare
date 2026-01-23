import express, { Router } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRoutes from "./route/usersRoutes.js";
import publicationsRoutes from "./route/publicationsRoutes.js";
import rolesRoutes from "./route/rolesRoutes.js";
import usersRoleRoutes from "./route/usersRoleRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

// Permet de parser les données de formulaire
app.use(express.urlencoded({ extended: true }));

// Permet à l'API d'accepter les requêtes venant d'un autre domaine
app.use(cors());

// Ajoute des en-têtes de sécurité pour protéger l'application contre des injections de code
app.use(helmet());

app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API CosShare !');
});

app.use("/api/users", usersRoutes);
app.use("/api/publication", publicationsRoutes);
app.use("/api/role", rolesRoutes);
app.use("/api/users-role", usersRoleRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Route non trouvée' });
});


app.use((err, req, res, next) => {
    console.error('❌ ERREUR :', err.message);
    console.error(err.stack);

    res.status(err.status || 500).json({
        message: err.message || 'Erreur serveur interne'
    });
});


app.listen(process.env.SERVER_PORT, () => {
    console.log(`Connexion à la base de données réussie ✅' http://localhost:${process.env.SERVER_PORT}`)
});
