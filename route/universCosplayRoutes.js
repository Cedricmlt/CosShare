import universCosplayController from "../controller/universCosplayController.js";
import express from "express";

const router = express.Router();

router.get("/", universCosplayController.getAllUniversCosplays);
router.get("/:id_Univers", universCosplayController.getUniversCosplayById);
router.post("/", universCosplayController.createUniversCosplay);
router.put("/:id_Univers", universCosplayController.updateUniversCosplay);
router.delete("/:id_Univers", universCosplayController.deleteUniversCosplay);

export default router;