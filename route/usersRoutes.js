import usersController from "../controller/usersController.js";
import express from "express";
import checkToken from "../middlewares/checkToken.js";
import { upload } from "../config/multer.js";


const router = express.Router();

// Routes statiques:
router.get("/search", usersController.searchUser);
router.post("/login", usersController.login);
router.post("/register", usersController.createUser);
router.post("/forgot-password", usersController.forgotPassword);
router.post("/reset-password/:token", usersController.resetPassword);

// Routes spécifiques:
router.put("/:id_Users/commentaire", checkToken, usersController.updateCommentaire);
router.put("/:id_Users/role", checkToken, usersController.updateRole);
router.put("/:id_Users/photo", checkToken, upload.single("photo"), usersController.updatePhoto);

// Routes paramétrées:
router.get("/", checkToken, usersController.getAllUsers);
router.get("/:id_Users", checkToken, usersController.getUserById);
router.get("/email/user", checkToken, usersController.getUserByEmail);
router.put("/:id_Users", checkToken, usersController.updateUser);
router.delete("/:id_Users", checkToken, usersController.deleteUser);

export default router;