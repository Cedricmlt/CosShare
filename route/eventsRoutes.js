import eventsController from "../controller/eventsController.js";
import express from "express";

const router = express.Router();

router.get("/", eventsController.getAllEvents);
router.get("/:id_Event", eventsController.getEventById);
router.post("/", eventsController.createEvent);
router.put("/:id_Event", eventsController.updateEvent);
router.delete("/:id_Event", eventsController.deleteEvent);

export default router;