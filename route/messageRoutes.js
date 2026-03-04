import messageController from "../controller/messageController.js";
import express from "express";
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();

router.get("/", checkToken, messageController.getAllMessages);
router.get("/:id_Message", checkToken, messageController.getMessageById);
router.post("/", checkToken, messageController.createMessage);
router.put("/:id_Message", checkToken, messageController.updateMessage);
router.delete("/:id_Message", checkToken, messageController.deleteMessage);

export default router;