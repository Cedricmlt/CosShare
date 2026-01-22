import usersModel from "../model/usersModel.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import emailService from "../services/emailService.js";

dotenv.config();

const getAllUsers = async (req, res) => {
    try {
        const users = await usersModel.getAllUsers();
        return res.status(200).json({ message: "Récupération des utilisateurs réussie ✅", users });
    } catch (error) {
        return res.status(500).json({ message: "Impossible de récupérer tous les utilisateurs ❌" });
    }
}

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id_Users;
        const user = await usersModel.getUserById(userId);

        if (user) {
            return res.status(200).json({ message: "Récupération de l'utilisateur via son ID réussie ✅", user });
        } else {
            return res.status(404).json({ message: "Aucun utilisateur associé via l'ID." });
        }
    } catch (error) {
        return res.status(500).json({ message: "Impossible de récupérer l'utilisateur via son ID ❌" });
    }
}

const getUserByEmail = async (req, res) => {

    try {

        const { email_connexion } = req.body;

        if (!email_connexion) {
            return res.status(400).json({ message: "L'e-mail est requis." });
        }

        const userEmail = await usersModel.getUserByEmail(email_connexion);
        if (userEmail) {
            return res.status(200).json({ message: "Récupération de l'utilisateur via son e-mail réussie. ✅", userEmail });
        } else {
            return res.status(404).json({ message: "Echec de la récupération de l'utilisateur via son e-mail." });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Récupération de l'utilisateur impossible." });
    }
}

const searchUser = async (req, res) => {
    try {
        const { searchTerm } = req.query;

        if (!searchTerm) {
            return res.status(400).json({ message: "Veuillez rentrer un terme de recherche." });
        }

        const users = await usersModel.searchUser(searchTerm);

        if (users.length === 0) {
            return res.status(404).json({ message: "Aucun utilisateur ne corresoond à la recherche." });

        } else {
            return res.status(200).json({ message: "Recherche utilisateur réussie. ✅", users });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Impossible de rechercher un utilisateur." });

    }
}

// Demande de réinitialisation de mot de passe
const forgotPassword = async (req, res) => {
    try {
        const { email_connexion } = req.body;

        if (!email_connexion) {
            return res.status(400).json({ message: "L'email est requis." });
        }

        const findUserEmail = await usersModel.getUserByEmail(email_connexion);
        if (!findUserEmail) {
            return res.status(404).json({ message: "Aucun utilisateur trouvé avec cet email." });
        }

        const token = await usersModel.generateResetToken(email_connexion);
        console.log(token);

        const resetLink = `http://localhost:3000/api/reset-password/${token}`;

        await emailService.sendResetEmail(email_connexion, resetLink);

        return res.status(200).json({ message: "Un email de réinitialisation de mot de passe a été envoyé ✅." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Impossible de générer le token de réinitialisation." });
    }
};

// Réinitialisation du mot de passe
const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            return res.status(400).json({ message: "Le token et le nouveau mot de passe sont requis." });
        }

        const userResetToken = await usersModel.getUserByResetToken(token);
        if (!userResetToken) {
            return res.status(400).json({ message: "Token invalide ou expiré." });
        }

        await usersModel.updatePassword(token, password);

        return res.status(200).json({ message: "Mot de passe réinitialisé avec succès ✅." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Réinitialisation du mot de passe impossible." });
    }
};

const createUser = async (req, res) => {
    try {
        const { email_connexion, password, prenom, nom, pseudo } = req.body;
        if (!email_connexion || !password || !prenom || !nom || !pseudo) {
            return res.status(400).json({ message: `Les informations: email_connexion, password, prenom, nom et pseudo sont requis.` });
        }

        const existingUser = await usersModel.getUserByEmail(email_connexion);
        if (existingUser) {
            return res.status(409).json({ message: "L'e-mail existe déjà" });
        }

        const passwordHashed = bcrypt.hashSync(password, 10);

        const type_de_compte = "user";
        const commentaire_interne = null;
        const reset_token = null;
        const email_verified = 0;

        const newUser = await usersModel.createUser(
            email_connexion,
            passwordHashed,
            prenom,
            nom,
            pseudo,
            type_de_compte,
            commentaire_interne,
            reset_token,
            email_verified
        );

        if (newUser) {

            return res.status(201).json({ message: "Création d'un utilisateur réussie ✅", newUser });
        } else {
            return res.status(404).json({ message: "Impossible de créer l'utilisateur ❌." });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Création d'un utilisateur impossible." });
    }
}

const updateUser = async (req, res) => {
    try {
        const id_Users = req.params.id_Users;
        const { email_connexion, password, prenom, nom, pseudo } = req.body;
        const passwordHashed = bcrypt.hashSync(password, 10);
        const updatePeople = await usersModel.updateUser(id_Users, email_connexion, passwordHashed, prenom, nom, pseudo);

        if (updatePeople === 0) {
            return res.status(404).json({ message: "Aucun utilisateur trouvé pour la mise à jour. ❌" });
        } else {
            return res.status(200).json({ message: "Mise à jour de l'utilisateur réussie. ✅", updatePeople });
        }
    } catch (error) {
        return res.status(500).json({ message: "Mise à jour de l'utilisateur impossible." });
    }
}

const deleteUser = async (req, res) => {
    try {
        const id_Users = req.params.id_Users;
        const deletePeople = await usersModel.deleteUser(id_Users);

        if (deletePeople === 0) {
            return res.status(404).json({ message: "Aucun utilisateur associé pour la suppression." });
        } else {
            return res.status(200).json({ message: "Suppression de l'utilisateur réussie. ✅", deletePeople });
        }
    } catch (error) {
        return res.status(500).json({ message: "Suppression impossible de l'utilisateur." });
    }
}

const login = async (req, res) => {
    try {
        const { email_connexion, password } = req.body;

        if (!email_connexion || !password) {
            return res.status(400).json({ message: "L'e-mail et le mot de passe sont requis." });
        }

        const people = await usersModel.getUserByEmail(email_connexion);

        if (!people) {
            return res.status(401).json({ message: "E-mail ou mot de passe incorrect." });
        }

        const isPasswordValid = bcrypt.compareSync(password, people.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "E-mail ou mot de passe incorrect. ❌" });
        }

        const token = jwt.sign(
            {
                id_Users: people.id_Users,
                email_connexion: people.email_connexion
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        return res.status(200).json({ message: "Connexion réussie ✅", token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Connexion de l'utilisateur impossible." });
    }
}

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    searchUser,
    forgotPassword,
    resetPassword,
    createUser,
    updateUser,
    deleteUser,
    login
}