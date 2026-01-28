import fabricationCosplayController from "../controller/fabricationCosplayController.js";
import checkToken from "../middlewares/checkToken.js";
import express from "express";

const router = express.Router();

router.get("/", checkToken, fabricationCosplayController.getAllFabricationsCosplay);
router.get("/:id_Fabrication", checkToken, fabricationCosplayController.getFabricationCosplayById);
router.post("/", checkToken, fabricationCosplayController.createFabricationCosplay);
router.put("/:id_Fabrication", checkToken, fabricationCosplayController.updateFabricationCosplay);
router.delete("/:id_Fabrication", checkToken, fabricationCosplayController.deleteFabricationCosplay);

export default router;