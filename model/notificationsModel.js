import bdd from "../config/bdd.js";

const getAllNotifications = async () => {
    const sql = `SELECT notifications.id_Notification, notifications.users_Id, notifications.publication_Id,
    notifications.type, notifications.content, notifications.is_read, notifications.cree_le, notifications.related_table,
    users.prenom, users.nom, users.pseudo,
    publication.description FROM notifications
    INNER JOIN users ON notifications.users_Id = users.id_Users
    INNER JOIN publication ON notifications.publication_Id = publication.id_Publication`;
    const [rows] = await bdd.query(sql);
    return rows;
};

const getNotificationsById = async (id_Notification) => {
    const sql = `SELECT notifications.id_Notification, notifications.users_Id, notifications.publication_Id,
    notifications.type, notifications.content, notifications.is_read, notifications.cree_le, notifications.related_table,
    users.prenom, users.nom, users.pseudo,
    publication.description FROM notifications
    INNER JOIN users ON notifications.users_Id = users.id_Users
    INNER JOIN publication ON notifications.publication_Id = publication.id_Publication
    WHERE notifications.id_Notification = ?`;
    const [rows] = await bdd.query(sql, [id_Notification]);
    return rows[0];
};

const getNotificationsByAttributes = async (users_Id, publication_Id, type, content, related_table) => {
    const sql = `SELECT notifications.users_Id, notifications.publication_Id, notifications.type, 
    notifications.content, notifications.related_table FROM notifications
    WHERE notifications.users_Id = ? AND notifications.publication_Id = ? AND notifications.type = ? 
    AND notifications.content = ? AND notifications.related_table = ?`;
    const [rows] = await bdd.query(sql, [users_Id, publication_Id, type, content, related_table]);
    return rows[0];
};

const createNotifications = async (users_Id, publication_Id, type, content, related_table) => {
    const sql = `INSERT INTO notifications (users_Id, publication_Id, type, content, related_table) VALUES (?, ?, ?, ?, ?);`;
    const [result] = await bdd.query(sql, [users_Id, publication_Id, type, content, related_table]);
    return result.affectedRows;
};

const updateNotifications = async (id_Notification, users_Id, publication_Id, type, content, related_table) => {
    const sql = `UPDATE notifications SET notifications.users_Id = ?, notifications.publication_Id = ?, 
    notifications.type = ?, notifications.content = ?, notifications.related_table = ?
    WHERE notifications.id_Notification = ?;`;
    const [result] = await bdd.query(sql, [users_Id, publication_Id, type, content, related_table, id_Notification]);
    return result.affectedRows;
};

const deleteNotifications = async (id_Notification) => {
    const sql = `DELETE FROM notifications WHERE notifications.id_Notification = ?;`;
    const [result] = await bdd.query(sql, [id_Notification]);
    return result.affectedRows;
};

export default {
    getAllNotifications,
    getNotificationsById,
    getNotificationsByAttributes,
    createNotifications,
    updateNotifications,
    deleteNotifications
}