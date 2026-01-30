import bdd from "../config/bdd.js";

const getAllUsersRoles = async () => {
    const sql = `SELECT users_Id, role_Id, 
    users.email_connexion, users.prenom, users.nom, users.pseudo, 
    role.code_du_role, role.libelle, role.description FROM users_role

    INNER JOIN users ON users_role.users_Id = users.id_Users
    INNER JOIN role ON users_role.role_Id = role.id_Role`;
    const [rows] = await bdd.query(sql);
    return rows;
};

const getUserRoleById = async (users_Id, role_Id) => {
    const sql = `SELECT users_Id, role_Id, 
    users.email_connexion, users.prenom, users.nom, users.pseudo, 
    role.code_du_role, role.libelle, role.description FROM users_role

    INNER JOIN users ON users_role.users_Id = users.id_Users
    INNER JOIN role ON users_role.role_Id = role.id_Role
    WHERE users_Id = ? AND role_Id = ?`;
    const [rows] = await bdd.query(sql, [users_Id, role_Id]);
    return rows[0];
};

const getUserRoleOfUserId = async (users_Id) => {
    const sql = `SELECT users_Id, role_Id, users.email_connexion, users.prenom, users.nom, users.pseudo, role.libelle, role.description FROM users_role
    INNER JOIN users ON users_role.users_Id = users.id_Users
    INNER JOIN role ON users_role.role_Id = role.id_Role
    WHERE users_Id = ?`;
    const [rows] = await bdd.query(sql, [users_Id]);
    return rows[0];
};

// Permet d'éviter des injections SQL malveillantes.
const getUserRoleByAttributes = async (users_Id, role_Id) => {
    const sql = `SELECT users_role.users_Id, users_role.role_Id, users.email_connexion, users.prenom, users.nom, users.pseudo, role.libelle, role.description
        FROM users_role
        INNER JOIN users ON users_role.users_Id = users.id_Users
        INNER JOIN role ON users_role.role_Id = role.id_Role
        WHERE users_role.users_Id = ? AND users_role.role_Id = ?`;
    const [rows] = await bdd.query(sql, [users_Id, role_Id]);
    return rows[0];
};

const createUserRole = async (users_Id, role_Id) => {
    const sql = `INSERT INTO users_role (users_Id, role_Id) VALUES (?, ?);`;
    const [result] = await bdd.query(sql, [users_Id, role_Id]);
    return result.affectedRows > 0;
};

const updateUserRole = async (users_Id, role_Id) => {
    const sql = `UPDATE users_role SET role_Id = ? WHERE users_Id = ?;`;
    const [result] = await bdd.query(sql, [role_Id, users_Id]);
    return result.affectedRows;
};

const deleteUserRole = async (users_Id, role_Id) => {
    const sql = `DELETE FROM users_role WHERE users_Id = ? AND role_Id = ?;`;
    const [result] = await bdd.query(sql, [users_Id, role_Id]);
    return result.affectedRows;
};

export default {
    getAllUsersRoles,
    getUserRoleById,
    getUserRoleOfUserId,
    getUserRoleByAttributes,
    createUserRole,
    updateUserRole,
    deleteUserRole
};