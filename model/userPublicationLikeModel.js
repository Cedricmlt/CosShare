import bdd from "../config/bdd.js";

const getAllusersPublicationsLikes = async () => {
    const sql = `SELECT user_publication_like.users_Id, user_publication_like.publication_Id, user_publication_like.is_notified, 
    users.prenom, users.nom, users.pseudo, 
    publication.description FROM user_publication_like
    INNER JOIN users ON user_publication_like.users_Id = users.id_Users
    INNER JOIN publication ON user_publication_like.publication_Id = publication.id_Publication`;
    const [rows] = await bdd.query(sql);
    return rows;
};

const getUserPublicationLikeById = async (users_Id, publication_Id) => {
    const sql = `SELECT user_publication_like.users_Id, user_publication_like.publication_Id,
    users.prenom, users.nom, users.pseudo,
    publication.description FROM user_publication_like
    INNER JOIN users ON user_publication_like.users_Id = users.id_Users
    INNER JOIN publication ON user_publication_like.publication_Id = publication.id_Publication
    WHERE user_publication_like.users_Id = ? AND user_publication_like.publication_Id = ?`;
    const [rows] = await bdd.query(sql, [users_Id, publication_Id]);
    return rows[0];
};

const getUserPublicationLikeByAttributes = async (users_Id, publication_Id, is_notified) => {
    const sql = `SELECT user_publication_like.users_Id, user_publication_like.publication_Id, user_publication_like.is_notified 
    FROM user_publication_like
    INNER JOIN users ON user_publication_like.users_Id = users.id_Users
    INNER JOIN publication ON user_publication_like.publication_Id = publication.id_Publication
    WHERE user_publication_like.users_Id = ? AND user_publication_like.publication_Id = ? AND user_publication_like.is_notified = ?`;
    const [rows] = await bdd.query(sql, [users_Id, publication_Id, is_notified]);
    return rows[0];
};

const createUserPublicationLike = async (users_Id, publication_Id) => {
    const sql = `INSERT INTO user_publication_like (users_Id, publication_Id, is_notified) VALUES (?, ?, ?);`;
    const is_notified = 0;
    const [result] = await bdd.query(sql, [users_Id, publication_Id, is_notified]);
    return result.affectedRows > 0;
};

const deleteUserPublicationlike = async (users_Id, publication_Id) => {
    const sql = `DELETE FROM user_publication_like WHERE users_Id = ? AND publication_Id = ?;`;
    const [result] = await bdd.query(sql, [users_Id, publication_Id]);
    return result.affectedRows;
};

export default {
    getAllusersPublicationsLikes,
    getUserPublicationLikeById,
    getUserPublicationLikeByAttributes,
    createUserPublicationLike,
    deleteUserPublicationlike
}