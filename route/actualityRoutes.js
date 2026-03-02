import actualityController from "../controller/actualityController.js";
import express from "express";
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();

router.get("/", checkToken, actualityController.getAllActuality);
router.get("/:id_Actuality", checkToken, actualityController.getActualityById);
router.post("/", checkToken, actualityController.createActuality);
router.put("/:id_Actuality", checkToken, actualityController.updateActuality);
router.delete("/:id_Actuality", checkToken, actualityController.deleteActuality);

export default router;