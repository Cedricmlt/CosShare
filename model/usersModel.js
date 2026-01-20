import bdd from '../config/bdd.js';

const getAllUsers = async () => {

    const sql = `SELECT id_Users, email_connexion, password, prenom, nom, pseudo, type_de_compte, 
    date_de_creation, derniere_connexion, compte_actif, commentaire_interne, reset_token, email_verified FROM users`;

    const [rows] = await bdd.query(sql);
    return rows;
}

const getUserById = async (id_Users) => {

    const sql = `SELECT id_Users, email_connexion, password, prenom, nom, pseudo, type_de_compte, 
    date_de_creation, derniere_connexion, compte_actif, commentaire_interne, reset_token, email_verified FROM users
    WHERE id_Users = ?`;

    const [rows] = await bdd.query(sql, [id_Users]);
    return rows[0];
}

const getUserByEmail = async (email_connexion) => {

    const sql = `SELECT * FROM users WHERE email_connexion = ?`;

    const [rows] = await bdd.query(sql, [email_connexion]);
    return rows[0];
};

const searchUser = async (searchTerm) => {

    const terms = searchTerm.split(' ');

    if (terms.length === 1) {
        const sql = `SELECT * FROM users WHERE prenom LIKE ? OR nom LIKE ? OR pseudo LIKE ?`;

        const [rows] = await bdd.query(sql, [`%${terms[0]}%`, `%${terms[0]}%`, `%${terms[0]}%`]);
        return rows;
    } else if (terms.length >= 2) {

        const sql = `SELECT * FROM users WHERE (prenom LIKE ? AND nom LIKE ?) OR pseudo LIKE ?`;

        const [rows] = await bdd.query(sql, [`%${terms[0]}%`, `%${terms[1]}%`, `%${searchTerm}%`]);
        return rows;

    }
    return [];
}

const createUser = async (email_connexion, password, prenom, nom, pseudo, type_de_compte, commentaire_interne, reset_token, email_verified) => {

    const sql = `INSERT INTO users (email_connexion, password, prenom, nom, pseudo, type_de_compte, commentaire_interne, reset_token, email_verified) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    const [result] = await bdd.query(sql, [email_connexion, password, prenom, nom, pseudo, type_de_compte, commentaire_interne, reset_token, email_verified]);
    return result.insertId;
}

const updateUser = async (id_Users, email_connexion, password, prenom, nom, pseudo) => {

    const sql = `UPDATE users SET email_connexion = ?, password = ?, prenom = ?, nom = ?, pseudo = ? WHERE id_Users = ?;`;

    const [result] = await bdd.query(sql, [email_connexion, password, prenom, nom, pseudo, id_Users]);
    return result.affectedRows;
}

const deleteUser = async (id_Users) => {

    const sql = `DELETE FROM users WHERE id_Users = ?;`;

    const [result] = await bdd.query(sql, [id_Users]);
    return result.affectedRows;
}


export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    searchUser,
    createUser,
    updateUser,
    deleteUser
}