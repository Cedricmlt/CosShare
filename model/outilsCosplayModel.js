import bdd from "../config/bdd.js";

const getAllOutilsCosplay = async () => {
    const sql = `SELECT id_Outils, maquillage, appareils, lentilles_de_contact, estimated_cost FROM outils_cosplay`;
    const [rows] = await bdd.query(sql);
    return rows;
};

const getOutilCosplayById = async (id_Outils) => {
    const sql = `SELECT id_Outils, maquillage, appareils, lentilles_de_contact, estimated_cost FROM outils_cosplay 
    WHERE id_Outils = ?`;
    const [rows] = await bdd.query(sql, [id_Outils]);
    return rows[0];
};

// Permet d'éviter des injections SQL malveillantes.
const getOutilCosplayByAttributes = async (maquillage, appareils, lentilles_de_contact, estimated_cost) => {
    const sql = `SELECT * FROM outils_cosplay WHERE maquillage = ? AND appareils = ? AND lentilles_de_contact = ? AND estimated_cost = ?;`;
    const [rows] = await bdd.query(sql, [maquillage, appareils, lentilles_de_contact, estimated_cost]);
    return rows[0];
};


const createOutilsCosplay = async (maquillage, appareils, lentilles_de_contact, estimated_cost) => {
    const sql = `INSERT INTO outils_cosplay (maquillage, appareils, lentilles_de_contact, estimated_cost) VALUES (?, ?, ?, ?);`;
    const [result] = await bdd.query(sql, [maquillage, appareils, lentilles_de_contact, estimated_cost]);
    return result.insertId;
};

const updateOutilsCosplay = async (id_Outils, maquillage, appareils, lentilles_de_contact, estimated_cost) => {
    const sql = `UPDATE outils_cosplay SET maquillage = ?, appareils = ?, lentilles_de_contact = ?, estimated_cost = ? 
    WHERE id_Outils = ?;`;
    const [result] = await bdd.query(sql, [maquillage, appareils, lentilles_de_contact, estimated_cost, id_Outils]);
    return result.affectedRows;
};

const deleteOutilsCosplay = async (id_Outils) => {
    const sql = `DELETE FROM outils_cosplay WHERE id_Outils = ?;`;
    const [result] = await bdd.query(sql, [id_Outils]);
    return result.affectedRows;
};

export default {
    getAllOutilsCosplay,
    getOutilCosplayById,
    getOutilCosplayByAttributes,
    createOutilsCosplay,
    updateOutilsCosplay,
    deleteOutilsCosplay
}