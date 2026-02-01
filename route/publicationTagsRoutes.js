import publicationTagsController from "../controller/publicationTagsController.js";
import checkToken from "../middlewares/checkToken.js";
import express from "express";

const router = express.Router();

router.get("/", checkToken, publicationTagsController.getAllPublicationsTags);
router.get("/:publication_Id/:tag_Id", checkToken, publicationTagsController.getPublicationTagById);
router.post("/", checkToken, publicationTagsController.createPublicationTags);
router.put("/:publication_Id/:tag_Id", checkToken, publicationTagsController.updatePublicationTags);
router.delete("/:publication_Id/:tag_Id", checkToken, publicationTagsController.deletePublicationTags);

export default router;