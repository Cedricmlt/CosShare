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

const updateUserPublicationComment = async (id_comment, commentaire) => {
    const sql = `UPDATE user_publication_comment SET user_publication_comment.commentaire = ?
    WHERE user_publication_comment.id_comment = ?;`;
    const [result] = await bdd.query(sql, [commentaire, id_comment]);
    return result.affectedRows;
};

const deleteUserPublicationComment = async (id_comment) => {
    const sql = `DELETE FROM user_publication_comment 
    WHERE user_publication_comment.id_comment = ?;`;
    const [result] = await bdd.query(sql, [id_comment]);
    return result.affectedRows;
};

const getCommentsByPublication = async (publication_Id) => {
    const sql = `SELECT user_publication_comment.id_comment, 
    user_publication_comment.users_Id, 
    user_publication_comment.publication_Id,
    user_publication_comment.commentaire,
    users.pseudo
    FROM user_publication_comment
    INNER JOIN users ON user_publication_comment.users_Id = users.id_Users
    WHERE user_publication_comment.publication_Id = ?`;
    const [rows] = await bdd.query(sql, [publication_Id]);
    return rows;
};

export default {
    getAllUsersPublicationsComment,
    getUserPublicationCommentById,
    getUserPublicationCommentByAttributes,
    createUserPublicationComment,
    updateUserPublicationComment,
    deleteUserPublicationComment,
    getCommentsByPublication
}