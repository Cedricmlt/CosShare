import outilsCosplayController from "../controller/outilsCosplayController.js";
import checkToken from "../middlewares/checkToken.js";
import express from "express";

const router = express.Router();

router.get("/", checkToken, outilsCosplayController.getAllOutilsCosplay);
router.get("/:id_Outils", checkToken, outilsCosplayController.getOutilCosplayById);
router.post("/", checkToken, outilsCosplayController.createOutilsCosplay);
router.put("/:id_Outils", checkToken, outilsCosplayController.updateOutilsCosplay);
router.delete("/:id_Outils", checkToken, outilsCosplayController.deleteOutilsCosplay);

export default router;