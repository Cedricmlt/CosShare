import eventsModel from "../model/eventsModel.js";

const getAllEvents = async (req, res) => {
    try {
        const events = await eventsModel.getAllEvents();
        return res.status(200).json({ message: "Récupération des événements réussie. ✅", events });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des événements." });

    }
};

const getEventById = async (req, res) => {
    try {
        const id_Event = req.params.id_Event;
        const eventId = await eventsModel.getEventsById(id_Event);

        if (eventId) {
            return res.status(200).json({ message: "Récupération de l'événement via son ID réussie. ✅", eventId });
        } else {
            return res.status(404).json({ message: "Aucune donnée trouvée." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération de l'événement via son ID." });

    }
};

const createEvent = async (req, res) => {
    try {
        const { nom, localisation, description } = req.body;

        if (!nom || !localisation || !description) {
            return res.status(400).json({ message: "Les champs nom, localisation, description sont requis." });
        }

        const existingEvent = await eventsModel.getEventsByAttributes(nom, localisation, description);

        if (existingEvent) {
            return res.status(409).json({ message: "L'événement existe déjà." });
        }

        const addEvent = await eventsModel.createEvents(nom, localisation, description);

        if (!addEvent) {
            return res.status(404).json({ message: "Impossible de créer un événement." });
        } else {
            return res.status(201).json({ message: "Création de l'événement réussie. ✅", addEvent });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la création de l'événement." });

    }
};

const updateEvent = async (req, res) => {
    try {
        const id_Event = req.params.id_Event;
        const { nom, localisation, description } = req.body;
        const changeEvent = await eventsModel.updateEvents(id_Event, nom, localisation, description);

        if (changeEvent === 0) {
            return res.status(404).json({ message: "Aucune donnée trouvée pour la mise à jour de l'événement." });
        } else {
            return res.status(200).json({ message: "Mise à jour de l'événement réussie. ✅", changeEvent });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la mise à jour de l'événement." });

    }
};

const deleteEvent = async (req, res) => {
    try {
        const id_Event = req.params.id_Event;
        const suppEvent = await eventsModel.deleteEvents(id_Event);

        if (suppEvent === 0) {
            return res.status(404).json({ message: "Aucune donnée trouvée pour la suppression de l'événement." });
        } else {
            return res.status(200).json({ message: "Suppression de l'événement réussie. ✅", suppEvent });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la suppression de l'événement." });

    }
};

export default {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
}