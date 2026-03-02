import bdd from "../config/bdd.js";

const getAllMediaActuality = async () => {
    const sql = `SELECT id_media_actuality, actuality_Id, url, type FROM media_actuality`;
    const [rows] = await bdd.query(sql);
    return rows;
};

const getMediaActualityById = async (id_media_actuality) => {
    const sql = `SELECT id_media_actuality, actuality_Id, url, type FROM media_actuality
    WHERE id_media_actuality = ?`;
    const [rows] = await bdd.query(sql, [id_media_actuality]);
    return rows[0];
};

const getMediaActualityByAttributes = async (actuality_Id, url, type) => {
    const sql = `SELECT actuality_Id, url, type FROM media_actuality
    WHERE actuality_Id = ? AND url = ? AND type = ?`;
    const [rows] = await bdd.query(sql, [actuality_Id, url, type]);
    return rows[0];
};

const createMediaActuality = async (actuality_Id, url, type) => {
    const sql = `INSERT INTO media_actuality (actuality_Id, url, type) VALUES (?, ?, ?);`;
    const [result] = await bdd.query(sql, [actuality_Id, url, type]);
    return result.affectedRows;
};

const updateMediaActuality = async (id_media_actuality, actuality_Id, url, type) => {
    const sql = `UPDATE media_actuality SET actuality_Id = ?, url = ?, type = ?
    WHERE id_media_actuality = ?;`;
    const [result] = await bdd.query(sql, [actuality_Id, url, type, id_media_actuality]);
    return result.affectedRows;
};

const deleteMediaActuality = async (id_media_actuality) => {
    const sql = `DELETE FROM media_actuality WHERE id_media_actuality = ?;`;
    const [result] = await bdd.query(sql, [id_media_actuality]);
    return result.affectedRows;
};


export default {
    getAllMediaActuality,
    getMediaActualityById,
    getMediaActualityByAttributes,
    createMediaActuality,
    updateMediaActuality,
    deleteMediaActuality
}