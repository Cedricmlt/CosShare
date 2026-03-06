import mediaCosplayController from "../controller/mediaCosplayController.js";
import express from "express";
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();

router.get("/", checkToken, mediaCosplayController.getAllMediaCosplay);
router.get("/:id_Media", checkToken, mediaCosplayController.getMediaCosplayById);
router.post("/", checkToken, mediaCosplayController.createMediaCosplay);
router.put("/:id_Media", checkToken, mediaCosplayController.updateMediaCosplay);
router.delete("/:id_Media", checkToken, mediaCosplayController.deleteMediaCosplay);

export default router;