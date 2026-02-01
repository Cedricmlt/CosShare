import userPublicationLikeController from "../controller/userPublicationLikeController.js";
import checkToken from "../middlewares/checkToken.js";
import express from "express";

const router = express.Router();

router.get("/", checkToken, userPublicationLikeController.getAllusersPublicationsLikes);
router.get("/:users_Id/:publication_Id", checkToken, userPublicationLikeController.getUserPublicationLikeById);
router.post("/", checkToken, userPublicationLikeController.createUserPublicationLike);
router.delete("/:users_Id/:publication_Id", checkToken, userPublicationLikeController.deleteUserPublicationlike);

export default router;