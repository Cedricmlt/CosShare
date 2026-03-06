import bdd from "../config/bdd.js";

const getAllReglages = async () => {
    const sql = `SELECT reglages.id_Reglage, reglages.users_Id, reglages.email_notification, reglages.push_notification,
    reglages.profile_visibility, reglages.theme, reglages.langue, reglages.auto_play_video,
    users.prenom, users.nom, users.pseudo FROM reglages
    INNER JOIN users ON reglages.users_Id = users.id_Users`;
    const [rows] = await bdd.query(sql);
    return rows;
};

const getReglagesById = async (id_Reglage) => {
    const sql = `SELECT reglages.id_Reglage, reglages.users_Id, reglages.email_notification, reglages.push_notification,
    reglages.profile_visibility, reglages.theme, reglages.langue, reglages.auto_play_video,
    users.prenom, users.nom, users.pseudo FROM reglages
    INNER JOIN users ON reglages.users_Id = users.id_Users
    WHERE reglages.id_Reglage = ?`;
    const [rows] = await bdd.query(sql, [id_Reglage]);
    return rows[0];
};

const getReglagesByAttributes = async (users_Id, email_notification, push_notification, profile_visibility, theme, langue, auto_play_video) => {
    const sql = `SELECT reglages.users_Id, reglages.email_notification, reglages.push_notification, reglages.profile_visibility,
    reglages.theme, reglages.langue, reglages.auto_play_video FROM reglages
    WHERE reglages.users_Id = ? AND reglages.email_notification = ? AND reglages.push_notification = ? 
    AND reglages.profile_visibility = ? AND reglages.theme = ? AND reglages.langue = ? AND reglages.auto_play_video = ?`;
    const [rows] = await bdd.query(sql, [users_Id, email_notification, push_notification, profile_visibility, theme, langue, auto_play_video]);
    return rows[0];
};

const createReglages = async (users_Id, email_notification, push_notification, profile_visibility, theme, langue, auto_play_video) => {
    const sql = `INSERT INTO reglages 
    (users_Id, email_notification, push_notification, profile_visibility, theme, langue, auto_play_video) 
    VALUES (?, ?, ?, ?, ?, ?, ?);`;
    const [result] = await bdd.query(sql, [users_Id, email_notification, push_notification, profile_visibility, theme, langue, auto_play_video]);
    return result.affectedRows;
};

const updateReglages = async (id_Reglage, users_Id, email_notification, push_notification, profile_visibility, theme, langue, auto_play_video) => {
    const sql = `UPDATE reglages SET reglages.users_Id = ?, reglages.email_notification = ?, reglages.push_notification = ?,
    reglages.profile_visibility = ?, reglages.theme = ?, reglages.langue = ?, reglages.auto_play_video = ?
    WHERE reglages.id_Reglage = ?;`;
    const [result] = await bdd.query(sql, [users_Id, email_notification, push_notification, profile_visibility, theme, langue, auto_play_video, id_Reglage]);
    return result.affectedRows;
};

const deleteReglages = async (id_Reglage) => {
    const sql = `DELETE FROM reglages WHERE reglages.id_Reglage = ?;`;
    const [result] = await bdd.query(sql, [id_Reglage]);
    return result.affectedRows;
};

export default {
    getAllReglages,
    getReglagesById,
    getReglagesByAttributes,
    createReglages,
    updateReglages,
    deleteReglages
}