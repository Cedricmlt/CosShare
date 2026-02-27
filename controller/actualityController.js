import actualityModel from "../model/actualityModel.js";

const getAllActuality = async (req, res) => {
    try {
        const actuality = await actualityModel.getAllActuality();
        return res.status(200).json({ message: "Récupération des actualités réussie. ✅", actuality });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des acutalités." });

    }
};

const getActualityById = async (req, res) => {
    try {
        const id_Actuality = req.params.id_Actuality;
        const oneActuality = await actualityModel.getActualityById(id_Actuality);

        if (oneActuality) {
            return res.status(200).json({ message: "Récupération de l'actualité via son ID réussie. ✅", oneActuality });
        } else {
            return res.status(404).json({ message: "Aucun donnée trouvée." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération de l'actualité via son ID." });

    }
};

const createActuality = async (req, res) => {
    try {
        const { title, content, users_Id, event_Id } = req.body;

        if (!title || !content || !users_Id || !event_Id) {
            return res.status(400).json({ message: "Les champs title, content, users_Id, event_Id sont requis." });
        }

        const existingActuality = await actualityModel.getActualityByAttributes(title, content, users_Id, event_Id);

        if (existingActuality) {
            return res.status(409).json({ message: "L'actualité existe déjà." });
        }

        const addActuality = await actualityModel.createActuality(title, content, users_Id, event_Id);

        if (!addActuality) {
            return res.status(404).json({ message: "Impossible de créer une actualité." });
        } else {
            return res.status(201).json({ message: "Création de l'actualité réussie. ✅", addActuality });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la création de l'actualité." });

    }
};

const updateActuality = async (req, res) => {
    try {
        const id_Actuality = req.params.id_Actuality;
        const { title, content, users_Id, event_Id } = req.body;
        const changeActuality = await actualityModel.updateActuality(id_Actuality, title, content, users_Id, event_Id);

        if (changeActuality === 0) {
            return res.status(404).json({ message: "Aucune donnée trouvée pour mettre à jour l'actualité." });
        } else {
            return res.status(200).json({ message: "Mise à jour de l'actualité réussie. ✅", changeActuality });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la mise à jour de l'actualité." });

    }
};

const deleteActuality = async (req, res) => {
    try {
        const id_Actuality = req.params.id_Actuality;
        const suppActuality = await actualityModel.deleteActuality(id_Actuality);

        if (suppActuality === 0) {
            return res.status(404).json({ message: "Aucune donnée trouvée pour la suppression de l'actualité." });
        } else {
            return res.status(200).json({ message: "Suppression de l'actualité réussie. ✅", suppActuality });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la suppression de l'actualité." });

    }
};

export default {
    getAllActuality,
    getActualityById,
    createActuality,
    updateActuality,
    deleteActuality
}