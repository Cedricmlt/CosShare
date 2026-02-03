import userPublicationCommentModel from "../model/userPublicationComment.Model.js";

const getAllUsersPublicationsComment = async (req, res) => {
    try {
        const usersPublicationsComment = await userPublicationCommentModel.getAllUsersPublicationsComment();
        return res.status(200).json({ message: "Récupération des commentaires utilisateurs réussie. ✅", usersPublicationsComment });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des commentaires utilisateurs." });

    }
};

const getUserPublicationCommentById = async (req, res) => {
    try {
        const { users_Id, publication_Id } = req.params;
        const userCommentId = await userPublicationCommentModel.getUserPublicationCommentById(users_Id, publication_Id);

        if (userCommentId) {
            return res.status(200).json({ message: "Récupération des commentaires utilisateurs via l'ID réussie. ✅", userCommentId });
        } else {
            return res.status(404).json({ message: "Aucun commentaire trouvé." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des commentaires utilisateurs via l'ID." });

    }
};

const createUserPublicationComment = async (req, res) => {
    try {
        const { users_Id, publication_Id, commentaire } = req.body;

        if (!users_Id || !publication_Id || !commentaire) {
            return res.status(400).json({ message: "Les champs users_Id, publication_Id, commentaire sont requis." });
        }

        const existingUserComment = await userPublicationCommentModel.getUserPublicationCommentByAttributes(users_Id, publication_Id, commentaire);

        if (existingUserComment) {
            return res.status(409).json({ message: "Le commentaire utilisateur existe déjà." });
        }

        const addUserComment = await userPublicationCommentModel.createUserPublicationComment(users_Id, publication_Id, commentaire);

        if (!addUserComment) {
            return res.status(404).json({ message: "Impossible de créer le commentaire utilisateur." });
        } else {
            return res.status(201).json({ message: "Création du commentaire utilisateur sur la publication réussie. ✅", addUserComment });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la création du commentaire utilisateur." });

    }
};

const updateUserPublicationComment = async (req, res) => {
    try {
        const { users_Id, publication_Id } = req.params;
        const { commentaire } = req.body;

        const changeUserComment = await userPublicationCommentModel.updateUserPublicationComment(users_Id, publication_Id, commentaire);

        if (changeUserComment === 0) {
            return res.status(404).json({ message: "Aucun commentaire trouvé pour la mise à jour." });
        } else {
            return res.status(200).json({ message: "Mise à jour du commentaire utilisateur réussie. ✅", changeUserComment });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la mise à jour du commentaire utilisateur." });

    }
};

const deleteUserPublicationComment = async (req, res) => {
    try {
        const { users_Id, publication_Id } = req.params;
        const suppUserComment = await userPublicationCommentModel.deleteUserPublicationComment(users_Id, publication_Id);

        if (suppUserComment === 0) {
            return res.status(404).json({ message: "Aucun commentaire trouvé pour la suppression." });
        } else {
            return res.status(200).json({ message: "Suppression du commentaire utilisateur réussie. ✅", suppUserComment });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la suppression du commentaire utilisateur." });

    }
};

export default {
    getAllUsersPublicationsComment,
    getUserPublicationCommentById,
    createUserPublicationComment,
    updateUserPublicationComment,
    deleteUserPublicationComment
}

