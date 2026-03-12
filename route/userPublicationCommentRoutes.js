import userPublicationCommentController from "../controller/userPublicationCommentController.js";
import checkToken from "../middlewares/checkToken.js";
import express from "express";

const router = express.Router();

router.get("/", checkToken, userPublicationCommentController.getAllUsersPublicationsComment);
router.get("/publication/:publication_Id", userPublicationCommentController.getCommentsByPublication);
router.get("/:users_Id/:publication_Id", checkToken, userPublicationCommentController.getUserPublicationCommentById);
router.post("/", checkToken, userPublicationCommentController.createUserPublicationComment);
router.put("/:id_comment", checkToken, userPublicationCommentController.updateUserPublicationComment);
router.delete("/:id_comment", checkToken, userPublicationCommentController.deleteUserPublicationComment);

export default router;