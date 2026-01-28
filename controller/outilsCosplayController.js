import outilsCosplayModel from "../model/outilsCosplayModel.js";

const getAllOutilsCosplay = async (req, res) => {
    try {
        const outilsCosplay = await outilsCosplayModel.getAllOutilsCosplay();
        return res.status(200).json({ message: "Récupération des outils cosplay réussie. ✅", outilsCosplay });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: " Un problème est survenu lors de la récupération des outils cosplay." });

    }
};

const getOutilCosplayById = async (req, res) => {
    try {
        const id_Outils = req.params.id_Outils;
        const outilCosplayId = await outilsCosplayModel.getOutilCosplayById(id_Outils);

        if (outilCosplayId) {
            return res.status(200).json({ message: "Récupération de l'outils cosplay via son ID réussie. ✅", outilCosplayId });
        } else {
            return res.status(404).json({ message: "Aucun outils cosplay trouvé." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération de l'outils cosplay via son ID." });

    }
};

const createOutilsCosplay = async (req, res) => {
    try {
        const { maquillage, appareils, lentilles_de_contact, estimated_cost } = req.body;

        if (!maquillage || !appareils || !lentilles_de_contact || !estimated_cost) {
            return res.status(400).json({ message: "Les champs maquillage, appareils, lentilles_de_contact, estimated_cost sont requis." });
        }

        const existingOutilsCosplay = await outilsCosplayModel.getOutilCosplayByAttributes(maquillage, appareils, lentilles_de_contact, estimated_cost);

        if (existingOutilsCosplay) {
            return res.status(409).json({ message: "Un outil cosplay avec ces attributs existe déjà." });
        }


        const addOutilsCosplay = await outilsCosplayModel.createOutilsCosplay(maquillage, appareils, lentilles_de_contact, estimated_cost);

        if (!addOutilsCosplay) {
            return res.status(404).json({ message: "Impossible de créer un outils cosplay." });
        } else {
            return res.status(201).json({ message: "Création de l'outil cosplay réussie. ✅", addOutilsCosplay });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la création de l'outil cosplay." });

    }
};

const updateOutilsCosplay = async (req, res) => {
    try {
        const id_Outils = req.params.id_Outils;
        const { maquillage, appareils, lentilles_de_contact, estimated_cost } = req.body;
        const changeOutilsCosplay = await outilsCosplayModel.updateOutilsCosplay(id_Outils, maquillage, appareils, lentilles_de_contact, estimated_cost);

        if (changeOutilsCosplay === 0) {
            return res.status(404).json({ message: "Aucun d'outils cosplay trouvé pour la mise à jour." });
        } else {
            return res.status(200).json({ message: "Mise à jour de l'outil cosplay réussie. ✅", changeOutilsCosplay });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la tentative de mise à jour de l'outil cosplay." });

    }
};

const deleteOutilsCosplay = async (req, res) => {
    try {
        const id_Outils = req.params.id_Outils;
        const suppOutilsCosplay = await outilsCosplayModel.deleteOutilsCosplay(id_Outils);

        if (suppOutilsCosplay === 0) {
            return res.status(404).json({ message: "Aucun outil cosplay trouvé pour la suppression." });
        } else {
            return res.status(200).json({ message: "Suppression de l'outil cosplay réussie. ✅", suppOutilsCosplay });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la tentative de suppression de l'outil cosplay." });

    }
};

export default {
    getAllOutilsCosplay,
    getOutilCosplayById,
    createOutilsCosplay,
    updateOutilsCosplay,
    deleteOutilsCosplay
}