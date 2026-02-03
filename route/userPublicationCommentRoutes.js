import userPublicationCommentController from "../controller/userPublicationCommentController.js";
import checkToken from "../middlewares/checkToken.js";
import express from "express";

const router = express.Router();

router.get("/", checkToken, userPublicationCommentController.getAllUsersPublicationsComment);
router.get("/:users_Id/:publication_Id", checkToken, userPublicationCommentController.getUserPublicationCommentById);
router.post("/", checkToken, userPublicationCommentController.createUserPublicationComment);
router.put("/:users_Id/:publication_Id", checkToken, userPublicationCommentController.updateUserPublicationComment);
router.delete("/:users_Id/:publication_Id", checkToken, userPublicationCommentController.deleteUserPublicationComment);

export default router;