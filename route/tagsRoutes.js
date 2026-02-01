import tagsController from "../controller/tagsController.js";
import checkToken from "../middlewares/checkToken.js";
import express from "express";

const router = express.Router();

router.get("/", checkToken, tagsController.getAllTags);
router.get("/:id_Tag", checkToken, tagsController.getTagById);
router.post("/", checkToken, tagsController.createTag);
router.put("/:id_Tag", checkToken, tagsController.updateTag);
router.delete("/:id_Tag", checkToken, tagsController.deleteTag);

export default router;