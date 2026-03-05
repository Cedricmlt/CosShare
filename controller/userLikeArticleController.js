import userLikeArticleModel from "../model/userLikeArticleModel.js";

const getAllUserLikeArticle = async (req, res) => {
    try {
        const userLikeArticle = await userLikeArticleModel.getAllUserLikeArticle();
        return res.status(200).json(
            { message: "Récupération des associations utilisateur like article réussie. ✅", userLikeArticle });
    } catch (error) {
        console.error(error);
        return res.status(500).json(
            { message: "Un problème est survenu lors de la récupération des associations utilisateur like article." });

    }
};

const getUserLikeArticleById = async (req, res) => {
    try {
        const { users_Id, article_Id } = req.params;
        const userLikeArticleId = await userLikeArticleModel.getUserLikeArticleById(users_Id, article_Id);

        if (userLikeArticleId) {
            return res.status(200).json(
                { message: "Récupération des associations utilisateur like article via l'ID réussie. ✅", userLikeArticleId });
        } else {
            return res.status(404).json({ message: "Aucune donnée trouvée." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json(
            { message: "Un problème est survenu lors de la récupération des associations utilisateur like article via l'ID." });

    }
};

const createUserLikeArticle = async (req, res) => {
    try {
        const { users_Id, article_Id } = req.body;

        if (!users_Id || !article_Id) {
            return res.status(400).json({ message: "Les champs users_Id, article_Id sont requis." });
        }

        const existingUserLikeArticle = await userLikeArticleModel.getUserLikeArticleByAttributes(users_Id, article_Id);

        if (existingUserLikeArticle) {
            return res.status(409).json({ message: "L'association utilisateur like article existe déjà." });
        }

        const addUserLikeArticle = await userLikeArticleModel.createUserLikeArticle(users_Id, article_Id);

        if (!addUserLikeArticle) {
            return res.status(404).json({ message: "Impossible de créer l'association utilisateur like article." });
        } else {
            return res.status(201).json(
                { message: "Création de l'association utilisateur like article réussie. ✅", addUserLikeArticle });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json(
            { message: "Un problème est survenu lors de la création de l'association utilisateur like article." });

    }
};

const updateUserLikeArticle = async (req, res) => {
    try {
        const { users_Id, article_Id } = req.params;
        const { is_notified } = req.body;

        if (is_notified === undefined) {
            return res.status(400).json({ message: "Le champs is_notified est requis." });
        }

        if (![0, 1].includes(is_notified)) {
            return res.status(400).json({ message: "La valeur de is_notified doit être 0 ou 1." });
        }

        const changeUserLikeArticle = await userLikeArticleModel.updateUserLikeArticle(users_Id, article_Id, is_notified);

        if (changeUserLikeArticle === 0) {
            return res.status(404).json(
                { message: "Aucune donnée trouvée pour la mise à jour de l'association utilisateur like article." });
        } else {
            return res.status(200).json(
                { message: "Mise à jour de l'association utilisateur like article réussie. ✅", changeUserLikeArticle });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json(
            { message: "Un problème est survenu lors de la mise à jour de l'association utilisateur like article." });

    }
};

const deleteUserLikeArticle = async (req, res) => {
    try {
        const { users_Id, article_Id } = req.params;
        const suppUserLikeArticle = await userLikeArticleModel.deleteUserLikeArticle(users_Id, article_Id);

        if (suppUserLikeArticle === 0) {
            return res.status(404).json(
                { message: "Aucune donnée trouvée pour la suppression de l'association utilisateur like article." });
        } else {
            return res.status(200).json(
                { message: "Suppression de l'association utilisateur like article réussie. ✅", suppUserLikeArticle });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json(
            { message: "Un problème est survenu lors de la suppression de l'association utilisateur like article." });

    }
};

export default {
    getAllUserLikeArticle,
    getUserLikeArticleById,
    createUserLikeArticle,
    updateUserLikeArticle,
    deleteUserLikeArticle
}