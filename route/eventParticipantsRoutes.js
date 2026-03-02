import eventParticipantsController from "../controller/eventParticipantsController.js";
import express from "express";
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();

router.get("/", checkToken, eventParticipantsController.getAllEventParticipants);
router.get("/:conv_event_Id/:users_Id", checkToken, eventParticipantsController.getEventParticipantsById);
router.post("/", checkToken, eventParticipantsController.createEventParticipants);
router.put("/:conv_event_Id/:users_Id", checkToken, eventParticipantsController.updateEventParticipants);
router.delete("/:conv_event_Id/:users_Id", checkToken, eventParticipantsController.deleteEventParticipants);

export default router;