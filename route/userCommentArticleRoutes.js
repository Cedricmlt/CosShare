import userCommentArticleController from "../controller/userCommentArticleController.js";
import express from "express";
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();

router.get("/", checkToken, userCommentArticleController.getAllUserCommentArticle);
router.get("/:id_comment_article", checkToken, userCommentArticleController.getUserCommentArticleById);
router.post("/", checkToken, userCommentArticleController.createUserCommentArticle);
router.put("/:id_comment_article", checkToken, userCommentArticleController.updateUserCommentArticle);
router.delete("/:id_comment_article", checkToken, userCommentArticleController.deleteUserCommentArticle);

export default router;