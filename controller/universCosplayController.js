import universCosplayModel from "../model/universCosplayModel.js";

const getAllUniversCosplays = async (req, res) => {
    try {
        const universCosplays = await universCosplayModel.getAllUniversCosplays();
        return res.status(200).json({ message: "Récupération des univers cosplay réussie. ✅", universCosplays });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des univers cosplay." });

    }
};

const getUniversCosplayById = async (req, res) => {
    try {
        const id_Univers = req.params.id_Univers;
        const universCosplayId = await universCosplayModel.getUniversCosplayById(id_Univers);

        if (universCosplayId) {
            return res.status(200).json({ message: "Récupération de l'univers cosplay via son ID réussie. ✅", universCosplayId });
        } else {
            return res.status(404).json({ message: "Aucun univers cosplay trouvé." });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération de l'univers cosplay via son ID." });

    }
};

const createUniversCosplay = async (req, res) => {
    try {
        const id_Univers = req.params.id_Univers;
        const { libelle } = req.body;

        if (!libelle) {
            return res.status(400).json({ message: "Le libelle est requis." });
        }

        const existingUniversCosplay = await universCosplayModel.getUniversCosplayById(id_Univers);

        if (existingUniversCosplay) {
            return res.status(409).json({ message: "L'univers cosplay existe déjà." });
        }

        const addUniversCosplay = await universCosplayModel.createUniversCosplay(libelle);

        if (!addUniversCosplay) {
            return res.status(404).json({ message: "Impossible de créer l'univers cosplay." });
        } else {
            return res.status(201).json({ message: "Création de l'univers cosplay réussie. ✅", addUniversCosplay });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la création de l'univers cosplay." });

    }
};

const updateUniversCosplay = async (req, res) => {
    try {
        const id_Univers = req.params.id_Univers;
        const { libelle } = req.body;
        const changeUniversCosplay = await universCosplayModel.updateUniversCosplay(id_Univers, libelle);

        if (changeUniversCosplay === 0) {
            return res.status(404).json({ message: "Aucun univers associé trouvé pour la mise à jour." });
        } else {
            return res.status(200).json({ message: "Mise à jour de l'univers cosplay réussie. ✅", changeUniversCosplay });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la mise à jour de l'univers cosplay." });

    }
};

const deleteUniversCosplay = async (req, res) => {
    try {
        const id_Univers = req.params.id_Univers;
        const suppUniversCosplay = await universCosplayModel.deleteUniversCosplay(id_Univers);

        if (suppUniversCosplay === 0) {
            return res.status(404).json({ message: "Aucun univers associé trouvé pour la suppression." });
        } else {
            return res.status(200).json({ message: "Suppression de l'univers cosplay réussie. ✅", suppUniversCosplay });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la suppression de l'univers cosplay." });

    }
};

export default {
    getAllUniversCosplays,
    getUniversCosplayById,
    createUniversCosplay,
    updateUniversCosplay,
    deleteUniversCosplay
}