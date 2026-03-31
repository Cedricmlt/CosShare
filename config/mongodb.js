import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connexion à MongoDB réussie ✅');
    } catch (error) {
        console.error('Erreur de connexion à MongoDB', error.message);
    }
};

export { mongoose, connectMongo };
export default mongoose;