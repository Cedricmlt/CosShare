import { log } from "console";
import usersRoleModel from "../model/usersRoleModel.js";

const getAllUsersRoles = async (req, res) => {
    try {
        const usersRoles = await usersRoleModel.getAllUsersRoles();
        return res.status(200).json({ message: "Récupération des roles associés aux utilisateurs réussie. ✅", usersRoles });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des roles associés." });

    }
};

const getUserRoleById = async (req, res) => {
    try {
        const { users_Id, role_Id } = req.params;
        const userRole = await usersRoleModel.getUserRoleById(users_Id, role_Id);

        if (userRole) {
            return res.status(200).json({ message: "Récupération du role associé via son ID réussie. ✅", userRole });
        } else {
            return res.status(404).json({ message: "Aucun role associé trouvé." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération du role associé." });

    }
};

const getUserRolesByUserId = async (req, res) => {
    try {
        const { users_Id } = req.params;

        if (!users_Id) {
            return res.status(400).json({ message: "Le champ users_Id est requis." });
        }

        const showIdUserForUserRole = await usersRoleModel.getUserRoleOfUserId(users_Id);

        if (showIdUserForUserRole) {

            return res.status(200).json({ message: "Récupération du role attribué via l'ID de l'utilisateur réussie. ✅", showIdUserForUserRole });
        } else {
            return res.status(404).json({ message: "Aucun rôle trouvé pour cet utilisateur." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des rôles de l'utilisateur via son ID." });
    }
};


const createUserRole = async (req, res) => {
    try {
        const { users_Id, role_Id } = req.body;

        if (!users_Id || !role_Id) {
            return res.status(400).json({ message: "Les champs identifiants users_Id et role_Id sont requis." });
        }

        // Vérifie si l'utilisateur a déjà un rôle
        const existingUserRole = await usersRoleModel.getUserRoleByAttributes(users_Id, role_Id);

        if (existingUserRole) {
            return res.status(409).json({ message: "Un rôle est déjà associé à cet utilisateur." });
        }

        const newUserRole = await usersRoleModel.createUserRole(users_Id, role_Id);

        if (!newUserRole) {
            return res.status(404).json({ message: "Impossible d'associer le role à l'utilisateur." });
        } else {
            return res.status(201).json({ message: "Association du role à l'utilisateur réussie. ✅", newUserRole });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de l'association du role à l'utilisateur." });

    }
};

const updateUserRole = async (req, res) => {
    try {
        const { users_Id, role_Id } = req.params;

        const updateUserWithRole = await usersRoleModel.updateUserRole(users_Id, role_Id);

        if (updateUserWithRole === 0) {
            return res.status(404).json({ message: "Aucun role associé trouvé pour la mise à jour." });
        } else {
            return res.status(200).json({ message: "Mise à jour de l'association du role réussie. ✅", updateUserWithRole });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la mise à jour de l'association du role." });

    }
};

const deleteUserRole = async (req, res) => {
    try {
        const { users_Id, role_Id } = req.params;
        const deleteUserWithRole = await usersRoleModel.deleteUserRole(users_Id, role_Id);

        if (deleteUserWithRole === 0) {
            return res.status(404).json({ message: "Aucun role associé trouvé pour la suppression." });
        } else {
            return res.status(200).json({ message: "Suppression de l'association du role réussie.", deleteUserWithRole });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la suppression de l'association du role." });

    }
};

export default {
    getAllUsersRoles,
    getUserRoleById,
    getUserRolesByUserId,
    createUserRole,
    updateUserRole,
    deleteUserRole
};