import bdd from "../config/bdd.js";

const getAllPublicationsTags = async () => {
    const sql = `SELECT publication_Id, tag_Id, publication.users_Id, publication.description, publication.cree_le, tags.label
    FROM publication_tags
    INNER JOIN publication ON publication_tags.publication_Id = publication.id_Publication
    INNER JOIN tags ON publication_tags.tag_Id = tags.id_Tag`;
    const [rows] = await bdd.query(sql);
    return rows;
};

const getPublicationTagById = async (publication_Id, tag_Id) => {
    const sql = `SELECT publication_Id, tag_Id, publication.users_Id, publication.description, publication.cree_le, tags.label 
    FROM publication_tags
    INNER JOIN publication ON publication_tags.publication_Id = publication.id_Publication
    INNER JOIN tags ON publication_tags.tag_Id = tags.id_Tag
    WHERE publication_Id = ? AND tag_Id = ?`;
    const [rows] = await bdd.query(sql, [publication_Id, tag_Id]);
    return rows[0];
};

// Permet d'éviter des injections SQL malveillantes.
const getPublicationTagsByAttributes = async (publication_Id, tag_Id) => {
    const sql = `SELECT publication_tags.publication_Id, publication_tags.tag_Id, publication.users_Id, publication.description, publication.cree_le, tags.label 
    FROM publication_tags
    INNER JOIN publication ON publication_tags.publication_Id = publication.id_Publication
    INNER JOIN tags ON publication_tags.tag_Id = tags.id_Tag
    WHERE publication_Id = ? AND tag_Id = ?`;
    const [rows] = await bdd.query(sql, [publication_Id, tag_Id]);
    return rows[0];
};

const createPublicationTags = async (publication_Id, tag_Id) => {
    const sql = `INSERT INTO publication_tags (publication_Id, tag_Id) VALUES (?, ?);`;
    const [result] = await bdd.query(sql, [publication_Id, tag_Id]);
    return result.affectedRows > 0;
};

const updatePublicationTags = async (publication_Id, tag_Id) => {
    const sql = `UPDATE publication_tags SET tag_Id = ? WHERE publication_Id = ?;`;
    const [result] = await bdd.query(sql, [tag_Id, publication_Id]);
    return result.affectedRows;
};

const deletePublicationTags = async (publication_Id, tag_Id) => {
    const sql = `DELETE FROM publication_tags WHERE publication_Id = ? AND tag_Id = ?;`;
    const [result] = await bdd.query(sql, [publication_Id, tag_Id]);
    return result.affectedRows;
};

export default {
    getAllPublicationsTags,
    getPublicationTagById,
    getPublicationTagsByAttributes,
    createPublicationTags,
    updatePublicationTags,
    deletePublicationTags
}