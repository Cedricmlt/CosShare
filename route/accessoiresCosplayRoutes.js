import accessoiresCosplayController from "../controller/accessoiresCosplayController.js";
import checkToken from "../middlewares/checkToken.js";
import express from "express";

const router = express.Router();

router.get("/", checkToken, accessoiresCosplayController.getAllAccessoiresCosplay);
router.get("/:id_Accessoires", checkToken, accessoiresCosplayController.getAccessoireCosplayById);
router.post("/", checkToken, accessoiresCosplayController.createAccessoiresCosplay);
router.put("/:id_Accessoires", checkToken, accessoiresCosplayController.updateAccessoiresCosplay);
router.delete("/:id_Accessoires", checkToken, accessoiresCosplayController.deleteAccessoiresCosplay);

export default router;