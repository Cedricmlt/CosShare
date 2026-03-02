import mediaActualityController from "../controller/mediaActualityController.js";
import express from "express";

const router = express.Router();

router.get("/", mediaActualityController.getAllMediaActuality);
router.get("/:id_media_actuality", mediaActualityController.getMediaActualityById);
router.post("/", mediaActualityController.createMediaActuality);
router.put("/:id_media_actuality/", mediaActualityController.updateMediaActuality);
router.delete("/:id_media_actuality", mediaActualityController.deleteMediaActuality);

export default router;