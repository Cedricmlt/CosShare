import conversationController from "../controller/conversationController.js";
import express from "express";
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();

router.get("/", checkToken, conversationController.getAllConversations);
router.get("/:id_Conversation", checkToken, conversationController.getConversationById);
router.post("/", checkToken, conversationController.createConversation);
router.put("/:id_Conversation", checkToken, conversationController.updateConversation);
router.delete("/:id_Conversation", checkToken, conversationController.deleteConversation);

export default router;