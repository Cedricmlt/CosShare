import notificationsController from "../controller/notificationsController.js";
import express from "express";

const router = express.Router();

router.get("/", notificationsController.getAllNotifications);
router.get("/:id_Notification", notificationsController.getNotificationsById);
router.post("/", notificationsController.createNotifications);
router.put("/:id_Notification", notificationsController.updateNotifications);
router.delete("/:id_Notification", notificationsController.deleteNotifications);

export default router;