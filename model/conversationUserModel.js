import bdd from "../config/bdd.js";

const getAllConversationUser = async () => {
    const sql = `SELECT conversation_user.conversation_Id, conversation_user.users_Id FROM conversation_user
    INNER JOIN conversation ON conversation_user.conversation_Id = conversation.id_Conversation
    INNER JOIN users ON conversation_user.users_Id = users.id_Users`;
    const [rows] = await bdd.query(sql);
    return rows;
};

const getConversationUserById = async (conversation_Id, users_Id) => {
    const sql = `SELECT conversation_user.conversation_Id, conversation_user.users_Id FROM conversation_user
    INNER JOIN conversation ON conversation_user.conversation_Id = conversation.id_Conversation
    INNER JOIN users ON conversation_user.users_Id = users.id_Users
    WHERE conversation_Id = ? AND users_Id = ?`;
    const [rows] = await bdd.query(sql, [conversation_Id, users_Id]);
    return rows[0];
};

const getConversationUserByAttributes = async (conversation_Id, users_Id) => {
    const sql = `SELECT conversation_Id, users_Id FROM conversation_user
    WHERE conversation_Id = ? AND users_Id = ?`;
    const [rows] = await bdd.query(sql, [conversation_Id, users_Id]);
    return rows[0];
};

const createConversationUser = async (conversation_Id, users_Id) => {
    const sql = `INSERT INTO conversation_user (conversation_Id, users_Id) VALUES (?, ?);`;
    const [result] = await bdd.query(sql, [conversation_Id, users_Id]);
    return result.affectedRows;
};

const updateConversationUser = async (old_conversation_Id, old_users_Id, conversation_Id, users_Id) => {
    const sql = `UPDATE conversation_user SET conversation_Id = ?, users_Id = ?
    WHERE conversation_Id = ? AND users_Id = ?;`;
    const [result] = await bdd.query(sql, [conversation_Id, users_Id, old_conversation_Id, old_users_Id]);
    return result.affectedRows;
};

const deleteConversationUser = async (conversation_Id, users_Id) => {
    const sql = `DELETE FROM conversation_user 
    WHERE conversation_Id = ? AND users_Id = ?;`;
    const [result] = await bdd.query(sql, [conversation_Id, users_Id]);
    return result.affectedRows;
};

export default {
    getAllConversationUser,
    getConversationUserById,
    getConversationUserByAttributes,
    createConversationUser,
    updateConversationUser,
    deleteConversationUser
}