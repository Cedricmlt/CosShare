import categoryArticleController from "../controller/categoryArticleController.js";
import express from "express";
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();

router.get("/", checkToken, categoryArticleController.getAllCategoryArticle);
router.get("/:id_Category", checkToken, categoryArticleController.getCategoryArticleById);
router.post("/", checkToken, categoryArticleController.createCategoryArticle);
router.put("/:id_Category", checkToken, categoryArticleController.updateCategoryArticle);
router.delete("/:id_Category", checkToken, categoryArticleController.deleteCategoryArticle);

export default router;