import bdd from '../config/bdd.js';

const getAllTickets = async () => {
    const sql = `
    SELECT tickets.id_ticket, tickets.titre, tickets.description, tickets.statut, tickets.date_creation,
           users.nom, users.prenom, users.pseudo FROM tickets
    INNER JOIN users ON tickets.users_Id = users.id_Users
    ORDER BY tickets.date_creation DESC`;
    const [rows] = await bdd.query(sql);
    return rows;
};

const getTicketById = async (id_ticket) => {
    const sql = `
    SELECT tickets.id_ticket, tickets.titre, tickets.description, tickets.statut, tickets.date_creation,
           users.nom, users.prenom, users.pseudo FROM tickets
    INNER JOIN users ON tickets.users_Id = users.id_Users
    WHERE tickets.id_ticket = ?`;
    const [rows] = await bdd.query(sql, [id_ticket]);
    return rows[0];
};

const getTicketsByAttributes = async (titre, description, users_Id) => {
    const sql = `SELECT tickets.titre, tickets.description, tickets.users_Id FROM tickets
    WHERE tickets.titre = ? AND tickets.description = ? AND tickets.users_Id = ?`;
    const [rows] = await bdd.query(sql, [titre, description, users_Id]);
    return rows[0];
};

const createTicket = async (titre, description, users_Id) => {
    const sql = `INSERT INTO tickets (titre, description, users_Id) VALUES (?, ?, ?)`;
    const [result] = await bdd.query(sql, [titre, description, users_Id]);
    return result.insertId;
};

const updateStatut = async (id_ticket, statut) => {
    const sql = `UPDATE tickets SET statut = ? WHERE id_ticket = ?`;
    const [result] = await bdd.query(sql, [statut, id_ticket]);
    return result.affectedRows;
};

const deleteTicket = async (id_ticket) => {
    const sql = `DELETE FROM tickets WHERE id_ticket = ?`;
    const [result] = await bdd.query(sql, [id_ticket]);
    return result.affectedRows;
};

export default {
    getAllTickets,
    getTicketById,
    getTicketsByAttributes,
    createTicket,
    updateStatut,
    deleteTicket
};