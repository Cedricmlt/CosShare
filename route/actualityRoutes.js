import actualityController from "../controller/actualityController.js";
import express from "express";

const router = express.Router();

router.get("/", actualityController.getAllActuality);
router.get("/:id_Actuality", actualityController.getActualityById);
router.post("/", actualityController.createActuality);
router.put("/:id_Actuality", actualityController.updateActuality);
router.delete("/:id_Actuality", actualityController.deleteActuality);

export default router;