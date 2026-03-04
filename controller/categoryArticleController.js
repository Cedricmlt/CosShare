import categoryArticleModel from "../model/categoryArticleModel.js";

const getAllCategoryArticle = async (req, res) => {
    try {
        const categoryArticle = await categoryArticleModel.getAllCategoryArticle();
        return res.status(200).json({ message: "Récupération des catégories d'articles réussie. ✅", categoryArticle });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des catégories d'articles." });

    }
};

const getCategoryArticleById = async (req, res) => {
    try {
        const id_Category = req.params.id_Category;
        const categoryArticleId = await categoryArticleModel.getCategoryArticleById(id_Category);

        if (categoryArticleId) {
            return res.status(200).json({ message: "Récupération des catégoriesA via l'ID réussie. ✅", categoryArticleId });
        } else {
            return res.status(404).json({ message: "Aucune donnée trouvée." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des catégoriesA via l'ID." });

    }
};

const createCategoryArticle = async (req, res) => {
    try {
        const { label, description } = req.body;

        if (!label || !description) {
            return res.status(400).json({ message: "Les champs label, description sont requis." });
        }

        const existingCategoryArticle = await categoryArticleModel.getCategoryArticleByAttributes(label, description);

        if (existingCategoryArticle) {
            return res.status(409).json({ message: "La catégorie article existe déjà." });
        }

        const addCategoryArticle = await categoryArticleModel.createCategoryArticle(label, description);

        if (!addCategoryArticle) {
            return res.status(404).json({ message: "Impossible de créer la catégorie article." });
        } else {
            return res.status(201).json({ message: "Création de la catégorie article réussie. ✅", addCategoryArticle });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la création de la catégorie article." });

    }
};

const updateCategoryArticle = async (req, res) => {
    try {
        const id_Category = req.params.id_Category;
        const { label, description } = req.body;
        const changeCategoryArticle = await categoryArticleModel.updateCategoryArticle(id_Category, label, description);

        if (changeCategoryArticle === 0) {
            return res.status(404).json({ message: "Aucune donnée trouvée pour la mise à jour de la catégorie article." });
        } else {
            return res.status(200).json({ message: "Mise à jour de la catégorie article réussie. ✅", changeCategoryArticle });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la mise à jour de la catégorie article." });

    }
};

const deleteCategoryArticle = async (req, res) => {
    try {
        const id_Category = req.params.id_Category;
        const suppCategoryArticle = await categoryArticleModel.deleteCategoryArticle(id_Category);

        if (suppCategoryArticle === 0) {
            return res.status(404).json({ message: "Aucune donnée trouvée pour la suppression de la catégorie article." });
        } else {
            return res.status(200).json({ message: "Suppression de la catégorie article réussie. ✅", suppCategoryArticle });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la suppression de la catégorie article." });

    }
};

export default {
    getAllCategoryArticle,
    getCategoryArticleById,
    createCategoryArticle,
    updateCategoryArticle,
    deleteCategoryArticle
}