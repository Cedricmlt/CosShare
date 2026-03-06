import express, { Router } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRoutes from "./route/usersRoutes.js";
import publicationsRoutes from "./route/publicationsRoutes.js";
import rolesRoutes from "./route/rolesRoutes.js";
import usersRoleRoutes from "./route/usersRoleRoutes.js";
import typeCosplayRoutes from "./route/typeCosplayRoutes.js";
import universCosplayRoutes from "./route/universCosplayRoutes.js";
import outilsCosplayRoutes from "./route/outilsCosplayRoutes.js";
import accessoiresCosplayRoutes from "./route/accessoiresCosplayRoutes.js";
import fabricationCosplayRoutes from "./route/fabricationCosplayRoutes.js";
import materiauxCosplayRoutes from "./route/materiauxCosplayRoutes.js";
import cosplayRoutes from "./route/cosplayRoutes.js";
import mediaInPublicationRoutes from "./route/mediaInPublicationRoutes.js";
import cosplayEstimationRoutes from "./route/cosplayEstimationRoutes.js";
import tagsRoutes from "./route/tagsRoutes.js";
import publicationTagsRoutes from "./route/publicationTagsRoutes.js";
import userPublicationLikeRoutes from "./route/userPublicationLikeRoutes.js";
import userPublicationCommentRoutes from "./route/userPublicationCommentRoutes.js";
import actualityRoutes from "./route/actualityRoutes.js";
import eventsRoutes from "./route/eventsRoutes.js";
import mediaActualityRoutes from "./route/mediaActualityRoutes.js";
import eventParticipantsRoutes from "./route/eventParticipantsRoutes.js";
import conversationRoutes from "./route/conversationRoutes.js";
import conversationUserRoutes from "./route/conversationUserRoutes.js";
import messageRoutes from "./route/messageRoutes.js";
import categoryArticleRoutes from "./route/categoryArticleRoutes.js";
import articleCosplayRoutes from "./route/articleCosplayRoutes.js";
import userCommentArticleRoutes from "./route/userCommentArticleRoutes.js";
import userLikeArticleRoutes from "./route/userLikeArticleRoutes.js";
import followRoutes from "./route/followRoutes.js";
import mediaCosplayRoutes from "./route/mediaCosplayRoutes.js";
import notificationsRoutes from "./route/notificationsRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

// Permet de parser les données de formulaire
app.use(express.urlencoded({ extended: true }));

// Permet à l'API d'accepter les requêtes venant d'un autre domaine
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Ajoute des en-têtes de sécurité pour protéger l'application contre des injections de code
app.use(helmet());

app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API CosShare !');
});

app.use("/api/users", usersRoutes);
app.use("/api/publication", publicationsRoutes);
app.use("/api/role", rolesRoutes);
app.use("/api/users-role", usersRoleRoutes);
app.use("/api/type-cosplay", typeCosplayRoutes);
app.use("/api/univers-cosplay", universCosplayRoutes);
app.use("/api/outils-cosplay", outilsCosplayRoutes);
app.use("/api/accessoires-cosplay", accessoiresCosplayRoutes);
app.use("/api/fabrication-cosplay", fabricationCosplayRoutes);
app.use("/api/materiaux-cosplay", materiauxCosplayRoutes);
app.use("/api/cosplay", cosplayRoutes);
app.use("/api/media-publication", mediaInPublicationRoutes);
app.use("/api/cosplay-estimation", cosplayEstimationRoutes);
app.use("/api/tags", tagsRoutes);
app.use("/api/publication-tags", publicationTagsRoutes);
app.use("/api/user-publication-like", userPublicationLikeRoutes);
app.use("/api/user-publication-comment", userPublicationCommentRoutes);
app.use("/api/actuality", actualityRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/media-actuality", mediaActualityRoutes);
app.use("/api/event-participants", eventParticipantsRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("/api/conversation-user", conversationUserRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/category-article", categoryArticleRoutes);
app.use("/api/article-cosplay", articleCosplayRoutes);
app.use("/api/user-comment-article", userCommentArticleRoutes);
app.use("/api/user-like-article", userLikeArticleRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/media-cosplay", mediaCosplayRoutes);
app.use("/api/notifications", notificationsRoutes);

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
