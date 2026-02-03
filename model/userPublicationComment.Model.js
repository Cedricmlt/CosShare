import bdd from "../config/bdd.js";

const getAllUsersPublicationsComment = async () => {
    const sql = `SELECT user_publication_comment.users_Id, user_publication_comment.publication_Id, 
    user_publication_comment.commentaire, user_publication_comment.is_notified,
    users.prenom, users.nom, users.pseudo,
    publication.description, publication.cree_le, publication.mise_a_jour
    FROM user_publication_comment
    INNER JOIN users ON user_publication_comment.users_Id = users.id_Users
    INNER JOIN publication ON user_publication_comment.publication_Id = publication.id_Publication;`;
    const [rows] = await bdd.query(sql);
    return rows;
};

const getUserPublicationCommentById = async (users_Id, publication_Id) => {
    const sql = `SELECT user_publication_comment.users_Id, user_publication_comment.publication_Id, 
    user_publication_comment.commentaire, user_publication_comment.is_notified,
    users.prenom, users.nom, users.pseudo,
    publication.description, publication.cree_le, publication.mise_a_jour
    FROM user_publication_comment
    INNER JOIN users ON user_publication_comment.users_Id = users.id_Users
    INNER JOIN publication ON user_publication_comment.publication_Id = publication.id_Publication
    WHERE user_publication_comment.users_Id = ? AND user_publication_comment.publication_Id = ?`;
    const [rows] = await bdd.query(sql, [users_Id, publication_Id]);
    return rows[0];
};

const getUserPublicationCommentByAttributes = async (users_Id, publication_Id, commentaire) => {
    const sql = `SELECT user_publication_comment.users_Id, user_publication_comment.publication_Id, 
    user_publication_comment.commentaire,
    users.prenom, users.nom, users.pseudo,
    publication.description, publication.cree_le, publication.mise_a_jour
    FROM user_publication_comment
    INNER JOIN users ON user_publication_comment.users_Id = users.id_Users
    INNER JOIN publication ON user_publication_comment.publication_Id = publication.id_Publication
    WHERE user_publication_comment.users_Id = ? AND user_publication_comment.publication_Id = ? AND commentaire = ?`;
    const [rows] = await bdd.query(sql, [users_Id, publication_Id, commentaire]);
    return rows[0];
};

const createUserPublicationComment = async (users_Id, publication_Id, commentaire) => {
    const sql = `INSERT INTO user_publication_comment (users_Id, publication_Id, commentaire) VALUES (?, ?, ?);`;
    const [result] = await bdd.query(sql, [users_Id, publication_Id, commentaire]);
    return result.affectedRows > 0;
};

const updateUserPublicationComment = async (users_Id, publication_Id, commentaire) => {
    const sql = `UPDATE user_publication_comment SET user_publication_comment.commentaire = ?
    WHERE user_publication_comment.publication_Id = ? AND user_publication_comment.users_Id = ?;`;
    const [result] = await bdd.query(sql, [commentaire, publication_Id, users_Id]);
    return result.affectedRows;
};

const deleteUserPublicationComment = async (users_Id, publication_Id) => {
    const sql = `DELETE FROM user_publication_comment 
    WHERE users_Id = ? AND publication_Id = ?;`;
    const [result] = await bdd.query(sql, [users_Id, publication_Id]);
    return result.affectedRows;
};

export default {
    getAllUsersPublicationsComment,
    getUserPublicationCommentById,
    getUserPublicationCommentByAttributes,
    createUserPublicationComment,
    updateUserPublicationComment,
    deleteUserPublicationComment
}