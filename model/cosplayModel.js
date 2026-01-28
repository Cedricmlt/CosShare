import bdd from "../config/bdd.js";

const getAllCosplays = async () => {
    const sql = `SELECT id_Cosplay, users_Id, title, description, cree_le, mise_a_jour, univers_Id, type_Id, estimated_cost, 
    univers_cosplay.libelle, type_cosplay.libelle, users.nom, users.prenom, users.pseudo FROM cosplay
    INNER JOIN users ON cosplay.users_Id = users.id_Users
    INNER JOIN univers_cosplay ON cosplay.univers_Id = univers_cosplay.id_Univers
    INNER JOIN type_cosplay ON cosplay.type_Id = type_cosplay.id_Type`;
    const [rows] = await bdd.query(sql);
    return rows;
};

const getCosplayById = async (id_Cosplay) => {
    const sql = `SELECT id_Cosplay, users_Id, title, description, cree_le, mise_a_jour, univers_Id, type_Id, estimated_cost, 
    univers_cosplay.libelle, type_cosplay.libelle, users.nom, users.prenom, users.pseudo FROM cosplay
    INNER JOIN users ON cosplay.users_Id = users.id_Users
    INNER JOIN univers_cosplay ON cosplay.univers_Id = univers_cosplay.id_Univers
    INNER JOIN type_cosplay ON cosplay.type_Id = type_cosplay.id_Type
    WHERE id_Cosplay = ?`;
    const [rows] = await bdd.query(sql, [id_Cosplay]);
    return rows[0];
};

const getCosplayByAttributes = async (users_Id, title, univers_Id, type_Id) => {
    const sql = `SELECT * FROM cosplay
        WHERE users_Id = ? AND title = ? AND univers_Id = ? AND type_Id = ?`;
    const [rows] = await bdd.query(sql, [users_Id, title, univers_Id, type_Id]);
    return rows;
};

const createCosplay = async (users_Id, title, description, univers_Id, type_Id, estimated_cost) => {
    const sql = `INSERT INTO cosplay (users_Id, title, description, univers_Id, type_Id, estimated_cost) VALUES (?, ?, ?, ?, ?, ?);`;
    const [result] = await bdd.query(sql, [users_Id, title, description, univers_Id, type_Id, estimated_cost]);
    return result.insertId;
};

const updateCosplay = async (id_Cosplay, users_Id, title, description, univers_Id, type_Id, estimated_cost) => {
    const sql = `UPDATE cosplay SET users_Id = ?, title = ?, description = ?, univers_Id = ?, type_Id = ?, estimated_cost = ?
    WHERE id_Cosplay = ?;`;
    const [result] = await bdd.query(sql, [users_Id, title, description, univers_Id, type_Id, estimated_cost, id_Cosplay]);
    return result.affectedRows;
};

const deleteCosplay = async (id_Cosplay) => {
    const sql = `DELETE FROM cosplay WHERE id_Cosplay = ?;`;
    const [result] = await bdd.query(sql, [id_Cosplay]);
    return result.affectedRows;
};

export default {
    getAllCosplays,
    getCosplayById,
    getCosplayByAttributes,
    createCosplay,
    updateCosplay,
    deleteCosplay
}