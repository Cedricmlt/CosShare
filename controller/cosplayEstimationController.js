import cosplayEstimationModel from "../model/cosplayEstimationModel.js";

const getAllCosplayEstimations = async (req, res) => {
    try {
        console.log('Fetching cosplay estimations...');
        const cosplayEstimations = await cosplayEstimationModel.getAllCosplayEstimations();
        console.log('Cosplay estimations fetched:', cosplayEstimations);
        return res.status(200).json({ message: "Récupération des estimations cosplay réussie. ✅", cosplayEstimations });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération des estimations." });

    }
};

const getCosplayEstimationById = async (req, res) => {
    try {
        const id_Cosplay_Estimation = req.params.id_Cosplay_Estimation;
        const cosplayEstimationId = await cosplayEstimationModel.getCosplayEstimationById(id_Cosplay_Estimation);

        if (cosplayEstimationId) {
            return res.status(200).json({ message: "Récupération de l'estimation cosplay via son ID réussie. ✅", cosplayEstimationId });
        } else {
            return res.status(404).json({ message: "Aucune estimation trouvée." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la récupération de l'estimation via son ID." });

    }
};

const createCosplayEstimation = async (req, res) => {
    try {
        const { cosplay_Id, fabrication_Id, accessoires_Id, outils_Id, materiaux_Id, users_Id } = req.body;

        if (!cosplay_Id || !users_Id) {
            return res.status(400).json({ message: "Les champs cosplay_Id, users_Id sont requis." });
        }

        const existingCosplayEstimation = await cosplayEstimationModel.getCosplayEstimationByAttributes(cosplay_Id, fabrication_Id, accessoires_Id,
            outils_Id, materiaux_Id, users_Id);

        if (existingCosplayEstimation.length > 0) {
            return res.status(409).json({ message: "L'estimation cosplay existe déjà." });
        }

        const addCosplayEstimation = await cosplayEstimationModel.createCosplayEstimation(cosplay_Id, fabrication_Id, accessoires_Id,
            outils_Id, materiaux_Id, users_Id);

        if (!addCosplayEstimation) {
            return res.status(404).json({ message: "Impossible de créer l'estimation cosplay." });
        } else {
            return res.status(201).json({ message: "Création de l'estimation cosplay réussie. ✅", addCosplayEstimation });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la création de l'estimation." });

    }
};

const updateCosplayEstimation = async (req, res) => {
    try {
        const id_Cosplay_Estimation = req.params.id_Cosplay_Estimation;
        // console.log(id_Cosplay_Estimation);

        const { cosplay_Id, fabrication_Id, accessoires_Id, outils_Id, materiaux_Id, users_Id } = req.body;
        // console.log(cosplay_Id, fabrication_Id, accessoires_Id, outils_Id, materiaux_Id, users_Id);

        const changeCosplayEstimation = await cosplayEstimationModel.updateCosplayEstimation(id_Cosplay_Estimation, cosplay_Id, fabrication_Id,
            accessoires_Id, outils_Id, materiaux_Id, users_Id);
        console.log(changeCosplayEstimation);


        if (changeCosplayEstimation === 0) {
            return res.status(404).json({ message: "Aucune données trouvée pour la mise à jour." });
        } else {
            return res.status(200).json({ message: "Mise à jour de l'estimation cosplay réussie. ✅", changeCosplayEstimation });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la mise à jour de l'estimation." });

    }
};

const deleteCosplayEstimation = async (req, res) => {
    try {
        const id_Cosplay_Estimation = req.params.id_Cosplay_Estimation;
        const suppCosplayEstimation = await cosplayEstimationModel.deleteCosplayEstimation(id_Cosplay_Estimation);

        if (suppCosplayEstimation === 0) {
            return res.status(404).json({ message: "Aucune données trouvée pour la suppression de l'estimation." });
        } else {
            return res.status(200).json({ message: "Supprression de l'estimation cosplay réussie. ✅", suppCosplayEstimation });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la suppression de l'estimation." });

    }
};

export default {
    getAllCosplayEstimations,
    getCosplayEstimationById,
    createCosplayEstimation,
    updateCosplayEstimation,
    deleteCosplayEstimation
}