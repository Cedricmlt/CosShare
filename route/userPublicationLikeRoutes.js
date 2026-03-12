import userPublicationLikeController from "../controller/userPublicationLikeController.js";
import checkToken from "../middlewares/checkToken.js";
import express from "express";

const router = express.Router();

router.get("/", checkToken, userPublicationLikeController.getAllusersPublicationsLikes);
router.get("/count/:publication_Id", userPublicationLikeController.countLikesByPublication);
router.get("/likers/:publication_Id", userPublicationLikeController.getLikersByPublication);
router.get("/:users_Id/:publication_Id", checkToken, userPublicationLikeController.getUserPublicationLikeById);
router.post("/", checkToken, userPublicationLikeController.createUserPublicationLike);
router.delete("/:users_Id/:publication_Id", checkToken, userPublicationLikeController.deleteUserPublicationlike);

export default router;