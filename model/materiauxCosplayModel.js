import bdd from "../config/bdd.js";

const getAllMateriauxCosplay = async () => {
    const sql = `SELECT id_Materiaux, nom, description, estimated_cost FROM materiaux_cosplay`;
    const [rows] = await bdd.query(sql);
    return rows;
};

const getMateriauxCosplayById = async (id_Materiaux) => {
    const sql = `SELECT id_Materiaux, nom, description, estimated_cost FROM materiaux_cosplay
    WHERE id_Materiaux = ?`;
    const [rows] = await bdd.query(sql, [id_Materiaux]);
    return rows[0];
};

// Permet d'éviter des injections SQL malveillantes.
const getMateriauxCosplayByAttributes = async (nom, description, estimated_cost) => {
    const sql = `SELECT * FROM materiaux_cosplay WHERE nom = ? AND description = ? AND estimated_cost = ?;`;
    const [rows] = await bdd.query(sql, [nom, description, estimated_cost]);
    return rows[0];
};

const createMateriauxCosplay = async (nom, description, estimated_cost) => {
    const sql = `INSERT INTO materiaux_cosplay (nom, description, estimated_cost) VALUES (?, ?, ?);`;
    const [result] = await bdd.query(sql, [nom, description, estimated_cost]);
    return result.insertId;
};

const updateMateriauxCosplay = async (id_Materiaux, nom, description, estimated_cost) => {
    const sql = `UPDATE materiaux_cosplay SET nom = ?, description = ?, estimated_cost = ?
    WHERE id_Materiaux = ?;`;
    const [result] = await bdd.query(sql, [nom, description, estimated_cost, id_Materiaux]);
    return result.affectedRows;
};

const deleteMateriauxCosplay = async (id_Materiaux) => {
    const sql = `DELETE FROM materiaux_cosplay WHERE id_Materiaux = ?;`;
    const [result] = await bdd.query(sql, [id_Materiaux]);
    return result.affectedRows;
};

export default {
    getAllMateriauxCosplay,
    getMateriauxCosplayById,
    getMateriauxCosplayByAttributes,
    createMateriauxCosplay,
    updateMateriauxCosplay,
    deleteMateriauxCosplay
}