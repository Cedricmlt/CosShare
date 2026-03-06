import bdd from "../config/bdd.js";

const getAllMediaCosplay = async () => {
    const sql = `SELECT media_cosplay.id_Media, media_cosplay.cosplay_Id, media_cosplay.url, 
    media_cosplay.type, media_cosplay.cree_le FROM media_cosplay`;
    const [rows] = await bdd.query(sql);
    return rows;
};

const getMediaCosplayById = async (id_Media) => {
    const sql = `SELECT media_cosplay.id_Media, media_cosplay.cosplay_Id, media_cosplay.url, 
    media_cosplay.type, media_cosplay.cree_le FROM media_cosplay
    WHERE media_cosplay.id_Media = ?`;
    const [rows] = await bdd.query(sql, [id_Media]);
    return rows[0];
};

const getMediaCosplayByAttributes = async (cosplay_Id, url, type) => {
    const sql = `SELECT media_cosplay.cosplay_Id, media_cosplay.url, media_cosplay.type FROM media_cosplay
    WHERE media_cosplay.cosplay_Id = ? AND media_cosplay.url = ? AND media_cosplay.type = ?`;
    const [rows] = await bdd.query(sql, [cosplay_Id, url, type]);
    return rows[0];
};

const createMediaCosplay = async (cosplay_Id, url, type) => {
    const sql = `INSERT INTO media_cosplay (cosplay_Id, url, type) VALUES (?, ?, ?);`;
    const [result] = await bdd.query(sql, [cosplay_Id, url, type]);
    return result.affectedRows;
};

const updateMediaCosplay = async (id_Media, cosplay_Id, url, type) => {
    const sql = `UPDATE media_cosplay SET media_cosplay.cosplay_Id = ?, media_cosplay.url = ?, media_cosplay.type = ?
    WHERE media_cosplay.id_Media = ?;`;
    const [result] = await bdd.query(sql, [cosplay_Id, url, type, id_Media]);
    return result.affectedRows;
};

const deleteMediaCosplay = async (id_Media) => {
    const sql = `DELETE FROM media_cosplay WHERE media_cosplay.id_Media = ?;`;
    const [result] = await bdd.query(sql, [id_Media]);
    return result.affectedRows;
};

export default {
    getAllMediaCosplay,
    getMediaCosplayById,
    getMediaCosplayByAttributes,
    createMediaCosplay,
    updateMediaCosplay,
    deleteMediaCosplay
}