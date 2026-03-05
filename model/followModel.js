import bdd from "../config/bdd.js";

const getAllFollow = async () => {
    const sql = `SELECT follow.id_Follower, follow.id_Followed, follow.followed_at, follow.statut,
    follower.prenom, follower.nom, follower.pseudo,
    followed.prenom, followed.nom, followed.pseudo FROM follow
    INNER JOIN users follower ON follow.id_Follower = follower.id_Users
    INNER JOIN users followed ON follow.id_Followed = followed.id_Users`;
    const [rows] = await bdd.query(sql);
    return rows;
};

const getFollowById = async (id_Follow, id_Followed) => {
    const sql = `SELECT follow.id_Follower, follow.id_Followed, follow.followed_at, follow.statut,
    follower.prenom, follower.nom, follower.pseudo,
    followed.prenom, followed.nom, followed.pseudo FROM follow
    INNER JOIN users follower ON follow.id_Follower = follower.id_Users
    INNER JOIN users followed ON follow.id_Followed = followed.id_Users
    WHERE follow.id_Follower = ? AND follow.id_Followed = ?`;
    const [rows] = await bdd.query(sql, [id_Follow, id_Followed]);
    return rows[0];
};

const getFollowByAttributes = async (id_Follow, id_Followed) => {
    const sql = `SELECT follow.id_Follower, follow.id_Followed FROM follow
    WHERE follow.id_Follower = ? AND follow.id_Followed = ?`;
    const [rows] = await bdd.query(sql, [id_Follow, id_Followed]);
    return rows[0];
};

const createFollow = async (id_Follower, id_Followed) => {
    const sql = `INSERT INTO follow (id_Follower, id_Followed, statut) VALUES (?, ?, "En attente");`;
    const [result] = await bdd.query(sql, [id_Follower, id_Followed]);
    return result.affectedRows;
};

const updateFollow = async (id_Follow, id_Followed, statut) => {
    const sql = `UPDATE follow SET follow.statut = ?
    WHERE follow.id_Follower = ? AND follow.id_Followed = ?;`;
    const [result] = await bdd.query(sql, [statut, id_Follow, id_Followed]);
    return result.affectedRows;
};

const deleteFollow = async (id_Follow, id_Followed) => {
    const sql = `DELETE FROM follow WHERE follow.id_Follower = ? AND follow.id_Followed = ?;`;
    const [result] = await bdd.query(sql, [id_Follow, id_Followed]);
    return result.affectedRows;
};

export default {
    getAllFollow,
    getFollowById,
    getFollowByAttributes,
    createFollow,
    updateFollow,
    deleteFollow
}