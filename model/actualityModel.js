import bdd from "../config/bdd.js";

const getAllActuality = async () => {
    const sql = `SELECT id_Actuality, title, content, cree_le, is_spinned, 
    is_maintenance, users_Id, is_verified, event_Id FROM actuality`;
    const [rows] = await bdd.query(sql);
    return rows;
};

const getActualityById = async (id_Actuality) => {
    const sql = `SELECT id_Actuality, title, content, cree_le, is_spinned, 
    is_maintenance, users_Id, is_verified, event_Id FROM actuality
    WHERE id_Actuality = ?`;
    const [rows] = await bdd.query(sql, [id_Actuality]);
    return rows[0];
};

const getActualityByAttributes = async (title, content, users_Id, event_Id) => {
    const sql = `SELECT title, content, users_Id, event_Id FROM actuality
    WHERE title = ? AND content = ? AND users_Id = ? AND event_Id = ?`;
    const [rows] = await bdd.query(sql, [title, content, users_Id, event_Id]);
    return rows[0];
};

const createActuality = async (title, content, users_Id, event_Id) => {
    const sql = `INSERT INTO actuality (title, content, users_Id, event_Id) VALUES (?, ?, ?, ?);`;
    const [result] = await bdd.query(sql, [title, content, users_Id, event_Id]);
    return result.affectedRows;
};

const updateActuality = async (id_Actuality, title, content, users_Id, event_Id) => {
    const sql = `UPDATE actuality SET title = ?, content = ?, users_Id = ?, event_Id = ?
    WHERE id_Actuality = ?;`;
    const [result] = await bdd.query(sql, [title, content, users_Id, event_Id, id_Actuality]);
    return result.affectedRows;
};

const deleteActuality = async (id_Actuality) => {
    const sql = `DELETE FROM actuality WHERE id_Actuality = ?;`;
    const [result] = await bdd.query(sql, [id_Actuality]);
    return result.affectedRows;
};

export default {
    getAllActuality,
    getActualityById,
    getActualityByAttributes,
    createActuality,
    updateActuality,
    deleteActuality
}