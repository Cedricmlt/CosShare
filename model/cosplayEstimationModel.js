import bdd from "../config/bdd.js";

const getAllCosplayEstimations = async () => {
    const sql = `SELECT id_Cosplay_Estimation, cosplay_estimation.cosplay_Id, cosplay_estimation.fabrication_Id,
    cosplay_estimation.accessoires_Id, cosplay_estimation.outils_Id, cosplay_estimation.materiaux_Id, cosplay_estimation.users_Id,

    cosplay.title, 
    cosplay.description AS cosplay_description, 
    CONCAT(cosplay.estimated_cost, "€" ) AS cosplay_estimated_cost, 

    COALESCE(fabrication_cosplay.libelle, 'Aucun') AS libelle, 
    CONCAT(COALESCE(fabrication_cosplay.estimated_cost, 0), "€" ) AS fabrication_cosplay_estimated_cost, 

    COALESCE(accessoires_cosplay.accessoire, 'Aucun') AS accessoire,
    CONCAT(COALESCE(accessoires_cosplay.estimated_cost, 0), "€" ) AS accessoires_cosplay_estimated_cost,

    COALESCE(outils_cosplay.maquillage, 'Aucun') AS maquillage,
    COALESCE(outils_cosplay.appareils, 'Aucun') AS appareils, 
    COALESCE(outils_cosplay.lentilles_de_contact, 'Aucun') AS lentilles_de_contact, 
    CONCAT(COALESCE(outils_cosplay.estimated_cost, 0), "€" ) AS outils_cosplay_estimated_cost,

    COALESCE(materiaux_cosplay.nom, 'Aucun') AS materiaux_cosplay_nom, 
    COALESCE(materiaux_cosplay.description, 'Aucun') AS materiaux_cosplay_description, 
    CONCAT(COALESCE(materiaux_cosplay.estimated_cost, 0), "€" ) AS materiaux_cosplay_estimated_cost,

    users.nom AS users_nom, 
    users.prenom, 
    users.pseudo,
    CONCAT((cosplay.estimated_cost + 
    COALESCE(fabrication_cosplay.estimated_cost, 0) + 
    COALESCE(accessoires_cosplay.estimated_cost, 0) + 
    COALESCE(outils_cosplay.estimated_cost, 0) + 
    COALESCE(materiaux_cosplay.estimated_cost, 0)), "€" ) AS total_estimated_cost

    FROM cosplay_estimation
    INNER JOIN cosplay ON cosplay_estimation.cosplay_Id = cosplay.id_Cosplay
    LEFT JOIN fabrication_cosplay ON cosplay_estimation.fabrication_Id = fabrication_cosplay.id_Fabrication
    LEFT JOIN accessoires_cosplay ON cosplay_estimation.accessoires_Id = accessoires_cosplay.id_Accessoires
    LEFT JOIN outils_cosplay ON cosplay_estimation.outils_Id = outils_cosplay.id_Outils
    LEFT JOIN materiaux_cosplay ON cosplay_estimation.materiaux_Id = materiaux_cosplay.id_Materiaux
    INNER JOIN users ON cosplay_estimation.users_Id = users.id_Users`;
    const [rows] = await bdd.query(sql);
    return rows;
};

