import publicationController from "../controller/publicationController.js";
import checkToken from "../middlewares/checkToken.js";
import express from "express";


const router = express.Router();

router.get("/", checkToken, publicationController.getAllPublications);
router.get("/:id_Publication", checkToken, publicationController.getPublicationById);
router.post("/", checkToken, publicationController.createPublication);
router.put("/:id_Publication", checkToken, publicationController.updatePublication);
router.delete("/:id_Publication", checkToken, publicationController.deletePublication);

export default router;