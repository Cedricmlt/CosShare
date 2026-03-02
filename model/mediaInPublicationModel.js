import bdd from "../config/bdd.js";

const getAllMediasInPublication = async () => {
    const sql = `SELECT id_Media, publication_Id, url, type_media FROM media_in_publication
    INNER JOIN publication ON media_in_publication.publication_Id = publication.id_Publication`;
    const [rows] = await bdd.query(sql);
    return rows;
};

const getMediaInPublicationById = async (id_Media) => {
    const sql = `SELECT id_Media, publication_Id, url, type_media FROM media_in_publication
    INNER JOIN publication ON media_in_publication.publication_Id = publication.id_Publication
    WHERE id_Media = ?`;
    const [rows] = await bdd.query(sql, [id_Media]);
    return rows[0];
};

// Permet d'éviter des injections SQL malveillantes.
const getMediaInPublicationByAttributes = async (publication_Id, url, type_media) => {
    const sql = `SELECT publication_Id, url, type_media FROM media_in_publication WHERE publication_Id = ? AND url = ? AND type_media = ?`;
    const [rows] = await bdd.query(sql, [publication_Id, url, type_media]);
    return rows;
};

const createMediaInPublication = async (publication_Id, url, type_media) => {
    const sql = `INSERT INTO media_in_publication (publication_Id, url, type_media) VALUES (?, ?, ?);`;
    const [result] = await bdd.query(sql, [publication_Id, url, type_media]);
    return result.insertId;
};

const updateMediaInPublication = async (id_Media, publication_Id, url, type_media) => {
    const sql = `UPDATE media_in_publication SET publication_Id = ?, url = ?, type_media = ?
    WHERE id_Media = ?;`;
    const [result] = await bdd.query(sql, [publication_Id, url, type_media, id_Media]);
    return result.affectedRows;
};

const deleteMediaInPublication = async (id_Media) => {
    const sql = `DELETE FROM media_in_publication WHERE id_Media = ?;`;
    const [result] = await bdd.query(sql, [id_Media]);
    return result.affectedRows;
};

export default {
    getAllMediasInPublication,
    getMediaInPublicationById,
    getMediaInPublicationByAttributes,
    createMediaInPublication,
    updateMediaInPublication,
    deleteMediaInPublication
}