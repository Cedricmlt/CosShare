import reglagesModel from "../model/reglagesModel.js";

const getAllReglages = async (req, res) => {
    try {
        const reglages = await reglagesModel.getAllReglages();
        return res.status(200).json({ message: "Récupération des réglages réussie. ✅", reglages });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des réglages." });

    }
};

const getReglagesById = async (req, res) => {
    try {
        const id_Reglage = req.params.id_Reglage;
        const reglagesId = await reglagesModel.getReglagesById(id_Reglage);

        if (reglagesId) {
            return res.status(200).json({ message: "Récupération du réglage via son ID réussie. ✅", reglagesId });
        } else {
            return res.status(404).json({ message: "Aucune donnée trouvée." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération du réglage via son ID." });

    }
};

const createReglages = async (req, res) => {
    try {
        const { users_Id, email_notification, push_notification, profile_visibility, theme, langue, auto_play_video } = req.body;

        if (!users_Id || !email_notification || !push_notification || !profile_visibility || !theme || !langue || !auto_play_video) {
            return res.status(400).json(
                { message: "Les champs users_Id, email_notification, push_notification, profile_visibility, theme, langue, auto_play_video sont requis." });
        }

        const existingReglages = await reglagesModel.getReglagesByAttributes(users_Id, email_notification, push_notification, profile_visibility, theme, langue, auto_play_video);

        if (existingReglages) {
            return res.status(409).json({ message: "Le réglage existe déjà." });
        }

        const addReglages = await reglagesModel.createReglages(users_Id, email_notification, push_notification, profile_visibility, theme, langue, auto_play_video);

        if (!addReglages) {
            return res.status(404).json({ message: "Impossible de créer un réglage." });
        } else {
            return res.status(201).json({ message: "Création du réglage réussie. ✅", addReglages });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la création du réglage." });

    }
};

const updateReglages = async (req, res) => {
    try {
        const id_Reglage = req.params.id_Reglage;
        const { users_Id, email_notification, push_notification, profile_visibility, theme, langue, auto_play_video } = req.body;
        const changeReglages = await reglagesModel.updateReglages(id_Reglage, users_Id, email_notification, push_notification, profile_visibility, theme, langue, auto_play_video);

        if (changeReglages === 0) {
            return res.status(404).json({ message: "Aucune donnée trouvée pour la mise à jour du réglage." });
        } else {
            return res.status(200).json({ message: "Mise à jour du réglage réussie. ✅", changeReglages });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la mise à jour du réglage." });

    }
};

const deleteReglages = async (req, res) => {
    try {
        const id_Reglage = req.params.id_Reglage;
        const suppReglages = await reglagesModel.deleteReglages(id_Reglage);

        if (suppReglages === 0) {
            return res.status(404).json({ message: "Aucune donnée trouvée pour la suppression du réglage." });
        } else {
            return res.status(200).json({ message: "Suppression du réglage réussie. ✅", suppReglages });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la suppression du réglage." });

    }
};

export default {
    getAllReglages,
    getReglagesById,
    createReglages,
    updateReglages,
    deleteReglages
}