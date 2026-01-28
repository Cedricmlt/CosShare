import fabricationCosplayModel from "../model/fabricationCosplayModel.js";

const getAllFabricationsCosplay = async (req, res) => {
    try {
        const fabricationsCosplay = await fabricationCosplayModel.getAllFabricationsCosplay();
        return res.status(200).json({ message: "Récupération des données fabrication cosplay réussie. ✅", fabricationsCosplay });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des données fabrication cosplay." });

    }
};

const getFabricationCosplayById = async (req, res) => {
    try {
        const id_Fabrication = req.params.id_Fabrication;
        const fabricationCosplayId = await fabricationCosplayModel.getFabricationCosplayById(id_Fabrication);

        if (fabricationCosplayId) {
            return res.status(200).json({ message: "Récupération des données fabrication cosplay via son ID réussie. ✅", fabricationCosplayId });
        } else {
            return res.status(404).json({ message: "Aucune donnée trouvée." });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des données fabrication cosplay via l'ID." });

    }
};

const createFabricationCosplay = async (req, res) => {
    try {
        const { libelle, estimated_cost } = req.body;

        if (!libelle || !estimated_cost) {
            return res.status(400).json({ message: "Les champs libelle et estimated_cost sont requis." });
        }

        const existingFabricationCosplay = await fabricationCosplayModel.getFabricationCosplayByAttributes(libelle, estimated_cost);

        if (existingFabricationCosplay) {
            return res.status(409).json({ message: "Les données fabrication cosplay existent déjà." });
        }

        const addFabricationCosplay = await fabricationCosplayModel.createFabricationCosplay(libelle, estimated_cost);

        if (!addFabricationCosplay) {
            return res.status(404).json({ message: "Impossible de créer les données fabrication cosplay" });
        } else {
            return res.status(201).json({ message: "Création des données fabrication cosplay réussie. ✅", addFabricationCosplay });
        }
    } catch (error) {
        console.error(error);
        return res.status({ message: "Un problème est survenu lors de la création des données fabrication cosplay." });

    }
};

const updateFabricationCosplay = async (req, res) => {
    try {
        const id_Fabrication = req.params.id_Fabrication;
        const { libelle, estimated_cost } = req.body;
        const changeFabricationCosplay = await fabricationCosplayModel.updateFabricationCosplay(id_Fabrication, libelle, estimated_cost);

        if (changeFabricationCosplay === 0) {
            return res.status(404).json({ message: "Aucun données trouvée pour la mise à jour." });
        } else {
            return res.status(200).json({ message: "Mise à jour des données fabrication cosplay réussie. ✅", changeFabricationCosplay });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la mise à jour des données fabrication cosplay." });

    }
};

const deleteFabricationCosplay = async (req, res) => {
    try {
        const id_Fabrication = req.params.id_Fabrication;
        const suppFabricationCosplay = await fabricationCosplayModel.deleteFabricationCosplay(id_Fabrication);

        if (suppFabricationCosplay === 0) {
            return res.status(404).json({ message: "Aucune données trouvée pour la suppression." });
        } else {
            return res.status(200).json({ message: "Suppression des données fabrication cosplay réussie. ✅", suppFabricationCosplay });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la suppression des données fabrication cosplay." });

    }
};

export default {
    getAllFabricationsCosplay,
    getFabricationCosplayById,
    createFabricationCosplay,
    updateFabricationCosplay,
    deleteFabricationCosplay
}