const getCosplayEstimationById = async (id_Cosplay_Estimation) => {
    const sql = `SELECT id_Cosplay_Estimation, cosplay_estimation.cosplay_Id, cosplay_estimation.fabrication_Id, cosplay_estimation.accessoires_Id,
    cosplay_estimation.outils_Id, cosplay_estimation.materiaux_Id, cosplay_estimation.users_Id,

    cosplay.title, 
    cosplay.description AS cosplay_description, 
    CONCAT(cosplay.estimated_cost, "€" ) AS cosplay_estimated_cost,

    COALESCE(fabrication_cosplay.libelle, 'Aucun') AS fabrication_cosplay_libelle,
    CONCAT(COALESCE(fabrication_cosplay.estimated_cost, 0), "€" ) AS fabrication_cosplay_estimated_cost,

    COALESCE(accessoires_cosplay.accessoire, 'Aucun'),  
    CONCAT(COALESCE(accessoires_cosplay.estimated_cost, 0), "€" ) AS accessoires_cosplay_estimated_cost,

    COALESCE(outils_cosplay.maquillage, 'Aucun') AS maquillage,
    COALESCE(outils_cosplay.appareils, 'Aucun') AS appareils, 
    COALESCE(outils_cosplay.lentilles_de_contact, 'Aucun') AS lentilles_de_contact,
    CONCAT(COALESCE(outils_cosplay.estimated_cost, 0), "€" ) AS outils_cosplay_estimated_cost,

    COALESCE(materiaux_cosplay.nom, 'Aucun') AS materiaux_cosplay_nom, 
    COALESCE(materiaux_cosplay.description, 'Aucun') AS materiaux_cosplay_description, 
    CONCAT(COALESCE(materiaux_cosplay.estimated_cost, 0), "€" ) AS materiaux_cosplay_estimated_cost,

    users.prenom, 
    users.nom AS users_nom, 
    users.pseudo,
    CONCAT((cosplay.estimated_cost + 
    COALESCE(fabrication_cosplay.estimated_cost, 0) + 
    COALESCE(accessoires_cosplay.estimated_cost, 0) + 
    COALESCE(outils_cosplay.estimated_cost, 0) + 
    COALESCE(materiaux_cosplay.estimated_cost, 0)), "€" ) AS total_estimated_cost

    FROM cosplay_estimation
    INNER JOIN cosplay ON cosplay_estimation.cosplay_Id = cosplay.id_Cosplay
    LEFT JOIN fabrication_cosplay ON cosplay_estimation.fabrication_Id = fabrication_cosplay.id_Fabrication
    LEFT JOIN accessoires_cosplay ON cosplay_estimation.accessoires_Id = accessoires_cosplay.id_Accessoires
    LEFT JOIN outils_cosplay ON cosplay_estimation.outils_Id = outils_cosplay.id_Outils
    LEFT JOIN materiaux_cosplay ON cosplay_estimation.materiaux_Id = materiaux_cosplay.id_Materiaux
    INNER JOIN users ON cosplay_estimation.users_Id = users.id_Users
    WHERE id_Cosplay_Estimation = ?`;
    const [rows] = await bdd.query(sql, [id_Cosplay_Estimation]);
    return rows[0];
};

// Permet d'éviter des injections SQL malveillantes.
const getCosplayEstimationByAttributes = async (cosplay_Id, fabrication_Id, accessoires_Id, outils_Id, materiaux_Id, users_Id) => {
    const sql = `SELECT * FROM cosplay_estimation 
    WHERE cosplay_Id = ? AND fabrication_Id AND accessoires_Id = ? AND outils_Id = ?
    AND materiaux_Id = ? AND users_Id = ?`;
    const [rows] = await bdd.query(sql, [cosplay_Id, fabrication_Id, accessoires_Id, outils_Id, materiaux_Id, users_Id]);
    return rows;
};

const createCosplayEstimation = async (cosplay_Id, fabrication_Id, accessoires_Id, outils_Id, materiaux_Id, users_Id) => {
    const sql = `INSERT INTO cosplay_estimation (cosplay_Id, fabrication_Id, accessoires_Id, outils_Id, materiaux_Id, users_Id) 
    VALUES (?, ?, ?, ?, ?, ?);`;
    const [result] = await bdd.query(sql, [cosplay_Id, fabrication_Id || null, accessoires_Id || null,
        outils_Id || null, materiaux_Id || null, users_Id]);
    return result.insertId;
};

const updateCosplayEstimation = async (id_Cosplay_Estimation, cosplay_Id, fabrication_Id, accessoires_Id, outils_Id, materiaux_Id, users_Id) => {
    const sql = `UPDATE cosplay_estimation SET cosplay_Id = ?, fabrication_Id = ?, accessoires_Id = ?, outils_Id = ?,
    materiaux_Id = ?, users_Id = ?
    WHERE id_Cosplay_Estimation = ?;`;
    const [result] = await bdd.query(sql, [cosplay_Id, fabrication_Id, accessoires_Id, outils_Id, materiaux_Id, users_Id, id_Cosplay_Estimation]);
    return result.affectedRows;
};

const deleteCosplayEstimation = async (id_Cosplay_Estimation) => {
    const sql = `DELETE FROM cosplay_estimation WHERE id_Cosplay_Estimation = ?;`;
    const [result] = await bdd.query(sql, [id_Cosplay_Estimation]);
    return result.affectedRows;
};

export default {
    getAllCosplayEstimations,
    getCosplayEstimationById,
    getCosplayEstimationByAttributes,
    createCosplayEstimation,
    updateCosplayEstimation,
    deleteCosplayEstimation
}