import typeCosplayController from "../controller/typeCosplayController.js";
import checkToken from "../middlewares/checkToken.js";
import express from "express";

const router = express.Router();

router.get("/", checkToken, typeCosplayController.getAllTypesCosplays);
router.get("/:id_Type", checkToken, typeCosplayController.getTypeCosplayById);
router.post("/", checkToken, typeCosplayController.createTypeCosplay);
router.put("/:id_Type", checkToken, typeCosplayController.updateTypeCosplay);
router.delete("/:id_Type", checkToken, typeCosplayController.deleteTypeCosplay);

export default router;