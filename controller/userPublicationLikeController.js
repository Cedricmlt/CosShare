import userPublicationLikeModel from "../model/userPublicationLikeModel.js";

const getAllusersPublicationsLikes = async (req, res) => {
    try {
        const usersPublicationsLikes = await userPublicationLikeModel.getAllusersPublicationsLikes();
        return res.status(200).json({ message: "Récupération des likes utilisateurs sur les publications réussie. ✅", usersPublicationsLikes });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupérations des likes utilisateurs." });

    }
};

const getUserPublicationLikeById = async (req, res) => {
    try {
        const { users_Id, publication_Id } = req.params;
        const userPublicationLikeId = await userPublicationLikeModel.getUserPublicationLikeById(users_Id, publication_Id);

        if (userPublicationLikeId) {
            return res.status(200).json({ message: "Récupération des likes utilisateurs via l'ID réussie. ✅", userPublicationLikeId });
        } else {
            return res.status(404).json({ message: "Aucune donnée trouvée." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des likes utilisateurs." });

    }
};

const createUserPublicationLike = async (req, res) => {
    try {
        const { users_Id, publication_Id } = req.body;

        if (!users_Id || !publication_Id) {
            return res.status(400).json({ message: "Les champs users_Id, publication_Id sont requis." });
        }

        const existingUserLike = await userPublicationLikeModel.getUserPublicationLikeByAttributes(users_Id, publication_Id, 0);

        if (existingUserLike) {
            return res.status(409).json({ message: "Le like utilisateur existe déjà." });
        }

        const addUserLike = await userPublicationLikeModel.createUserPublicationLike(users_Id, publication_Id);

        if (!addUserLike) {
            return res.status(404).json({ message: "Impossible de créer le like utilisateur pour la publication." });
        } else {
            return res.status(201).json({ message: "Création du like utilisateur réussie.", addUserLike });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la création du like utilisateur." });

    }
};

const deleteUserPublicationlike = async (req, res) => {
    try {
        const { users_Id, publication_Id } = req.params;
        const suppUserLike = await userPublicationLikeModel.deleteUserPublicationlike(users_Id, publication_Id);

        if (suppUserLike === 0) {
            return res.status(404).json({ message: "Aucune donnée trouvée pour la suppression." });
        } else {
            return res.status(200).json({ message: "Suppression du like utilisateur réussie.", suppUserLike });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la suppression du like utilisateur." });

    }
};

export default {
    getAllusersPublicationsLikes,
    getUserPublicationLikeById,
    createUserPublicationLike,
    deleteUserPublicationlike
}