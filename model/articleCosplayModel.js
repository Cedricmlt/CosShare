import bdd from "../config/bdd.js";

const getAllArticleCosplay = async () => {
    const sql = `SELECT article_cosplay.id_Article, article_cosplay.title, article_cosplay.content, 
    article_cosplay.category_Id, article_cosplay.cree_le, article_cosplay.mise_a_jour, 
    article_cosplay.is_published,
    category_article.label, category_article.description FROM article_cosplay
    INNER JOIN category_article ON article_cosplay.category_Id = category_article.id_Category`;
    const [rows] = await bdd.query(sql);
    return rows;
};

const getArticleCosplayById = async (id_Article) => {
    const sql = `SELECT article_cosplay.id_Article, article_cosplay.title, article_cosplay.content,
    article_cosplay.category_Id, article_cosplay.cree_le, article_cosplay.mise_a_jour, article_cosplay.is_published, 
    category_article.label, category_article.description FROM article_cosplay
    INNER JOIN category_article ON article_cosplay.category_Id = category_article.id_Category
    WHERE article_cosplay.id_Article = ?`;
    const [rows] = await bdd.query(sql, [id_Article]);
    return rows[0];
};

const getArticleCosplayByAttributes = async (title, content, category_Id) => {
    const sql = `SELECT article_cosplay.title, article_cosplay.content, article_cosplay.category_Id FROM article_cosplay
    WHERE article_cosplay.title = ? AND article_cosplay.content = ? AND article_cosplay.category_Id = ?`;
    const [rows] = await bdd.query(sql, [title, content, category_Id]);
    return rows[0];
};

const createArticleCosplay = async (title, content, category_Id) => {
    const sql = `INSERT INTO article_cosplay (title, content, category_Id) VALUES (?, ?, ?);`;
    const [result] = await bdd.query(sql, [title, content, category_Id]);
    return result.affectedRows;
};

const updateArticleCosplay = async (id_Article, title, content, category_Id) => {
    const sql = `UPDATE article_cosplay SET article_cosplay.title = ?, 
    article_cosplay.content = ?, article_cosplay.category_Id = ?
    WHERE article_cosplay.id_Article = ?;`;
    const [result] = await bdd.query(sql, [title, content, category_Id, id_Article]);
    return result.affectedRows;
};

const deleteArticleCosplay = async (id_Article) => {
    const sql = `DELETE FROM article_cosplay WHERE article_cosplay.id_Article = ?;`;
    const [result] = await bdd.query(sql, [id_Article]);
    return result.affectedRows;
};

export default {
    getAllArticleCosplay,
    getArticleCosplayById,
    getArticleCosplayByAttributes,
    createArticleCosplay,
    updateArticleCosplay,
    deleteArticleCosplay
}