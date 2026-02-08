import e from "express";
import cosplayModel from "../model/cosplayModel.js";

const getAllCosplays = async (req, res) => {
    try {
        const cosplays = await cosplayModel.getAllCosplays();
        return res.status(200).json({ message: "Récupération de toutes les données cosplay réussie. ✅", cosplays });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des données cosplay." });

    }
};

const getCosplayById = async (req, res) => {
    try {
        const id_Cosplay = req.params.id_Cosplay;
        const cosplayId = await cosplayModel.getCosplayById(id_Cosplay);

        if (cosplayId) {
            return res.status(200).json({ message: "Récupération des données cosplay via l'ID réussie. ✅", cosplayId });
        } else {
            return res.status(404).json({ message: "Aucune donnée trouvée." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des données cosplay." });

    }
};

const createCosplay = async (req, res) => {
    try {
        const { users_Id, title, description, univers_Id, type_Id, estimated_cost } = req.body;
        if (!users_Id || !title || !description || !univers_Id || !type_Id || !estimated_cost) {
            return res.status(400).json({ 
                message: "Les champs users_Id, title, description, univers_Id, type_Id, estimated_cost sont requis." });
        }

        const existingCosplay = await cosplayModel.getCosplayByAttributes(users_Id, title, univers_Id, type_Id);

        if (existingCosplay.length > 0) {
            return res.status(409).json({ message: "Les données cosplay existent déjà." });
        }

        const addCosplay = await cosplayModel.createCosplay(users_Id, title, description, univers_Id, type_Id, estimated_cost);

        if (!addCosplay) {
            return res.status(404).json({ message: "Impossible de créer un cosplay." });
        } else {
            return res.status(201).json({ message: "Création du cosplay réussie. ✅", addCosplay });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la création du cosplay." });

    }
};

const updateCosplay = async (req, res) => {
    try {
        const id_Cosplay = req.params.id_Cosplay;
        const { users_Id, title, description, univers_Id, type_Id, estimated_cost } = req.body;
        const changeCosplay = await cosplayModel.updateCosplay(id_Cosplay, users_Id, title, description, univers_Id, type_Id, estimated_cost);

        if (changeCosplay === 0) {
            return res.status(404).json({ message: "Aucun cosplay trouvé pour la mise à jour." });
        } else {
            return res.status(200).json({ message: "Mise à jour du cosplay réussie. ✅", changeCosplay });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la mise à jour du cosplay." });

    }
};

const deleteCosplay = async (req, res) => {
    try {
        const id_Cosplay = req.params.id_Cosplay;
        const suppCosplay = await cosplayModel.deleteCosplay(id_Cosplay);

        if (suppCosplay === 0) {
            return res.status(404).json({ message: "Aucun cosplay trouvé pour la suppression." });
        } else {
            return res.status(200).json({ message: "Suppression du cosplay réussie. ✅", suppCosplay });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la suppression du cosplay." });

    }
};

export default {
    getAllCosplays,
    getCosplayById,
    createCosplay,
    updateCosplay,
    deleteCosplay
}