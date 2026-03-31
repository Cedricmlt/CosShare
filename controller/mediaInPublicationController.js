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

const getMediaByPublication = async (req, res) => {
  try {
    const publication_Id = req.params.publication_Id;
    const medias = await mediaInPublicationModel.getMediaByPublication(publication_Id);
    return res.status(200).json({ message: "Médias récupérés ✅", medias });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Impossible de récupérer les médias." });
  }
};

const createMediaInPublication = async (req, res) => {
    try {
        const { publication_Id } = req.body;

        if (!publication_Id) {
            return res.status(400).json({ message: "Le champ publication_Id est requis." });
        }

        const urls = req.body.urls
            ? Array.isArray(req.body.urls) ? req.body.urls : [req.body.urls]
            : [];

        const results = [];

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const url = `http://localhost:3000/uploads/${file.filename}`;
                const media = await mediaInPublicationModel.createMediaInPublication(publication_Id, url, 'image');
                results.push(media);
            }
        }

        if (urls.length > 0) {
            for (const url of urls) {
                const media = await mediaInPublicationModel.createMediaInPublication(publication_Id, url, 'image');
                results.push(media);
            }
        }

        return res.status(201).json({ message: "Création du média réussie. ✅", results });
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
    getMediaByPublication,
    createMediaInPublication,
    updateMediaInPublication,
    deleteMediaInPublication
}