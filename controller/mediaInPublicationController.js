import mediaInPublicationModel from "../model/mediaInPublicationModel.js";

const getAllMediasInPublication = async (req, res) => {
    try {
        const mediasInPublication = await mediaInPublicationModel.getAllMediasInPublication();
        return res.status(200).json({ message: "Récupération des médias réussie. ✅", mediasInPublication });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des médias." });

    }
};

const getMediaInPublicationById = async (req, res) => {
    try {
        const id_Media = req.params.id_Media;
        const mediaInPublicationId = await mediaInPublicationModel.getMediaInPublicationById(id_Media);

        if (mediaInPublicationId) {
            return res.status(200).json({ message: "Récupération du média via son ID réussie. ✅", mediaInPublicationId });
        } else {
            return res.status(404).json({ message: "Aucun média trouvé." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération du média via son ID." });

    }
};

const createMediaInPublication = async (req, res) => {
    try {
        const { publication_Id, url, type_media } = req.body;

        if (!publication_Id || !url || !type_media) {
            return res.status(400).json({ message: "Les champs publication_Id, url, type_media sont requis." });
        }

        const existingMediaInPublication = await mediaInPublicationModel.getMediaInPublicationByAttributes(publication_Id, url, type_media);

        if (existingMediaInPublication.length > 0) {
            return res.status(409).json({ message: "Les données media existent déjà." });
        }

        const addMediaInPublication = await mediaInPublicationModel.createMediaInPublication(publication_Id, url, type_media);

        if (!addMediaInPublication) {
            return res.status(404).json({ message: "Impossible de créer un media." });
        } else {
            return res.status(201).json({ message: "Création du média réussie. ✅", addMediaInPublication });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la création du média." });

    }
};

const updateMediaInPublication = async (req, res) => {
    try {
        const id_Media = req.params.id_Media;
        const { publication_Id, url, type_media } = req.body;
        const changeMediaInPublication = await mediaInPublicationModel.updateMediaInPublication(id_Media, publication_Id, url, type_media);

        if (changeMediaInPublication === 0) {
            return res.status(404).json({ message: "Aucun média trouvé pour la mise à jour." });
        } else {
            return res.status(200).json({ message: "Mise à jour du média réussie. ✅", changeMediaInPublication });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la mise à jour du média." });

    }
};

const deleteMediaInPublication = async (req, res) => {
    try {
        const id_Media = req.params.id_Media;
        const suppMediaInPublication = await mediaInPublicationModel.deleteMediaInPublication(id_Media);

        if (suppMediaInPublication === 0) {
            return res.status(404).json({ message: "Aucun média trouvé pour la suppression." });
        } else {
            return res.status(200).json({ message: "Suppression du média réussie. ✅", suppMediaInPublication });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la suppression du média." });

    }
};

export default {
    getAllMediasInPublication,
    getMediaInPublicationById,
    createMediaInPublication,
    updateMediaInPublication,
    deleteMediaInPublication
}