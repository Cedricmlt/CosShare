import bdd from "../config/bdd.js";

const getAllUserCommentArticle = async () => {
    const sql = `SELECT user_comment_article.id_comment_article, user_comment_article.users_Id, 
    user_comment_article.article_Id, user_comment_article.commentaire, user_comment_article.is_notified,
    article_cosplay.title, article_cosplay.content, article_cosplay.category_Id,
    users.prenom, users.nom, users.pseudo FROM user_comment_article
    INNER JOIN article_cosplay ON user_comment_article.article_Id = article_cosplay.id_Article
    INNER JOIN users ON user_comment_article.users_Id = users.id_Users`;
    const [rows] = await bdd.query(sql);
    return rows;
};

const getUserCommentArticleById = async (id_comment_article) => {
    const sql = `SELECT user_comment_article.id_comment_article, user_comment_article.users_Id, 
    user_comment_article.article_Id, user_comment_article.commentaire, user_comment_article.is_notified,
    article_cosplay.title, article_cosplay.content, article_cosplay.category_Id,
    users.prenom, users.nom, users.pseudo FROM user_comment_article
    INNER JOIN article_cosplay ON user_comment_article.article_Id = article_cosplay.id_Article
    INNER JOIN users ON user_comment_article.users_Id = users.id_Users
    WHERE user_comment_article.id_comment_article = ?`;
    const [rows] = await bdd.query(sql, [id_comment_article]);
    return rows[0];
};

const getUserCommentArticleByAttributes = async (users_Id, article_Id, commentaire) => {
    const sql = `SELECT user_comment_article.users_Id, user_comment_article.article_Id,
    user_comment_article.commentaire FROM user_comment_article
    WHERE user_comment_article.users_Id = ? AND user_comment_article.article_Id = ?
    AND user_comment_article.commentaire = ?`;
    const [rows] = await bdd.query(sql, [users_Id, article_Id, commentaire]);
    return rows[0];
};

const createUserCommentArticle = async (users_Id, article_Id, commentaire) => {
    const sql = `INSERT INTO user_comment_article (users_Id, article_Id, commentaire) VALUES (?, ?, ?);`;
    const [result] = await bdd.query(sql, [users_Id, article_Id, commentaire]);
    return result.affectedRows;
};

const updateUserCommentArticle = async (id_comment_article, users_Id, article_Id, commentaire, is_notified) => {
    const sql = `UPDATE user_comment_article SET user_comment_article.users_Id = ?, user_comment_article.article_Id = ?,
    user_comment_article.commentaire = ?, user_comment_article.is_notified = ?
    WHERE id_comment_article = ?;`;
    const [result] = await bdd.query(sql, [users_Id, article_Id, commentaire, is_notified, id_comment_article]);
    return result.affectedRows;
};

const deleteUserCommentArticle = async (id_comment_article) => {
    const sql = `DELETE FROM user_comment_article WHERE user_comment_article.id_comment_article = ?;`;
    const [result] = await bdd.query(sql, [id_comment_article]);
    return result.affectedRows;
};

export default {
    getAllUserCommentArticle,
    getUserCommentArticleById,
    getUserCommentArticleByAttributes,
    createUserCommentArticle,
    updateUserCommentArticle,
    deleteUserCommentArticle
}