import cosplayEstimationController from "../controller/cosplayEstimationController.js";
import checkToken from "../middlewares/checkToken.js";
import express from "express";

const router = express.Router();

router.get("/", checkToken, cosplayEstimationController.getAllCosplayEstimations);
router.get("/:id_Cosplay_Estimation", checkToken, cosplayEstimationController.getCosplayEstimationById);
router.post("/", checkToken, cosplayEstimationController.createCosplayEstimation);
router.put("/:id_Cosplay_Estimation", checkToken, cosplayEstimationController.updateCosplayEstimation);
router.delete("/:id_Cosplay_Estimation", checkToken, cosplayEstimationController.deleteCosplayEstimation);

export default router;