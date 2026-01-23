import usersRoleController from "../controller/usersRoleController.js";
import checkToken from "../middlewares/checkToken.js";
import express from "express";

const router = express.Router();

router.get("/", checkToken, usersRoleController.getAllUsersRoles);
router.get("/:users_Id/:role_Id", checkToken, usersRoleController.getUserRoleById);
router.get("/user/:users_Id/role", checkToken, usersRoleController.getUserRolesByUserId);

router.post("/", checkToken, usersRoleController.createUserRole);
router.put("/:users_Id/:role_Id", checkToken, usersRoleController.updateUserRole);
router.delete("/:users_Id/:role_Id", checkToken, usersRoleController.deleteUserRole);

export default router;