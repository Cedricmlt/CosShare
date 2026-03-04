import conversationUserController from "../controller/conversationUserController.js";
import express from "express";
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();

router.get("/", checkToken, conversationUserController.getAllConversationUser);
router.get("/:conversation_Id/:users_Id", checkToken, conversationUserController.getConversationUserById);
router.post("/", checkToken, conversationUserController.createConversationUser);
router.put("/:old_conversation_Id/:old_users_Id", checkToken, conversationUserController.updateConversationUser);
router.delete("/:conversation_Id/:users_Id", checkToken, conversationUserController.deleteConversationUser);

export default router;