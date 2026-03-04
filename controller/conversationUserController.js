import conversationUserModel from "../model/conversationUserModel.js";

const getAllConversationUser = async (req, res) => {
    try {
        const conversationUser = await conversationUserModel.getAllConversationUser();
        return res.status(200).json({ message: "Récupération des associations convUser réussie. ✅", conversationUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des associations convUser." });

    }
};

const getConversationUserById = async (req, res) => {
    try {
        const { conversation_Id, users_Id } = req.params;
        const conversationUserId = await conversationUserModel.getConversationUserById(conversation_Id, users_Id);

        if (conversationUserId) {
            return res.status(200).json({ message: "Récupération de l'association convUser via l'ID réussie. ✅", conversationUserId });
        } else {
            return res.status(404).json({ message: "Aucune donnée trouvée." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu pour la récupération des associations convUser via l'ID" });

    }
};

const createConversationUser = async (req, res) => {
    try {
        const { conversation_Id, users_Id } = req.body;

        if (!conversation_Id || !users_Id) {
            return res.status(400).json({ message: "Les champs conversation_Id, users_Id sont requis." });
        }

        const existingConversationUser = await conversationUserModel.getConversationUserByAttributes(conversation_Id, users_Id);

        if (existingConversationUser) {
            return res.status(409).json({ message: "L'association convUser existe déjà." });
        }

        const addConversationUser = await conversationUserModel.createConversationUser(conversation_Id, users_Id);

        if (!addConversationUser) {
            return res.status(404).json({ message: "Impossible de créer l'association convUser." });
        } else {
            return res.status(201).json({ message: "Création de l'association convUser réussie. ✅", addConversationUser });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la création de l'association convUser." });

    }
};

const updateConversationUser = async (req, res) => {
    try {
        const { old_conversation_Id, old_users_Id } = req.params;
        const { conversation_Id, users_Id } = req.body;
        const changeConversationUser = await conversationUserModel.updateConversationUser(old_conversation_Id, old_users_Id, conversation_Id, users_Id);

        if (changeConversationUser === 0) {
            return res.status(404).json({ message: "Aucune donnée trouvée pour la mise à jour de l'association convUser." });
        } else {
            return res.status(200).json({ message: "Mise à jour de l'association convUser réussie. ✅", changeConversationUser });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la mise à jour de l'association convUser." });

    }
};

const deleteConversationUser = async (req, res) => {
    try {
        const { conversation_Id, users_Id } = req.params;
        const suppConversationUser = await conversationUserModel.deleteConversationUser(conversation_Id, users_Id);

        if (suppConversationUser === 0) {
            return res.status(404).json({ message: "Aucune donnée trouvée pour la suppression de l'association convUser." });
        } else {
            return res.status(200).json({ message: "Suppression de l'association convUser réussie. ✅", suppConversationUser });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la suppression de l'association convUser." });

    }
};

export default {
    getAllConversationUser,
    getConversationUserById,
    createConversationUser,
    updateConversationUser,
    deleteConversationUser
}