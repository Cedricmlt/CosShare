import roleController from "../controller/roleController.js";
import checkToken from "../middlewares/checkToken.js";
import express from "express";

const router = express.Router();

router.get("/", checkToken, roleController.getAllRoles);
router.get("/:id_Role", checkToken, roleController.getRoleById);
router.post("/", checkToken, roleController.createRole);
router.put("/:id_Role", checkToken, roleController.updateRole);
router.delete("/:id_Role", checkToken, roleController.deleteRole);

export default router;