import followModel from "../model/followModel.js";

const getAllFollow = async (req, res) => {
    try {
        const follow = await followModel.getAllFollow();
        return res.status(200).json({ message: "Récupération des abonnements utilisateurs réussie ✅", follow });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des abonnements utilisateurs." });

    }
};

const getFollowById = async (req, res) => {
    try {
        const { id_Follower, id_Followed } = req.params;
        const followId = await followModel.getFollowById(id_Follower, id_Followed);

        if (followId) {
            return res.status(200).json({ message: "Récupération des abonnements utilisateurs via l'ID réussie. ✅", followId });
        } else {
            return res.status(404).json({ message: "Aucune donnée trouvée." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des abonnements utilisateurs." });

    }
};

const createFollow = async (req, res) => {
    try {
        const { id_Follower, id_Followed } = req.body;

        if (!id_Follower || !id_Followed) {
            return res.status(400).json({ message: "Les champs id_Follower, id_Followed sont requis." });
        }

        const existingFollow = await followModel.getFollowByAttributes(id_Follower, id_Followed);

        if (existingFollow) {
            return res.status(409).json({ message: "L'abonnement utilisateur existe déjà." });
        }

        const addFollow = await followModel.createFollow(id_Follower, id_Followed);

        if (!addFollow) {
            return res.status(404).json({ message: "Impossible de créer un abonnement utilisateur." });
        } else {
            return res.status(201).json({ message: "Création de l'abonnement utilisateur réussie. ✅", addFollow });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la création de l'abonnement utilisateur." });

    }
};

const updateFollow = async (req, res) => {
    try {
        const { id_Follower, id_Followed } = req.params;
        const { statut } = req.body;

        if (!statut) {
            return res.status(400).json({ message: "Le champs statut est requis." });
        }

        const validStatus = ['En attente', 'Acceptée', 'Refusée'];
        if (!validStatus.includes(statut)) {
            return res.status(400).json({ message: "Le statut doit être 'En attente', 'Acceptée' ou 'Refusée'." });
        }

        const changeFollow = await followModel.updateFollow(id_Follower, id_Followed, statut);

        if (changeFollow === 0) {
            return res.status(404).json(
                { message: "Aucune donnée trouvée pour la mise à jour du statut de l'abonnement utilisateur." });
        } else {
            return res.status(200).json(
                { message: "Mise à jour du statut de l'abonnement utilisateur réussie. ✅", changeFollow });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json(
            { message: "Un problème est survenu lors de la mise à jour de l'abonnement utilisateur." });

    }
};

const deleteFollow = async (req, res) => {
    try {
        const { id_Follower, id_Followed } = req.params;
        const suppFollow = await followModel.deleteFollow(id_Follower, id_Followed);

        if (suppFollow === 0) {
            return res.status(404).json({ message: "Aucune donnée trouvée pour la suppression de l'abonnement utilisateur." });
        } else {
            return res.status(200).json({ message: "Suppression de l'abonnement utilisateur réussie. ✅", suppFollow });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la suppression de l'abonnement utilisateur." });

    }
};

export default {
    getAllFollow,
    getFollowById,
    createFollow,
    updateFollow,
    deleteFollow
}