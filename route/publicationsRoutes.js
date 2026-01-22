import express from "express";
import publicationController from "../controller/publicationController.js";


const router = express.Router();

router.get("/", publicationController.getAllPublications);
router.get("/:id_Publication", publicationController.getPublicationById);
router.post("/", publicationController.createPublication);
router.put("/:id_Publication", publicationController.updatePublication);
router.delete("/:id_Publication", publicationController.deletePublication);

export default router;