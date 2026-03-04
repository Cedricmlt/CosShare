import bdd from "../config/bdd.js";

const getAllMessages = async () => {
    const sql = `SELECT message.id_Message, message.conversation_Id, message.users_Id, message.content, 
    message.cree_le, message.is_read,
    conversation.nom AS conversation_nom, users.prenom, users.nom AS users_nom, users.pseudo FROM message
    INNER JOIN conversation ON message.conversation_Id = conversation.id_Conversation
    INNER JOIN users ON message.users_Id = users.id_Users`;
    const [rows] = await bdd.query(sql);
    return rows;
};

const getMessageById = async (id_Message) => {
    const sql = `SELECT message.id_Message, message.conversation_Id, message.users_Id, message.content,
    message.cree_le, message.is_read,
    conversation.nom AS conversation_nom, users.prenom, users.nom AS users_nom, users.pseudo FROM message
    INNER JOIN conversation ON message.conversation_Id = conversation.id_Conversation
    INNER JOIN users ON message.users_Id = users.id_Users
    WHERE id_Message = ?`;
    const [rows] = await bdd.query(sql, [id_Message]);
    return rows[0];
};

const getMessageByAttributes = async (conversation_Id, users_Id, content) => {
    const sql = `SELECT message.conversation_Id, message.users_id, message.content FROM message
    WHERE message.conversation_Id = ? AND message.users_Id = ? AND message.content = ?`;
    const [rows] = await bdd.query(sql, [conversation_Id, users_Id, content]);
    return rows[0];
};

const createMessage = async (conversation_Id, users_Id, content) => {
    const sql = `INSERT INTO message (conversation_Id, users_id, content) VALUES (?, ?, ?);`;
    const [result] = await bdd.query(sql, [conversation_Id, users_Id, content]);
    return result.affectedRows;
};

const updateMessage = async (id_Message, conversation_Id, users_Id, content) => {
    const sql = `UPDATE message SET conversation_id = ?, users_Id = ?, content = ?
    WHERE id_Message = ?;`;
    const [result] = await bdd.query(sql, [conversation_Id, users_Id, content, id_Message]);
    return result.affectedRows;
};

const deleteMessage = async (id_Message) => {
    const sql = `DELETE FROM message WHERE id_Message = ?;`;
    const [result] = await bdd.query(sql, [id_Message]);
    return result.affectedRows;
};

export default {
    getAllMessages,
    getMessageById,
    getMessageByAttributes,
    createMessage,
    updateMessage,
    deleteMessage
}