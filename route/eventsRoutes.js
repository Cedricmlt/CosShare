import eventsController from "../controller/eventsController.js";
import express from "express";
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();

router.get("/", checkToken, eventsController.getAllEvents);
router.get("/:id_Event", checkToken, eventsController.getEventById);
router.post("/", checkToken, eventsController.createEvent);
router.put("/:id_Event", checkToken, eventsController.updateEvent);
router.delete("/:id_Event", checkToken, eventsController.deleteEvent);

export default router;