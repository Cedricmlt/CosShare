import userLikeArticleController from "../controller/userLikeArticleController.js";
import express from "express";

const router = express.Router();

router.get("/", userLikeArticleController.getAllUserLikeArticle);
router.get("/:users_Id/:article_Id", userLikeArticleController.getUserLikeArticleById);
router.post("/", userLikeArticleController.createUserLikeArticle);
router.put("/:users_Id/:article_Id", userLikeArticleController.updateUserLikeArticle);
router.delete("/:users_Id/:article_Id", userLikeArticleController.deleteUserLikeArticle);

export default router;