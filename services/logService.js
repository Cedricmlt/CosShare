import Log from '../model/logModel.js';

const createLog = async (userId, pseudo, action, details = null) => {
    try {
        const log = new Log({ userId, pseudo, action, details });
        await log.save();
        console.log(`Log enregistré ✅ : ${action} - ${pseudo}`);
    } catch (error) {
        console.error('Erreur lors de la création du log', error.message);
    }
};

const getAllLogs = async () => {
    try {
        const logs = await Log.find().sort({ date: -1 });
        return logs;
    } catch (error) {
        console.error('Erreur lors de la récupération des logs', error.message);
    }
};

const getLogsByUser = async (userId) => {
    try {
        const logs = await Log.find({ userId }).sort({ date: -1 });
        return logs;
    } catch (error) {
        console.error('Erreur lors de la récupération des logs', error.message);
    }
};

export default { createLog, getAllLogs, getLogsByUser };