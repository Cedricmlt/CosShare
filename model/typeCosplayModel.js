import bdd from "../config/bdd.js";

const getAllTypesCosplays = async () => {
    const sql = `SELECT id_Type, libelle FROM type_cosplay`;
    const [rows] = await bdd.query(sql);
    return rows;
};

const getTypeCosplayById = async (id_Type, libelle) => {
    const sql = `SELECT id_Type, libelle FROM type_cosplay WHERE id_Type = ?`;

    const [rows] = await bdd.query(sql, [id_Type, libelle]);
    return rows[0];
};

const createTypeCosplay = async (libelle) => {
    const sql = `INSERT INTO type_cosplay (libelle) VALUES (?);`;
    const [result] = await bdd.query(sql, [libelle]);
    return result.insertId;
};

const updateTypeCosplay = async (id_Type, libelle) => {
    const sql = `UPDATE type_cosplay SET libelle = ? WHERE id_Type = ?;`;
    const [result] = await bdd.query(sql, [libelle, id_Type]);
    return result.affectedRows;
};

const deleteTypeCosplay = async (id_Type) => {
    const sql = `DELETE FROM type_cosplay WHERE id_Type = ?;`;
    const [result] = await bdd.query(sql, [id_Type]);
    return result.affectedRows;
};

export default {
    getAllTypesCosplays,
    getTypeCosplayById,
    createTypeCosplay,
    updateTypeCosplay,
    deleteTypeCosplay
};