import bdd from "../config/bdd.js";

const getAllAccessoiresCosplay = async () => {
    const sql = `SELECT id_Accessoires, accessoire, estimated_cost FROM accessoires_cosplay`;
    const [rows] = await bdd.query(sql);
    return rows;
};

const getAccessoireCosplayById = async (id_Accessoires) => {
    const sql = `SELECT id_Accessoires, accessoire, estimated_cost FROM accessoires_cosplay
    WHERE id_Accessoires = ?`;
    const [rows] = await bdd.query(sql, [id_Accessoires]);
    return rows[0];
};

const getAccessoiresCosplayByAttributes = async (accessoire, estimated_cost) => {
    const sql = `SELECT * FROM accessoires_cosplay WHERE accessoire = ? AND estimated_cost = ?;`;
    const [rows] = await bdd.query(sql, [accessoire, estimated_cost]);
    return rows[0];
};

const createAccessoiresCosplay = async (accessoire, estimated_cost) => {
    const sql = `INSERT INTO accessoires_cosplay (accessoire, estimated_cost) VALUES (?, ?);`;
    const [result] = await bdd.query(sql, [accessoire, estimated_cost]);
    return result.affectedRows;
};

const updateAccessoiresCosplay = async (id_Accessoires, accessoire, estimated_cost) => {
    const sql = `UPDATE accessoires_cosplay SET accessoire = ?, estimated_cost = ? 
    WHERE id_Accessoires = ?;`;
    const [result] = await bdd.query(sql, [accessoire, estimated_cost, id_Accessoires]);
    return result.affectedRows;
};

const deleteAccessoiresCosplay = async (id_Accessoires) => {
    const sql = `DELETE FROM accessoires_cosplay WHERE id_Accessoires = ?;`;
    const [result] = await bdd.query(sql, [id_Accessoires]);
    return result.affectedRows;
};

export default {
    getAllAccessoiresCosplay,
    getAccessoireCosplayById,
    getAccessoiresCosplayByAttributes,
    createAccessoiresCosplay,
    updateAccessoiresCosplay,
    deleteAccessoiresCosplay
}