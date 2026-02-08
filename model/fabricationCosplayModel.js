import bdd from "../config/bdd.js";

const getAllFabricationsCosplay = async () => {
    const sql = `SELECT id_Fabrication, libelle, estimated_cost FROM fabrication_cosplay`;
    const [rows] = await bdd.query(sql);
    return rows;
};

const getFabricationCosplayById = async (id_Fabrication) => {
    const sql = `SELECT id_Fabrication, libelle, estimated_cost FROM fabrication_cosplay
    WHERE id_Fabrication = ?`;
    const [rows] = await bdd.query(sql, [id_Fabrication]);
    return rows[0];
};

// Permet d'éviter des injections SQL malveillantes.
const getFabricationCosplayByAttributes = async (libelle, estimated_cost) => {
    const sql = `SELECT libelle, estimated_cost FROM fabrication_cosplay WHERE libelle = ? AND estimated_cost = ?;`;
    const [rows] = await bdd.query(sql, [libelle, estimated_cost]);
    return rows[0];
};

const createFabricationCosplay = async (libelle, estimated_cost) => {
    const sql = `INSERT INTO fabrication_cosplay (libelle, estimated_cost) VALUES (?, ?);`;
    const [result] = await bdd.query(sql, [libelle, estimated_cost]);
    return result.insertId;
};

const updateFabricationCosplay = async (id_Fabrication, libelle, estimated_cost) => {
    const sql = `UPDATE fabrication_cosplay SET libelle = ?, estimated_cost = ?
    WHERE id_Fabrication = ?;`;
    const [result] = await bdd.query(sql, [libelle, estimated_cost, id_Fabrication]);
    return result.affectedRows;
};

const deleteFabricationCosplay = async (id_Fabrication) => {
    const sql = `DELETE FROM fabrication_cosplay WHERE id_Fabrication = ?;`;
    const [result] = await bdd.query(sql, [id_Fabrication]);
    return result.affectedRows;
};

export default {
    getAllFabricationsCosplay,
    getFabricationCosplayById,
    getFabricationCosplayByAttributes,
    createFabricationCosplay,
    updateFabricationCosplay,
    deleteFabricationCosplay
}