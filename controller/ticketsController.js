import ticketsModel from '../model/ticketsModel.js';

const getAllTickets = async (req, res) => {
    try {
        const tickets = await ticketsModel.getAllTickets();
        return res.status(200).json({ message: "Récupération des tickets réussie. ✅", tickets });
    } catch (error) {
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des tickets." });
    }
};

const createTicket = async (req, res) => {
    try {
        const { titre, description } = req.body;
        const id_Users = req.id_Users;

        if (!titre || !description) {
            return res.status(400).json({ message: "Le titre et la description sont requis." });
        }

        const existingTickets = await ticketsModel.getTicketsByAttributes(titre, description, id_Users);

        if (existingTickets) {
            return res.status(409).json({ message: "Le ticket existe déjà." });
        }

        const newTicket = await ticketsModel.createTicket(titre, description, id_Users);

        if (!newTicket) {
            return res.status(404).json({ message: "Impossible de créer le ticket." });
        } else {
            return res.status(201).json({ message: "Création du ticket réussie. ✅", newTicket });
        }
    } catch (error) {
        return res.status(500).json({ message: "Impossible de créer le ticket." });
    }
};

const updateStatut = async (req, res) => {
    try {
        const { id_ticket } = req.params;
        const { statut } = req.body;

        const result = await ticketsModel.updateStatut(id_ticket, statut);
        if (result === 0) {
            return res.status(404).json({ message: "Ticket introuvable." });
        }
        return res.status(200).json({ message: "Mise à jour du statut réussie. ✅" });
    } catch (error) {
        return res.status(500).json({ message: "Un problème est survenu lors de la mise à jour du statut." });
    }
};

const deleteTicket = async (req, res) => {
    try {
        const { id_ticket } = req.params;
        const result = await ticketsModel.deleteTicket(id_ticket);
        if (result === 0) {
            return res.status(404).json({ message: "Ticket introuvable." });
        }
        return res.status(200).json({ message: "Suppression du ticket réussie. ✅" });
    } catch (error) {
        return res.status(500).json({ message: "Un problème est survenu lors de la suppression du ticket." });
    }
};

export default {
    getAllTickets,
    createTicket,
    updateStatut,
    deleteTicket
};