import media_ActualityModel from "../model/media_ActualityModel.js";

const getAllMediaActuality = async (req, res) => {
    try {
        const mediaActuality = await media_ActualityModel.getAllMediaActuality();
        return res.status(200).json({ message: "Récupération des médias de l'actualité réussie. ✅", mediaActuality });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des médias de l'actualité." });

    }
};

const getMediaActualityById = async (req, res) => {
    try {
        const id_media_actuality = req.params.id_media_actuality;
        const mediaActualityId = await media_ActualityModel.getMediaActualityById(id_media_actuality);

        if (mediaActualityId) {
            return res.status(200).json({ message: "Récupération des médias de l'actualité via l'ID réussie. ✅", mediaActualityId });
        } else {
            return res.status(404).json({ message: "Aucune donnée trouvée." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des médias de l'actualité." });

    }
};

const createMediaActuality = async (req, res) => {
    try {
        const { actuality_Id, url, type } = req.body;

        if (!actuality_Id || !url || !type) {
            return res.status(400).json({ message: "Les champs actuality_Id, url, type sont requis." });
        }

        const existingMediaActuality = await media_ActualityModel.getMediaActualityByAttributes(actuality_Id, url, type);

        if (existingMediaActuality) {
            return res.status(409).json({ message: "Le média de l'actualité existe déjà." });
        }

        const addMediaActuality = await media_ActualityModel.createMediaActuality(actuality_Id, url, type);

        if (!addMediaActuality) {
            return res.status(404).json({ message: "Impossible de créer le média de l'actualité." });
        } else {
            return res.status(201).json({ message: "Création du média de l'actualité réussie. ✅", addMediaActuality });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la création du média de l'actualité." });

    }
};

const updateMediaActuality = async (req, res) => {
    try {
        const id_media_actuality = req.params.id_media_actuality;
        const { actuality_Id, url, type } = req.body;
        const changeMediaActuality = await media_ActualityModel.updateMediaActuality(id_media_actuality, actuality_Id, url, type);

        if (changeMediaActuality === 0) {
            return res.status(404).json({ message: "Aucune donnée trouvée pour la mise à jour du média de l'actualité." });
        } else {
            return res.status(200).json({ message: "Mise à jour du média de l'actualité réussie. ✅", changeMediaActuality });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la mise à jour du média de l'actualité." });

    }
};

const deleteMediaActuality = async (req, res) => {
    try {
        const id_media_actuality = req.params.id_media_actuality;
        const suppMediaActuality = await media_ActualityModel.deleteMediaActuality(id_media_actuality);

        if (suppMediaActuality === 0) {
            return res.status(404).json({ message: "Aucune donnée trouvée pour la suppression du média de l'actualité." });
        } else {
            return res.status(200).json({ message: "Suppression du média de l'actualité réussie. ✅", suppMediaActuality });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la suppression du média de l'actualité." });

    }
};

export default {
    getAllMediaActuality,
    getMediaActualityById,
    createMediaActuality,
    updateMediaActuality,
    deleteMediaActuality
}