import reglagesController from "../controller/reglagesController.js";
import express from "express";

const router = express.Router();

router.get("/", reglagesController.getAllReglages);
router.get("/:id_Reglage", reglagesController.getReglagesById);
router.post("/", reglagesController.createReglages);
router.put("/:id_Reglage", reglagesController.updateReglages);
router.delete("/:id_Reglage", reglagesController.deleteReglages);

export default router;