import bdd from "../config/bdd.js";

const getAllUserLikeArticle = async () => {
    const sql = `SELECT user_like_article.users_Id, user_like_article.article_Id, user_like_article.is_notified,
    users.prenom, users.nom, users.pseudo,
    article_cosplay.title, article_cosplay.content FROM user_like_article
    INNER JOIN users ON user_like_article.users_Id = users.id_Users
    INNER JOIN article_cosplay ON user_like_article.article_Id = article_cosplay.id_Article`;
    const [rows] = await bdd.query(sql);
    return rows;
};

const getUserLikeArticleById = async (users_Id, article_Id) => {
    const sql = `SELECT user_like_article.users_Id, user_like_article.article_Id, user_like_article.is_notified,
    users.prenom, users.nom, users.pseudo,
    article_cosplay.title, article_cosplay.content FROM user_like_article
    INNER JOIN users ON user_like_article.users_Id = users.id_Users
    INNER JOIN article_cosplay ON user_like_article.article_Id = article_cosplay.id_Article
    WHERE user_like_article.users_Id = ? AND user_like_article.article_Id = ?`;
    const [rows] = await bdd.query(sql, [users_Id, article_Id]);
    return rows[0];
};

const getUserLikeArticleByAttributes = async (users_Id, article_Id) => {
    const sql = `SELECT user_like_article.users_Id, user_like_article.article_Id FROM user_like_article
    WHERE user_like_article.users_Id = ? AND user_like_article.article_Id = ?`;
    const [rows] = await bdd.query(sql, [users_Id, article_Id]);
    return rows[0];
};

const createUserLikeArticle = async (users_Id, article_Id) => {
    const sql = `INSERT INTO user_like_article (users_Id, article_Id, is_notified) VALUES (?, ?, ?);`;
    const [result] = await bdd.query(sql, [users_Id, article_Id]);
    return result.affectedRows;
};

const updateUserLikeArticle = async (users_Id, article_Id, is_notified) => {
    const sql = `UPDATE user_like_article SET user_like_article.is_notified = ?
    WHERE user_like_article.users_Id = ? AND user_like_article.article_Id = ?;`;
    const [result] = await bdd.query(sql, [is_notified, users_Id, article_Id]);
    return result.affectedRows;
};

const deleteUserLikeArticle = async (users_Id, article_Id) => {
    const sql = `DELETE FROM user_like_article 
    WHERE user_like_article.users_Id = ? AND user_like_article.article_Id = ?;`;
    const [result] = await bdd.query(sql, [users_Id, article_Id]);
    return result.affectedRows;
};

export default {
    getAllUserLikeArticle,
    getUserLikeArticleById,
    getUserLikeArticleByAttributes,
    createUserLikeArticle,
    updateUserLikeArticle,
    deleteUserLikeArticle
}