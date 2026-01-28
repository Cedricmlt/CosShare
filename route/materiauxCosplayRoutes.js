import materiauxCosplayController from "../controller/materiauxCosplayController.js";
import checkToken from "../middlewares/checkToken.js";
import express from "express";

const router = express.Router();

router.get("/", checkToken, materiauxCosplayController.getAllMateriauxCosplay);
router.get("/:id_Materiaux", checkToken, materiauxCosplayController.getMateriauxCosplayById);
router.post("/", checkToken, materiauxCosplayController.createMateriauxCosplay);
router.put("/:id_Materiaux", checkToken, materiauxCosplayController.updateMateriauxCosplay);
router.delete("/:id_Materiaux", checkToken, materiauxCosplayController.deleteMateriauxCosplay);

export default router;
