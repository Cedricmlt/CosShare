import bdd from "../config/bdd.js";

const getAllRoles = async () => {
    const sql = `SELECT id_Role, code_du_role, libelle, description FROM role`;
    const [rows] = await bdd.query(sql);
    return rows;
};

const getRoleById = async (id_Role) => {
    const sql = `SELECT code_du_role, libelle, description FROM role WHERE id_Role = ?`;
    const [rows] = await bdd.query(sql, [id_Role]);
    return rows[0];
};

const createRole = async (code_du_role, libelle, description) => {
    const sql = `INSERT INTO role (code_du_role, libelle, description) VALUES (?, ?, ?);`;
    const [result] = await bdd.query(sql, [code_du_role, libelle, description]);
    return result.insertId;
};

const updateRole = async (id_Role, code_du_role, libelle, description) => {
    const sql = `UPDATE role SET code_du_role = ?, libelle = ?, description = ? WHERE id_Role = ?;`;
    const [result] = await bdd.query(sql, [code_du_role, libelle, description, id_Role]);
    return result.affectedRows;
};

const deleteRole = async (id_Role) => {
    const sql = `DELETE FROM role WHERE id_Role = ?;`;
    const [result] = await bdd.query(sql, [id_Role]);
    return result.affectedRows;
};

export default {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
};