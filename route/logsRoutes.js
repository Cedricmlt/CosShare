import express from 'express';
import logService from '../services/logService.js';
import checkToken from '../middlewares/checkToken.js';

const router = express.Router();

// Récupérer tous les logs (admin seulement)
router.get('/', checkToken, async (req, res) => {
    try {
        const logs = await logService.getAllLogs();
        return res.status(200).json({ message: "Logs récupérés ✅", logs });
    } catch (error) {
        return res.status(500).json({ message: "Impossible de récupérer les logs." });
    }
});

// Récupérer les logs d'un utilisateur
router.get('/:userId', checkToken, async (req, res) => {
    try {
        const logs = await logService.getLogsByUser(req.params.userId);
        return res.status(200).json({ message: "Logs utilisateur récupérés ✅", logs });
    } catch (error) {
        return res.status(500).json({ message: "Impossible de récupérer les logs." });
    }
});

export default router;