import bdd from "../config/bdd.js";

const getAllUniversCosplays = async () => {
    const sql = `SELECT id_Univers, libelle FROM univers_cosplay`;
    const [rows] = await bdd.query(sql);
    return rows;
};

const getUniversCosplayById = async (id_Univers) => {
    const sql = `SELECT id_Univers, libelle FROM univers_cosplay WHERE id_Univers = ?`;
    const [rows] = await bdd.query(sql, [id_Univers]);
    return rows[0];
};

const getUniversCosplayByAttributes = async (id_Univers, libelle) => {
    const sql = `SELECT id_Univers, libelle FROM univers_cosplay 
    WHERE id_Univers = ?`;
    const [rows] = await bdd.query(sql, [id_Univers, libelle]);
    return rows[0];
};

const createUniversCosplay = async (libelle) => {
    const sql = `INSERT INTO univers_cosplay (libelle) VALUES (?);`;
    const [result] = await bdd.query(sql, [libelle]);
    return result.insertId;
};

const updateUniversCosplay = async (id_Univers, libelle) => {
    const sql = `UPDATE univers_cosplay SET libelle = ? WHERE id_Univers = ?;`;
    const [result] = await bdd.query(sql, [libelle, id_Univers]);
    return result.affectedRows;
};

const deleteUniversCosplay = async (id_Univers) => {
    const sql = `DELETE FROM univers_cosplay WHERE id_Univers = ?;`;
    const [result] = await bdd.query(sql, [id_Univers]);
    return result.affectedRows;
};

export default {
    getAllUniversCosplays,
    getUniversCosplayById,
    getUniversCosplayByAttributes,
    createUniversCosplay,
    updateUniversCosplay,
    deleteUniversCosplay
}