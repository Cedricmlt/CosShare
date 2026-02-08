import bdd from "../config/bdd.js";

const getAllTags = async () => {
    const sql = `SELECT id_Tag, label FROM tags`;
    const [rows] = await bdd.query(sql);
    return rows;
};

const getTagById = async (id_Tag) => {
    const sql = `SELECT id_Tag, label FROM tags WHERE id_Tag = ?`;
    const [rows] = await bdd.query(sql, [id_Tag]);
    return rows[0];
};

// Permet d'éviter des injections SQL malveillantes.
const getTagByAttributes = async (label) => {
    const sql = `SELECT label FROM tags WHERE label = ?;`;
    const [rows] = await bdd.query(sql, [label]);
    return rows[0];
};

const createTag = async (label) => {
    const sql = `INSERT INTO tags (label) VALUES (?);`;
    const [result] = await bdd.query(sql, [label]);
    return result.insertId;
};

const updateTag = async (id_Tag, label) => {
    const sql = `UPDATE tags SET label = ? WHERE id_Tag = ?;`;
    const [result] = await bdd.query(sql, [label, id_Tag]);
    return result.affectedRows;
};

const deleteTag = async (id_Tag) => {
    const sql = `DELETE FROM tags WHERE id_Tag = ?;`;
    const [result] = await bdd.query(sql, [id_Tag]);
    return result.affectedRows;
};

export default {
    getAllTags,
    getTagById,
    getTagByAttributes,
    createTag,
    updateTag,
    deleteTag
}