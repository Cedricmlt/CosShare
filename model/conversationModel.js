import bdd from "../config/bdd.js";

const getAllConversations = async () => {
    const sql = `SELECT id_Conversation, cree_le, is_group, last_message_at, nom FROM conversation`;
    const [rows] = await bdd.query(sql);
    return rows;
};

const getConversationById = async (id_Conversation) => {
    const sql = `SELECT id_Conversation, cree_le, is_group, last_message_at, nom FROM conversation
    WHERE id_Conversation = ?`;
    const [rows] = await bdd.query(sql, [id_Conversation]);
    return rows[0];
};

const getConversationByAttributes = async (nom) => {
    const sql = `SELECT nom FROM conversation 
    WHERE id_Conversation = ?`;
    const [rows] = await bdd.query(sql, [nom]);
    return rows[0];
};

const createConversation = async (nom) => {
    const sql = `INSERT INTO conversation (nom) VALUES (?);`;
    const [result] = await bdd.query(sql, [nom]);
    return result.affectedRows;
};

const updateConversation = async (id_Conversation, nom) => {
    const sql = `UPDATE conversation SET nom = ? 
    WHERE id_Conversation = ?;`;
    const [result] = await bdd.query(sql, [nom, id_Conversation]);
    return result.affectedRows;
};

const deleteConversation = async (id_Conversation) => {
    const sql = `DELETE FROM conversation WHERE id_Conversation = ?;`;
    const [result] = await bdd.query(sql, [id_Conversation]);
    return result.affectedRows;
};

export default {
    getAllConversations,
    getConversationById,
    getConversationByAttributes,
    createConversation,
    updateConversation,
    deleteConversation
}