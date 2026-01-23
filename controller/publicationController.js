import publicationModel from "../model/publicationModel.js";

const getAllPublications = async (req, res) => {
    try {
        const publication = await publicationModel.getAllPublications();
        return res.status(200).json({ message: "Récupération de toutes les publications réussie. ✅", publication });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Récupération des publications impossible." });
    }
}

const getPublicationById = async (req, res) => {
    try {
        const publicationId = req.params.id_Publication;
        const publication = await publicationModel.getPublicationById(publicationId);

        if (publication) {
            return res.status(200).json({ message: "Récupération de la publication via son ID réussie. ✅", publication });
        } else {
            return res.status(404).json({ message: "Aucune publication trouvée." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Récupération des publications impossible." });
    }
}

const createPublication = async (req, res) => {
    try {
        const { users_Id, description } = req.body;

        if (!users_Id | !description) {
            return res.status(400).json({ message: "Les champs users_Id et description sont requis." });
        }

        const newPublication = await publicationModel.createPublication(users_Id, description);

        if (newPublication) {
            return res.status(201).json({ message: "Création de la publication réussie.✅", newPublication })
        } else {
            return res.status(404).json({ message: "Impossible de créer la publication." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Echec lors de la création de la publication." });

    }
}

const updatePublication = async (req, res) => {
    try {
        const id_Publication = req.params.id_Publication;
        const { description } = req.body;
        const updateUserPublication = await publicationModel.updatePublication(id_Publication, description);

        if (updateUserPublication === 0) {
            return res.status(404).json({ message: "Aucune publication trouvée pour la mise à jour." });
        } else {
            return res.status(200).json({ message: "Mise à jour de la publication réussie. ✅" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Impossible de mettre à jour la publication." });
    }
}

const deletePublication = async (req, res) => {
    try {
        const id_Publication = req.params.id_Publication;
        const deleteUserPublication = await publicationModel.deletePublication(id_Publication);

        if (deleteUserPublication === 0) {
            return res.status(404).json({ message: "Aucune publication trouvée pour la suppression." });
        } else {
            return res.status(200).json({ message: "Suppression de la publication réussie. ✅" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Impossible de supprimer la publication." });

    }
}

export default {
    getAllPublications,
    getPublicationById,
    createPublication,
    updatePublication,
    deletePublication
}