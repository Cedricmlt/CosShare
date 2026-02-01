import universCosplayController from "../controller/universCosplayController.js";
import checkToken from "../middlewares/checkToken.js";
import express from "express";

const router = express.Router();

router.get("/", checkToken, universCosplayController.getAllUniversCosplays);
router.get("/:id_Univers", checkToken, universCosplayController.getUniversCosplayById);
router.post("/", checkToken, universCosplayController.createUniversCosplay);
router.put("/:id_Univers", checkToken, universCosplayController.updateUniversCosplay);
router.delete("/:id_Univers", checkToken, universCosplayController.deleteUniversCosplay);

export default router;