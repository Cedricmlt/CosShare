import bdd from "../config/bdd.js";

const getAllEvents = async () => {
    const sql = `SELECT id_Event, nom, date, localisation, description, cree_le, mise_a_jour, is_convention FROM events`;
    const [rows] = await bdd.query(sql);
    return rows;
};

const getEventsById = async (id_Event) => {
    const sql = `SELECT id_Event, nom, date, localisation, description, cree_le, mise_a_jour, is_convention FROM events
    WHERE id_Event = ?`;
    const [rows] = await bdd.query(sql, [id_Event]);
    return rows[0];
};

const getEventsByAttributes = async (nom, localisation, description) => {
    const sql = `SELECT nom, localisation, description FROM events
    WHERE nom = ? AND localisation = ? AND description = ?`;
    const [rows] = await bdd.query(sql, [nom, localisation, description]);
    return rows[0];
};

const createEvents = async (nom, localisation, description) => {
    const sql = `INSERT INTO events (nom, localisation, description) VALUES (?, ?, ?);`;
    const [result] = await bdd.query(sql, [nom, localisation, description]);
    return result.insertId;
};

const updateEvents = async (id_Event, nom, localisation, description) => {
    const sql = `UPDATE events SET nom = ?, localisation = ?, description = ?
    WHERE id_Event = ?;`;
    const [result] = await bdd.query(sql, [nom, localisation, description, id_Event]);
    return result.affectedRows;
};

const deleteEvents = async (id_Event) => {
    const sql = `DELETE FROM events WHERE id_Event = ?;`;
    const [result] = await bdd.query(sql, [id_Event]);
    return result.affectedRows;
};

export default {
    getAllEvents,
    getEventsById,
    getEventsByAttributes,
    createEvents,
    updateEvents,
    deleteEvents
}