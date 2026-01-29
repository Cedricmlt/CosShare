import mediaInPublicationController from "../controller/mediaInPublicationController.js";
import checkToken from "../middlewares/checkToken.js";
import express from "express";

const router = express.Router();

router.get("/", checkToken, mediaInPublicationController.getAllMediasInPublication);
router.get("/:id_Media", checkToken, mediaInPublicationController.getMediaInPublicationById);
router.post("/", checkToken, mediaInPublicationController.createMediaInPublication);
router.put("/:id_Media", checkToken, mediaInPublicationController.updateMediaInPublication);
router.delete("/:id_Media", checkToken, mediaInPublicationController.deleteMediaInPublication);

export default router;