import mediaCosplayModel from "../model/mediaCosplayModel.js";

const getAllMediaCosplay = async (req, res) => {
    try {
        const mediaCosplay = await mediaCosplayModel.getAllMediaCosplay();
        return res.status(200).json({ message: "Récupération des médias cosplay réussie. ✅", mediaCosplay });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des médias cosplay." });

    }
};

const getMediaCosplayById = async (req, res) => {
    try {
        const id_Media = req.params.id_Media;
        const mediaCosplayId = await mediaCosplayModel.getMediaCosplayById(id_Media);

        if (mediaCosplayId) {
            return res.status(200).json({ message: "Récupération des médias cosplay via l'ID réussie. ✅", mediaCosplayId });
        } else {
            return res.status(404).json({ message: "Aucune donnée trouvée." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des médias cosplay." });

    }
};

const createMediaCosplay = async (req, res) => {
    try {
        const { cosplay_Id, url, type } = req.body;

        if (!cosplay_Id || !url || !type) {
            return res.status(400).json({ message: "Les champs cosplay_Id, url, type sont requis." });
        }

        const existingMediaCosplay = await mediaCosplayModel.getMediaCosplayByAttributes(cosplay_Id, url, type);

        if (existingMediaCosplay) {
            return res.status(409).json({ message: "Le média cosplay existe déjà." });
        }

        const addMediaCosplay = await mediaCosplayModel.createMediaCosplay(cosplay_Id, url, type);

        if (!addMediaCosplay) {
            return res.status(404).json({ message: "Impossible de créer le média cosplay." });
        } else {
            return res.status(201).json({ message: "Création du média cosplay réussie. ✅", addMediaCosplay });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la création du média cosplay." });

    }
};

const updateMediaCosplay = async (req, res) => {
    try {
        const id_Media = req.params.id_Media;
        const { cosplay_Id, url, type } = req.body;
        const changeMediaCosplay = await mediaCosplayModel.updateMediaCosplay(id_Media, cosplay_Id, url, type);

        if (changeMediaCosplay === 0) {
            return res.status(404).json({ message: "Aucune donnée trouvée pour la mise à jour du média cosplay." });
        } else {
            return res.status(200).json({ message: "Mise à jour du média cosplay réussie. ✅", changeMediaCosplay });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la mise à jour du média cosplay." });

    }
};

const deleteMediaCosplay = async (req, res) => {
    try {
        const id_Media = req.params.id_Media;
        const suppMediaCosplay = await mediaCosplayModel.deleteMediaCosplay(id_Media);

        if (suppMediaCosplay === 0) {
            return res.status(404).json({ message: "Aucune donnée trouvée pour la suppression du média cosplay." });
        } else {
            return res.status(200).json({ message: "Suppression du média cosplay réussie. ✅", suppMediaCosplay });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la suppression du média cospaly." });

    }
};

export default {
    getAllMediaCosplay,
    getMediaCosplayById,
    createMediaCosplay,
    updateMediaCosplay,
    deleteMediaCosplay
}