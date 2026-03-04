import eventParticipantsModel from "../model/eventParticipantsModel.js";

const getAllEventParticipants = async (req, res) => {
    try {
        const eventParticipants = await eventParticipantsModel.getAllEventParticipants();
        return res.status(200).json({ message: "Récupération des associations EP réussie. ✅", eventParticipants });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des associations EP." });

    }
};

const getEventParticipantsById = async (req, res) => {
    try {
        const { conv_event_Id, users_Id } = req.params;
        const eventParticipantsId = await eventParticipantsModel.getEventParticipantsById(conv_event_Id, users_Id);

        if (eventParticipantsId) {
            return res.status(200).json({ message: "Récupération des associations EP via l'ID réussie. ✅", eventParticipantsId });
        } else {
            return res.status(404).json({ message: "Aucun donnée trouvée." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des associations EP." });

    }
};

const createEventParticipants = async (req, res) => {
    try {
        const { conv_event_Id, users_Id } = req.body;

        if (!conv_event_Id || !users_Id) {
            return res.status(400).json({ message: "Les champs conv_event_Id, users_Id sont requis." });
        }

        const existingEventParticipants = await eventParticipantsModel.getEventParticipantsByAttributes(conv_event_Id, users_Id);

        if (existingEventParticipants) {
            return res.status(409).json({ message: "L'association EP existe déjà." });
        }

        const addEventParticipants = await eventParticipantsModel.createEventParticipants(conv_event_Id, users_Id);

        if (!addEventParticipants) {
            return res.status(404).json({ message: "Impossible de créer l'association EP." });
        } else {
            return res.status(201).json({ message: "Création de l'association EP réussie. ✅", addEventParticipants });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la création de l'association EP." });

    }
};

const updateEventParticipants = async (req, res) => {
    try {
        const { conv_event_Id, users_Id } = req.params;
        const changeEventParticipants = await eventParticipantsModel.updateEventParticipants(conv_event_Id, users_Id);

        if (changeEventParticipants === 0) {
            return res.status(404).json({ message: "Aucune donnée trouvée pour la mise à jour de l'association EP." });
        } else {
            return res.status(200).json({ message: "Mise à jour de l'association EP réussie. ✅", changeEventParticipants });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la mise à jour de l'association EP." });

    }
};

const deleteEventParticipants = async (req, res) => {
    try {
        const { conv_event_Id, users_Id } = req.params;
        const suppEventParticipants = await eventParticipantsModel.deleteEventParticipants(conv_event_Id, users_Id);

        if (suppEventParticipants === 0) {
            return res.status(404).json({ message: "Aucune donnée trouvée pour la suppression de l'association EP." });
        } else {
            return res.status(200).json({ message: "Suppression de l'association EP réussie. ✅", suppEventParticipants });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la suppression de l'association EP." });

    }
};

export default {
    getAllEventParticipants,
    getEventParticipantsById,
    createEventParticipants,
    updateEventParticipants,
    deleteEventParticipants
}