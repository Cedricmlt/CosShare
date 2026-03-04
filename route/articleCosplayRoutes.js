import articleCosplayController from "../controller/articleCosplayController.js";
import express from "express";
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();

router.get("/", checkToken, articleCosplayController.getAllArticleCosplay);
router.get("/:id_Article", checkToken, articleCosplayController.getArticleCosplayById);
router.post("/", checkToken, articleCosplayController.createArticleCosplay);
router.put("/:id_Article", checkToken, articleCosplayController.updateArticleCosplay);
router.delete("/:id_Article", checkToken, articleCosplayController.deleteArticleCosplay);

export default router;