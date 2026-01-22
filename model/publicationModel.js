import bdd from "../config/bdd.js";

const getAllPublications = async () => {
    const sql = `SELECT id_Publication, users_Id, users.pseudo, users.email_connexion, description, cree_le, mise_a_jour, supprimee_le, en_ligne FROM publication
    INNER JOIN users ON publication.users_Id = users.id_Users`;
    const [rows] = await bdd.query(sql);
    return rows;
}

const getPublicationById = async (id_Publication) => {
    const sql = `SELECT users_Id, users.pseudo, users.email_connexion, description, cree_le, mise_a_jour, supprimee_le, en_ligne FROM publication
    INNER JOIN users ON publication.users_Id = users.id_Users
    WHERE id_Publication = ?`;
    const [rows] = await bdd.query(sql, [id_Publication]);
    return rows[0];
}

const createPublication = async (description) => {
    const sql = `INSERT INTO publication (description) VALUES (?);`;
    const [result] = await bdd.query(sql, [description]);
    return result.insertId;
}

const updatePublication = async (id_Publication, description) => {
    const sql = `UPDATE publication SET description = ? WHERE id_Publication = ?;`;
    const [result] = await bdd.query(sql, [description, id_Publication]);
    return result.affectedRows;
}

const deletePublication = async (id_Publication) => {
    const sql = `DELETE FROM publication WHERE id_Publication = ?;`;
    const [result] = await bdd.query(sql, [id_Publication]);
    return result.affectedRows;
}

export default {
    getAllPublications,
    getPublicationById,
    createPublication,
    updatePublication,
    deletePublication
}