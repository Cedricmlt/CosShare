import bdd from "../config/bdd.js";

const getAllCategoryArticle = async () => {
    const sql = `SELECT category_article.id_Category, category_article.label, 
    category_article.description FROM category_article`;
    const [rows] = await bdd.query(sql);
    return rows;
};

const getCategoryArticleById = async (id_Category) => {
    const sql = `SELECT category_article.id_Category, category_article.label,
    category_article.description FROM category_article
    WHERE category_article.id_Category = ?`;
    const [rows] = await bdd.query(sql, [id_Category]);
    return rows[0];
};

const getCategoryArticleByAttributes = async (label, description) => {
    const sql = `SELECT label, description FROM category_article
    WHERE label = ? AND description = ?`;
    const [rows] = await bdd.query(sql, [label, description]);
    return rows[0];
};

const createCategoryArticle = async (label, description) => {
    const sql = `INSERT INTO category_article (label, description) VALUES (?, ?);`;
    const [result] = await bdd.query(sql, [label, description]);
    return result.affectedRows;
};

const updateCategoryArticle = async (id_Category, label, description) => {
    const sql = `UPDATE category_article SET label = ?, description = ?
    WHERE id_Category = ?;`;
    const [result] = await bdd.query(sql, [label, description, id_Category]);
    return result.affectedRows;
};

const deleteCategoryArticle = async (id_Category) => {
    const sql = `DELETE FROM category_article WHERE id_Category = ?;`;
    const [result] = await bdd.query(sql, [id_Category]);
    return result.affectedRows;
};

export default {
    getAllCategoryArticle,
    getCategoryArticleById,
    getCategoryArticleByAttributes,
    createCategoryArticle,
    updateCategoryArticle,
    deleteCategoryArticle
}