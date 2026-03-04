import articleCosplayModel from "../model/articleCosplayModel.js";

const getAllArticleCosplay = async (req, res) => {
    try {
        const articleCosplay = await articleCosplayModel.getAllArticleCosplay();
        return res.status(200).json({ message: "Récupération des articles cosplay réussie. ✅", articleCosplay });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des articles cosplay." });

    }
};

const getArticleCosplayById = async (req, res) => {
    try {
        const id_Article = req.params.id_Article;
        const articleCosplayId = await articleCosplayModel.getArticleCosplayById(id_Article);

        if (articleCosplayId) {
            return res.status(200).json({ message: "Récupération des articles cosplay via l'ID réussie. ✅", articleCosplayId });
        } else {
            return res.status(404).json({ message: "Aucune donnée trouvée." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des articles cosplay via l'ID." });

    }
};

const createArticleCosplay = async (req, res) => {
    try {
        const { title, content, category_Id } = req.body;

        if (!title || !content || !category_Id) {
            return res.status(400).json({ message: "Les champs title, content, category_Id sont requis." });
        }

        const existingArticleCosplay = await articleCosplayModel.getArticleCosplayByAttributes(title, content, category_Id);

        if (existingArticleCosplay) {
            return res.status(409).json({ message: "L'article cosplay existe déjà." });
        }

        const addArticleCosplay = await articleCosplayModel.createArticleCosplay(title, content, category_Id);

        if (!addArticleCosplay) {
            return res.status(404).json({ message: "Impossible de créer un article cosplay." });
        } else {
            return res.status(201).json({ message: "Création de l'article cosplay réussie. ✅", addArticleCosplay });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la création de l'article cosplay." });

    }
};

const updateArticleCosplay = async (req, res) => {
    try {
        const id_Article = req.params.id_Article;
        const { title, content, category_Id } = req.body;
        const changeArticleCosplay = await articleCosplayModel.updateArticleCosplay(id_Article, title, content, category_Id);

        if (changeArticleCosplay === 0) {
            return res.status(404).json({ message: "Aucune donnée trouvée pour la mise à jour de l'article cosplay." });
        } else {
            return res.status(200).json({ message: "Mise à jour de l'article cosplay réussie. ✅", changeArticleCosplay });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la mise à jour de l'article cosplay." });

    }
};

const deleteArticleCosplay = async (req, res) => {
    try {
        const id_Article = req.params.id_Article;
        const suppArticleCosplay = await articleCosplayModel.deleteArticleCosplay(id_Article);

        if (suppArticleCosplay === 0) {
            return res.status(404).json({ message: "Aucune donnée trouvée pour la suppression de l'article cosplay." });
        } else {
            return res.status(200).json({ message: "Suppression de l'article cosplay réussie. ✅", suppArticleCosplay });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la suppression de l'article cosplay." });

    }
};

export default {
    getAllArticleCosplay,
    getArticleCosplayById,
    createArticleCosplay,
    updateArticleCosplay,
    deleteArticleCosplay
}