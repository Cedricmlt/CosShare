import tagsModel from "../model/tagsModel.js";

const getAllTags = async (req, res) => {
    try {
        const tags = await tagsModel.getAllTags();
        return res.status(200).json({ message: "Récupération des tags réussie. ✅", tags });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des tags." });

    }
};

const getTagById = async (req, res) => {
    try {
        const id_Tag = req.params.id_Tag;
        const tagId = await tagsModel.getTagById(id_Tag);

        if (tagId) {
            return res.status(200).json({ message: "Récupération du tag via son ID réussie. ✅", tagId });
        } else {
            return res.status(404).json({ message: "Aucun tag trouvé." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération du tag via son ID." });

    }
};

const createTag = async (req, res) => {
    try {
        const { label } = req.body;

        if (!label) {
            return res.status(400).json({ message: "Le champ est requis." });
        }

        const existingTag = await tagsModel.getTagByAttributes(label);

        if (existingTag) {
            return res.status(409).json({ message: "Le tag existe déjà." });
        }

        const addTag = await tagsModel.createTag(label);

        if (!addTag) {
            return res.status(404).json({ message: "Impossible de créer le tag." });
        } else {
            return res.status(201).json({ message: "Création du tag réussie. ✅", addTag });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la création du tag." });

    }
};

const updateTag = async (req, res) => {
    try {
        const id_Tag = req.params.id_Tag;
        const { label } = req.body;
        const changeTag = await tagsModel.updateTag(id_Tag, label);

        if (changeTag === 0) {
            return res.status(404).json({ message: "Aucune donnée trouvée du tag pour la mise à jour." });
        } else {
            return res.status(200).json({ message: "Mise à jour du tag réussie. ✅", changeTag });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la mise à jour du tag." });

    }
};

const deleteTag = async (req, res) => {
    try {
        const id_Tag = req.params.id_Tag;
        const suppTag = await tagsModel.deleteTag(id_Tag);

        if (suppTag === 0) {
            return res.status(404).json({ message: "Aucune donnée trouvée du tag pour la suppression." });
        } else {
            return res.status(200).json({ message: "Suppression du tag réussie. ✅", suppTag });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la suppression du tag." });

    }
};

export default {
    getAllTags,
    getTagById,
    createTag,
    updateTag,
    deleteTag
}