import userCommentArticleModel from "../model/userCommentArticleModel.js";

const getAllUserCommentArticle = async (req, res) => {
    try {
        const userCommentArticle = await userCommentArticleModel.getAllUserCommentArticle();
        return res.status(200).json(
            { message: "Récupération des associations commentaire utilisateur sur article réussie. ✅", userCommentArticle });
    } catch (error) {
        console.error(error);
        return res.status(500).json(
            { message: "Un problème est survenu lors de la récupération des associations commentaire utilisateur sur article." });

    }
};

const getUserCommentArticleById = async (req, res) => {
    try {
        const id_comment_article = req.params.id_comment_article;
        const userCommentArticleId = await userCommentArticleModel.getUserCommentArticleById(id_comment_article);

        if (userCommentArticleId) {
            return res.status(200).json(
                { message: "Récupération de l'association commentaire utilisateur sur article via l'ID réussie. ✅", userCommentArticleId });
        } else {
            return res.status(404).json({ message: "Aucune donnée trouvée." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json(
            { message: "Un problème est survenu lors de la récupération de l'association commentaire utilisateur sur article." });

    }
};

const createUserCommentArticle = async (req, res) => {
    try {
        const { users_Id, article_Id, commentaire } = req.body;

        if (!users_Id || !article_Id || !commentaire) {
            return res.status(400).json({ message: "Les champs users_Id, article_Id, commentaire sont requis." });
        }

        const existingUserCommentArticle = await userCommentArticleModel.getUserCommentArticleByAttributes(users_Id, article_Id, commentaire);

        if (existingUserCommentArticle) {
            return res.status(409).json({ message: "Le commentaire article existe déjà." });
        }

        const addUserCommentArticle = await userCommentArticleModel.createUserCommentArticle(users_Id, article_Id, commentaire);

        if (!addUserCommentArticle) {
            return res.status(404).json({ message: "Impossible de créer un commentaire sur l'article." });
        } else {
            return res.status(201).json(
                { message: "Création du commentaire utilisateur sur l'article réussie. ✅", addUserCommentArticle });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json(
            { message: "Un problème est survenu lors de la création du commentaire utilisateur sur l'article." });

    }
};

const updateUserCommentArticle = async (req, res) => {
    try {
        const id_comment_article = req.params.id_comment_article;
        const { users_Id, article_Id, commentaire, is_notified } = req.body;

        if (is_notified === undefined) {
            return res.status(400).json({ message: "Le champs is_notified est requis." });
        }

        if (![0, 1].includes(is_notified)) {
            return res.status(400).json({ message: "La valeur de is_notified doit être 0 ou 1." });
        }

        const changeUserCommentArticle = await userCommentArticleModel.updateUserCommentArticle(id_comment_article, users_Id, article_Id, commentaire, is_notified);

        if (changeUserCommentArticle === 0) {
            return res.status(404).json({ message: "Aucune donnée trouvée pour la mise à jour du commentaire article." });
        } else {
            return res.status(200).json(
                { message: "Mise à jour du commentaire sur l'article réussie. ✅", changeUserCommentArticle });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json(
            { message: "Un problème est survenu lors de la mise à jour du commentaire utilisateur sur l'article." });

    }
};

const deleteUserCommentArticle = async (req, res) => {
    try {
        const id_comment_article = req.params.id_comment_article;
        const suppUserCommentArticle = await userCommentArticleModel.deleteUserCommentArticle(id_comment_article);

        if (suppUserCommentArticle === 0) {
            return res.status(404).json(
                { message: "Aucune donnée trouvée pour la suppression du commentaire utilisateur sur l'article." });
        } else {
            return res.status(200).json(
                { message: "Suppression du commentaire utilisateur sur l'article réussie. ✅", suppUserCommentArticle });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json(
            { message: "Un problème est survenu lors de la suppression du commentaire utilisateur sur l'article." });

    }
};

export default {
    getAllUserCommentArticle,
    getUserCommentArticleById,
    createUserCommentArticle,
    updateUserCommentArticle,
    deleteUserCommentArticle
}