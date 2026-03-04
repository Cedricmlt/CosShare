import bdd from "../config/bdd.js";

const getAllEventParticipants = async () => {
    const sql = `SELECT event_participants.conv_event_Id, event_participants.users_Id, 
    event_participants.registered_at, event_participants.is_present,
    users.prenom, users.nom, users.pseudo,
    events.nom, events.date, events.localisation, events.description FROM event_participants
    INNER JOIN users ON event_participants.users_Id = users.id_Users
    INNER JOIN events ON event_participants.conv_event_Id = events.id_Event`;
    const [rows] = await bdd.query(sql);
    return rows;
};

const getEventParticipantsById = async (conv_event_Id, users_Id) => {
    const sql = `SELECT event_participants.conv_event_Id, event_participants.users_Id, 
    event_participants.registered_at, event_participants.is_present,
    users.prenom, users.nom, users.pseudo,
    events.nom, events.date, events.localisation, events.description FROM event_participants
    INNER JOIN users ON event_participants.users_Id = users.id_Users
    INNER JOIN events ON event_participants.conv_event_Id = events.id_Event
    WHERE conv_event_Id = ?`;
    const [rows] = await bdd.query(sql, [conv_event_Id, users_Id]);
    return rows[0];
};

const getEventParticipantsByAttributes = async (conv_event_Id, users_Id) => {
    const sql = `SELECT conv_event_Id, users_Id FROM event_participants
    WHERE conv_event_Id = ? AND users_Id = ?`;
    const [rows] = await bdd.query(sql, [conv_event_Id, users_Id]);
    return rows[0];
};

const createEventParticipants = async (conv_event_Id, users_Id) => {
    const sql = `INSERT INTO event_participants (conv_event_Id, users_Id) VALUES (?, ?);`;
    const [result] = await bdd.query(sql, [conv_event_Id, users_Id]);
    return result.affectedRows;
};

const updateEventParticipants = async (conv_event_Id, users_Id) => {
    const sql = `UPDATE event_participants SET event_participants.conv_event_Id = ?
    WHERE event_participants.users_Id = ?;`;
    const [result] = await bdd.query(sql, [conv_event_Id, users_Id]);
    return result.affectedRows;
};

const deleteEventParticipants = async (conv_event_Id, users_Id) => {
    const sql = `DELETE FROM event_participants WHERE conv_event_Id = ? AND users_Id = ?;`;
    const [result] = await bdd.query(sql, [conv_event_Id, users_Id]);
    return result.affectedRows;
};

export default {
    getAllEventParticipants,
    getEventParticipantsById,
    getEventParticipantsByAttributes,
    createEventParticipants,
    updateEventParticipants,
    deleteEventParticipants
}