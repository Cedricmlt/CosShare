import publicationTagsModel from "../model/publicationTagsModel.js";

const getAllPublicationsTags = async (req, res) => {
    try {
        const publicationsTags = await publicationTagsModel.getAllPublicationsTags();
        return res.status(200).json({ message: "Récupération des publications tags réussie. ✅", publicationsTags });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des publications tags." });
    }
};

const getPublicationTagById = async (req, res) => {
    try {
        const { publication_Id, tag_Id } = req.params;
        const publicationTagId = await publicationTagsModel.getPublicationTagById(publication_Id, tag_Id);

        if (publicationTagId) {
            return res.status(200).json({ message: "Récupération de publication tag via son ID réussie. ✅", publicationTagId });
        } else {
            return res.status(404).json({ message: "Aucun publication tag trouvé." });
        }
    } catch (error) {
        console.error(error);
        return res.status({ message: "Un problème est survenu lors de la récupération de publication tag." });

    }
};

const createPublicationTags = async (req, res) => {
    try {
        const { publication_Id, tag_Id } = req.body;

        if (!publication_Id || !tag_Id) {
            return res.status(400).json({ message: "Les champs publication_Id et tag_Id sont requis." });
        }

        const existingPublicationTag = await publicationTagsModel.getPublicationTagsByAttributes(publication_Id, tag_Id);

        if (existingPublicationTag) {
            return res.status(409).json({ message: "La publication tag existe déjà." });
        }

        const addPublicationTag = await publicationTagsModel.createPublicationTags(publication_Id, tag_Id);
        
        if (!addPublicationTag) {
            return res.status(404).json({ message: "Impossible de créer la publication tag." });
        } else {
            return res.status(201).json({ message: "Création de la publication tag réussie. ✅", addPublicationTag });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la création de la publication tag." });

    }
};

const updatePublicationTags = async (req, res) => {
    try {
        const { publication_Id, tag_Id } = req.params;
        const changePublicationTag = await publicationTagsModel.updatePublicationTags(publication_Id, tag_Id);

        if (changePublicationTag === 0) {
            return res.status(404).json({ message: "Aucune publication tag trouvée pour la mise à jour." });
        } else {
            return res.status(200).json({ message: "Mise à jour de la publication tag réussie. ✅", changePublicationTag });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la mise à jour de la publication tag." });

    }
};

const deletePublicationTags = async (req, res) => {
    try {
        const { publication_Id, tag_Id } = req.params;
        const suppPublicationTag = await publicationTagsModel.deletePublicationTags(publication_Id, tag_Id);

        if (suppPublicationTag === 0) {
            return res.status(404).json({ message: "Aucune publication tag trouvée pour la suppression." });
        } else {
            return res.status(200).json({ message: "Suppression de la publication tag réussie. ✅", suppPublicationTag });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la suppression de la publication tag." });

    }
};

export default {
    getAllPublicationsTags,
    getPublicationTagById,
    createPublicationTags,
    updatePublicationTags,
    deletePublicationTags
}