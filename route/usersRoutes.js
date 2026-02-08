import express from "express";
import checkToken from "../middlewares/checkToken.js";
import usersController from "../controller/usersController.js";


const router = express.Router();

// Routes statiques:
router.get("/search", usersController.searchUser);
router.post("/login", usersController.login);
router.post("/register", usersController.createUser);
router.post("/forgot-password", usersController.forgotPassword);
router.post("/reset-password/:token", usersController.resetPassword);

// Routes paramétrées:
router.get("/", checkToken, usersController.getAllUsers);
router.get("/:id_Users", checkToken, usersController.getUserById);
router.get("/email/user", checkToken, usersController.getUserByEmail);
router.put("/:id_Users", checkToken, usersController.updateUser);
router.delete("/:id_Users", checkToken, usersController.deleteUser);

export default router;