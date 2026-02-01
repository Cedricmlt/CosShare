import roleModel from "../model/roleModel.js";

const getAllRoles = async (req, res) => {
    try {
        const role = await roleModel.getAllRoles();
        return res.status(200).json({ message: "Récupération des roles réussie. ✅", role });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Récupération des roles impossible." });

    }
};

const getRoleById = async (req, res) => {
    try {
        const id_Role = req.params.id_Role;
        const roleId = await roleModel.getRoleById(id_Role);

        if (roleId) {
            return res.status(200).json({ message: "Récupération du role via son ID réussie. ✅", roleId });
        } else {
            return res.status(404).json({ message: "Aucun role trouvé." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Récupération du role via son ID impossible." });

    }
};

const createRole = async (req, res) => {
    try {
        const { code_du_role, libelle, description } = req.body;

        if (!code_du_role | !libelle | !description) {
            return res.status(400).json({ message: "Les champs code_du_role, libelle et description sont requis." });
        }

        const existingRole = await roleModel.getRoleByAttributes(code_du_role, libelle, description);

        if (existingRole) {
            return res.status(409).json({ message: "Le role existe déjà." });
        }

        const newRole = await roleModel.createRole(code_du_role, libelle, description);

        if (newRole) {
            return res.status(201).json({ message: "Création du role réussie. ✅", newRole });
        } else {
            return res.status(404).json({ message: "Impossible de créer le role." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la création du role." });
    }
};

const updateRole = async (req, res) => {
    try {
        const id_Role = req.params.id_Role;
        const { code_du_role, libelle, description } = req.body;
        const roleUpdate = await roleModel.updateRole(id_Role, code_du_role, libelle, description);

        if (roleUpdate === 0) {
            return res.status(404).json({ message: "Aucun role trouvé pour la mise à jour." });
        } else {
            return res.status(200).json({ message: "Mise à jour du role effectuée avec succès. ✅", roleUpdate });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la mise à jour du role." });

    }
};

const deleteRole = async (req, res) => {
    try {
        const id_Role = req.params.id_Role;
        const roleDelete = await roleModel.deleteRole(id_Role);

        if (roleDelete === 0) {
            return res.status(404).json({ message: "Aucun role trouvé pour la suppression." });
        } else {
            return res.status(200).json({ message: "Suppression du role effectuée avec succès. ✅", roleDelete });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Un problème est survenu lors de la suppression du role." });

    }
};

export default {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
};