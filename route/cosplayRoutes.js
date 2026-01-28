import cosplayController from "../controller/cosplayController.js";
import checkToken from "../middlewares/checkToken.js";
import express from "express";

const router = express.Router();

router.get("/", checkToken, cosplayController.getAllCosplays);
router.get("/:id_Cosplay", checkToken, cosplayController.getCosplayById);
router.post("/", checkToken, cosplayController.createCosplay);
router.put("/:id_Cosplay", checkToken, cosplayController.updateCosplay);
router.delete("/:id_Cosplay", checkToken, cosplayController.deleteCosplay);

export default router;