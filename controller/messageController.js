import messageModel from "../model/messageModel.js";

const getAllMessages = async (req, res) => {
    try {
        const messages = await messageModel.getAllMessages();
        return res.status(200).json({ message: "Récupération des messages réussie. ✅", messages });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des messages." });

    }
};

const getMessageById = async (req, res) => {
    try {
        const id_Message = req.params.id_Message;
        const messageId = await messageModel.getMessageById(id_Message);

        if (messageId) {
            return res.status(200).json({ message: "Récupération du message via son ID réussie. ✅", messageId });
        } else {
            return res.status(404).json({ message: "Aucune donnée trouvée." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération du message via son ID." });

    }
};

const createMessage = async (req, res) => {
    try {
        const { conversation_Id, users_Id, content } = req.body;

        if (!conversation_Id || !users_Id || !content) {
            return res.status(400).json({ message: "Les champs conversation_Id, users_Id, content sont requis." });
        }

        const existingMessage = await messageModel.getMessageByAttributes(conversation_Id, users_Id, content);

        if (existingMessage) {
            return res.status(409).json({ message: "Le message existe déjà." });
        }

        const addMessage = await messageModel.createMessage(conversation_Id, users_Id, content);

        if (!addMessage) {
            return res.status(404).json({ message: "Impossible de créer le message." });
        } else {
            return res.status(201).json({ message: "Création du message réussie. ✅", addMessage });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la création du message." });

    }
};

const updateMessage = async (req, res) => {
    try {
        const id_Message = req.params.id_Message;
        const { conversation_Id, users_Id, content } = req.body;
        const changeMessage = await messageModel.updateMessage(id_Message, conversation_Id, users_Id, content);

        if (changeMessage === 0) {
            return res.status(404).json({ message: "Aucune donnée trouvée pour la mise à jour du message." });
        } else {
            return res.status(200).json({ message: "Mise à jour du message réussie. ✅", changeMessage });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la mise à jour du message." });

    }
};

const deleteMessage = async (req, res) => {
    try {
        const id_Message = req.params.id_Message;
        const suppMessage = await messageModel.deleteMessage(id_Message);

        if (suppMessage === 0) {
            return res.status(404).json({ message: "Aucune donnée trouvée pour la suppression du message." });
        } else {
            return res.status(200).json({ message: "Suppression du message réussie. ✅", suppMessage });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la suppression du message." });

    }
};

export default {
    getAllMessages,
    getMessageById,
    createMessage,
    updateMessage,
    deleteMessage
}