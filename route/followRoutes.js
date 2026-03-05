import followController from "../controller/followController.js";
import express from "express";

const router = express.Router();

router.get("/", followController.getAllFollow);
router.get("/:id_Follower/:id_Followed", followController.getFollowById);
router.post("/", followController.createFollow);
router.put("/:id_Follower/:id_Followed", followController.updateFollow);
router.delete("/:id_Follower/:id_Followed", followController.deleteFollow);

export default router;
