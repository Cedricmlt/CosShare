import conversationModel from "../model/conversationModel.js";

const getAllConversations = async (req, res) => {
    try {
        const conversations = await conversationModel.getAllConversations();
        return res.status(200).json({ message: "Récupération des conversations réussie. ✅", conversations });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des conversations." });

    }
};

const getConversationById = async (req, res) => {
    try {
        const id_Conversation = req.params.id_Conversation;
        const conversationId = await conversationModel.getConversationById(id_Conversation);

        if (conversationId) {
            return res.status(200).json({ message: "Récupération de la conversation via son ID réussie. ✅", conversationId });
        } else {
            return res.status(404).json({ message: "Aucune donnée trouvée." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération de la conversation via son ID." });

    }
};

const createConversation = async (req, res) => {
    try {
        const { nom } = req.body;

        if (!nom) {
            return res.status(400).json({ message: "Le champs nom est requis." });
        }

        const existingConversation = await conversationModel.getConversationByAttributes(nom);

        if (existingConversation) {
            return res.status(409).json({ message: "La conversation existe déjà." });
        }

        const addConversation = await conversationModel.createConversation(nom);

        if (!addConversation) {
            return res.status(404).json({ message: "Impossible de créer la conversation." });
        } else {
            return res.status(201).json({ message: "Création de la conversation réussie. ✅", addConversation });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la création de la conversation." });

    }
};

const updateConversation = async (req, res) => {
    try {
        const id_Conversation = req.params.id_Conversation;
        const { nom } = req.body;
        const changeConversation = await conversationModel.updateConversation(id_Conversation, nom);

        if (changeConversation === 0) {
            return res.status(404).json({ message: "Aucune donnée trouvée pour la mise à jour de la conversation." });
        } else {
            return res.status(200).json({ message: "Mise à jour de la conversation réussie. ✅", changeConversation });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la mise à jour de la conversation." });

    }
};

const deleteConversation = async (req, res) => {
    try {
        const id_Conversation = req.params.id_Conversation;
        const suppConversation = await conversationModel.deleteConversation(id_Conversation);

        if (suppConversation === 0) {
            return res.status(404).json({ message: "Aucune donnée trouvée pour la suppression de la conversation." });
        } else {
            return res.status(200).json({ message: "Suppression de la conversation réussie. ✅", suppConversation });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la suppression de la conversation." });

    }
};

export default {
    getAllConversations,
    getConversationById,
    createConversation,
    updateConversation,
    deleteConversation
}