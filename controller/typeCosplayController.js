import typeCosplayModel from "../model/typeCosplayModel.js";

const getAllTypesCosplays = async (req, res) => {
    try {
        const typesCosplays = await typeCosplayModel.getAllTypesCosplays();
        return res.status(200).json({ message: "Récupération des types de cosplay réussie. ✅", typesCosplays });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des types de cosplay." });

    }
};

const getTypeCosplayById = async (req, res) => {
    try {
        const id_Type = req.params.id_Type;
        const typeCosplayById = await typeCosplayModel.getTypeCosplayById(id_Type);

        if (typeCosplayById) {
            return res.status(200).json({ message: "Récupération du type associé à un cosplay via son ID réussie. ✅", typeCosplayById });
        } else {
            return res.status(404).json({ message: "Aucun type lié trouvé." });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des types de cosplay via l'ID." });

    }
};

const createTypeCosplay = async (req, res) => {
    try {
        const id_Type = req.params.id_Type;
        const { libelle } = req.body;

        if (!libelle) {
            return res.status(400).json({ message: "Le champs libelle est requis." });
        }


        const existingTypeCosplay = await typeCosplayModel.getTypeCosplayByAttributes(id_Type, libelle);

        if (existingTypeCosplay) {
            return res.status(409).json({ message: "Un type est déjà associé à un cosplay." });
        }

        const addTypeCosplay = await typeCosplayModel.createTypeCosplay(libelle);

        if (!addTypeCosplay) {
            return res.status(404).json({ message: "Impossible d'associé le type au cosplay." });
        } else {
            return res.status(201).json({ message: "Association du type au cosplay réussie. ✅" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la création du type de cosplay." });

    }
};

const updateTypeCosplay = async (req, res) => {
    try {
        const id_Type = req.params.id_Type;
        const { libelle } = req.body;
        const updateTypeCos = await typeCosplayModel.updateTypeCosplay(id_Type, libelle);

        if (updateTypeCos === 0) {
            return res.status(404).json({ message: "Aucun type associé à un cosplay trouvé pour la mise à jour." });
        } else {
            return res.status(200).json({ message: "Mise à jour du type lié au cosplay réussie. ✅", updateTypeCos });
        }
    } catch (error) {
        return res.status(500).json({ message: "Un problème est survenu lors de la mise à jour du type à un cosplay." });

    }
};

const deleteTypeCosplay = async (req, res) => {
    try {
        const id_Type = req.params.id_Type;
        const deleteTypeCos = await typeCosplayModel.deleteTypeCosplay(id_Type);

        if (deleteTypeCos === 0) {
            return res.status(404).json({ message: "Aucun type associé à un cosplay trouvé pour la suppression." });
        } else {
            return res.status(200).json({ message: "Suppression du type lié au cosplay réussie. ✅", deleteTypeCos });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la suppression du type lié au cosplay." });

    }
};

export default {
    getAllTypesCosplays,
    getTypeCosplayById,
    createTypeCosplay,
    updateTypeCosplay,
    deleteTypeCosplay
};