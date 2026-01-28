import accessoiresCosplayModel from "../model/accessoiresCosplayModel.js";

const getAllAccessoiresCosplay = async (req, res) => {
    try {
        const accessoiresCosplay = await accessoiresCosplayModel.getAllAccessoiresCosplay();
        return res.status(200).json({ message: "Récupération des accessoires cosplay réussie. ✅", accessoiresCosplay });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la tentative de récupération des accessoires cosplay." });

    }
};

const getAccessoireCosplayById = async (req, res) => {
    try {
        const id_Accessoires = req.params.id_Accessoires;
        const accessoireCosplayId = await accessoiresCosplayModel.getAccessoireCosplayById(id_Accessoires);

        if (accessoireCosplayId) {
            return res.status(200).json({ message: "Récupération de l'accessoire cosplay via son ID réussie.✅", accessoireCosplayId });
        } else {
            return res.status(404).json({ message: "Aucune donnée trouvée." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération de l'accessoire cosplay via son ID." });

    }
};

const createAccessoiresCosplay = async (req, res) => {
    try {
        const { accessoire, estimated_cost } = req.body;

        if (!accessoire || !estimated_cost) {
            return res.status(400).json({ message: "Les champs accessoire et estimated_cost sont requis." });
        }

        const existingAccessoireCosplay = await accessoiresCosplayModel.getAccessoiresCosplayByAttributes(accessoire, estimated_cost);

        if (existingAccessoireCosplay) {
            return res.status(409).json({ message: "L'accessoire cosplay existe déjà." });
        }

        const addAccessoireCosplay = await accessoiresCosplayModel.createAccessoiresCosplay(accessoire, estimated_cost);

        if (!addAccessoireCosplay) {
            return res.status(404).json({ message: "Impossible de créer l'accessoire cosplay." });
        } else {
            return res.status(201).json({ message: "Création de l'accessoir cosplay réussie. ✅", addAccessoireCosplay });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la création de l'accessoire cosplay." });

    }
};

const updateAccessoiresCosplay = async (req, res) => {
    try {
        const id_Accessoires = req.params.id_Accessoires;
        const { accessoire, estimated_cost } = req.body;
        const changeAccessoireCosplay = await accessoiresCosplayModel.updateAccessoiresCosplay(id_Accessoires, accessoire, estimated_cost);

        if (changeAccessoireCosplay === 0) {
            return res.status(404).json({ message: "Aucun accessoire cosplay trouvé pour la mise à jour." });
        } else {
            return res.status(200).json({ message: "Mise à jour de l'accessoire cosplay réussie. ✅", changeAccessoireCosplay });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la mise à jour de l'accessoire cosplay." });

    }
};

const deleteAccessoiresCosplay = async (req, res) => {
    try {
        const id_Accessoires = req.params.id_Accessoires;
        const suppAccessoireCosplay = await accessoiresCosplayModel.deleteAccessoiresCosplay(id_Accessoires);

        if (suppAccessoireCosplay === 0) {
            return res.status(404).json({ message: "Aucun accessoire cosplay trouvé pour la suppression." });
        } else {
            return res.status(200).json({ message: "Suppression de l'accessoire cosplay réussie. ✅", suppAccessoireCosplay });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la suppression de l'accessoire cosplay." });

    }
};

export default {
    getAllAccessoiresCosplay,
    getAccessoireCosplayById,
    createAccessoiresCosplay,
    updateAccessoiresCosplay,
    deleteAccessoiresCosplay
}