import materiauxCosplayModel from "../model/materiauxCosplayModel.js";

const getAllMateriauxCosplay = async (req, res) => {
    try {
        const materiauxCosplay = await materiauxCosplayModel.getAllMateriauxCosplay();
        return res.status(200).json({ message: "Récupération des données materiaux cosplay réussie. ✅", materiauxCosplay });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des données matériaux cosplay." });

    }
};

const getMateriauxCosplayById = async (req, res) => {
    try {
        const id_Materiaux = req.params.id_Materiaux;
        const materiauxCosplayId = await materiauxCosplayModel.getMateriauxCosplayById(id_Materiaux);

        if (materiauxCosplayId) {
            return res.status(200).json({ message: "Récupération des données materiaux cosplay via l'ID réussie. ✅", materiauxCosplayId });
        } else {
            return res.status(404).json({ message: "Aucune donnée trouvée." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des données materiaux cosplay." });

    }
};

const createMateriauxCosplay = async (req, res) => {
    try {
        const { nom, description, estimated_cost } = req.body;

        if (!nom || !description || !estimated_cost) {
            return res.status(400).json({ message: "Les champs nom, description, estimated_cost sont requis." });
        }

        const existingMateriauxCosplay = await materiauxCosplayModel.getMateriauxCosplayByAttributes(nom, description, estimated_cost);

        if (existingMateriauxCosplay) {
            return res.status(409).json({ message: "Les données materiaux cosplay existent déjà." });
        }

        const addMateriauxCosplay = await materiauxCosplayModel.createMateriauxCosplay(nom, description, estimated_cost);

        if (!addMateriauxCosplay) {
            return res.status(404).json({ message: "Impossible de créer un materiaux cosplay." });
        } else {
            return res.status(201).json({ message: "Création d'un materiaux cosplay réussie. ✅", addMateriauxCosplay });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la création d'un materiaux cosplay." });

    }
};

const updateMateriauxCosplay = async (req, res) => {
    try {
        const id_Materiaux = req.params.id_Materiaux;
        const { nom, description, estimated_cost } = req.body;
        const changeMateriauxCosplay = await materiauxCosplayModel.updateMateriauxCosplay(id_Materiaux, nom, description, estimated_cost);

        if (changeMateriauxCosplay === 0) {
            return res.status(404).json({ message: "Aucune donnée trouvée pour la mise à jour." });
        } else {
            return res.status(200).json({ message: "Mise à jour des données materiaux cosplay réussie. ✅", changeMateriauxCosplay });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la mise à jour du materiaux cosplay." });

    }
};

const deleteMateriauxCosplay = async (req, res) => {
    try {
        const id_Materiaux = req.params.id_Materiaux;
        const suppMateriauxCosplay = await materiauxCosplayModel.deleteMateriauxCosplay(id_Materiaux);

        if (suppMateriauxCosplay === 0) {
            return res.status(404).json({ message: "Aucune donnée trouvée pour la suppression." });
        } else {
            return res.status(200).json({ message: "Suppression des données du materiaux cosplay réussie. ✅", suppMateriauxCosplay });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la suppression des données du materiaux cosplay." });

    }
};

export default {
    getAllMateriauxCosplay,
    getMateriauxCosplayById,
    createMateriauxCosplay,
    updateMateriauxCosplay,
    deleteMateriauxCosplay
}