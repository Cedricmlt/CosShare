import bdd from "../config/bdd.js";

const getAllPublications = async () => {
    const sql = `SELECT publication.id_Publication, 
    publication.users_Id, users.pseudo, users.email_connexion, publication.description, 
    publication.cree_le, publication.mise_a_jour, publication.supprimee_le, publication.en_ligne 
    FROM publication
    INNER JOIN users ON publication.users_Id = users.id_Users`;
    const [rows] = await bdd.query(sql);
    return rows;
};

const getPublicationById = async (id_Publication) => {
    const sql = `SELECT users_Id, users.pseudo, users.email_connexion, description, cree_le, mise_a_jour, 
    supprimee_le, en_ligne FROM publication
    INNER JOIN users ON publication.users_Id = users.id_Users
    WHERE id_Publication = ?`;
    const [rows] = await bdd.query(sql, [id_Publication]);
    return rows[0];
};

const getPublicationByAttributes = async (users_Id, description) => {
    const sql = `SELECT users_Id, description FROM publication
    INNER JOIN users ON publication.users_Id = users.id_Users
    WHERE users_Id = ? AND description = ?`;
    const [rows] = await bdd.query(sql, [users_Id, description]);
    return rows[0];
};

const createPublication = async (users_Id, description) => {
    const sql = `INSERT INTO publication (users_Id, description) VALUES (?, ?);`;
    const [result] = await bdd.query(sql, [users_Id, description]);
    return result.insertId;
};

const updatePublication = async (id_Publication, description) => {
    const sql = `UPDATE publication SET description = ? WHERE id_Publication = ?;`;
    const [result] = await bdd.query(sql, [description, id_Publication]);
    return result.affectedRows;
};

const deletePublication = async (id_Publication) => {
    const sql = `DELETE FROM publication WHERE id_Publication = ?;`;
    const [result] = await bdd.query(sql, [id_Publication]);
    return result.affectedRows;
};

export default {
    getAllPublications,
    getPublicationById,
    getPublicationByAttributes,
    createPublication,
    updatePublication,
    deletePublication
};