import notificationsModel from "../model/notificationsModel.js";

const getAllNotifications = async (req, res) => {
    try {
        const notifications = await notificationsModel.getAllNotifications();
        return res.status(200).json({ message: "Récupération des notifications réussie. ✅", notifications });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des notifications." });

    }
};

const getNotificationsById = async (req, res) => {
    try {
        const id_Notification = req.params.id_Notification;
        const notificationsId = await notificationsModel.getNotificationsById(id_Notification);

        if (notificationsId) {
            return res.status(200).json({ message: "Récupération des notifications via l'ID réussie. ✅", notificationsId });
        } else {
            return res.status(404).json({ message: "Aucune donnée trouvée." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des notifications via l'ID." });

    }
};

const createNotifications = async (req, res) => {
    try {
        const { users_Id, publication_Id, type, content, related_table } = req.body;

        if (!users_Id || !publication_Id || !type || !content || !related_table) {
            return res.status(400).json(
                { message: "Les champs users_Id, publication_Id, type, content, related_table sont requis." });
        }

        const existingNotifications = await notificationsModel.getNotificationsByAttributes(users_Id, publication_Id, type, content, related_table);

        if (existingNotifications) {
            return res.status(409).json({ message: "La notification existe déjà." });
        }

        const addNotifications = await notificationsModel.createNotifications(users_Id, publication_Id, type, content, related_table);

        if (!addNotifications) {
            return res.status(404).json({ message: "Impossible de créer une notification." });
        } else {
            return res.status(201).json({ message: "Création d'une notification réussie. ✅", addNotifications });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la création de la notification." });

    }
};

const updateNotifications = async (req, res) => {
    try {
        const id_Notification = req.params.id_Notification;
        const { users_Id, publication_Id, type, content, related_table } = req.body;
        const changeNotifications = await notificationsModel.updateNotifications(id_Notification, users_Id, publication_Id, type, content, related_table);

        if (changeNotifications === 0) {
            return res.status(404).json({ message: "Aucune donnée trouvée pour la mise à jour de la notification." });
        } else {
            return res.status(200).json({ message: "Mise à jour de la notification réussie. ✅", changeNotifications });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la mise à jour de la notification." });

    }
};

const deleteNotifications = async (req, res) => {
    try {
        const id_Notification = req.params.id_Notification;
        const suppNotifications = await notificationsModel.deleteNotifications(id_Notification);

        if (suppNotifications === 0) {
            return res.status(404).json({ message: "Aucune donnée trouvée pour la suppression de la notification." });
        } else {
            return res.status(200).json({ message: "Suppression de la notification réussie. ✅", suppNotifications });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la suppression de la notification." });

    }
};

export default {
    getAllNotifications,
    getNotificationsById,
    createNotifications,
    updateNotifications,
    deleteNotifications
}