import mysql from 'mysql2/promise.js';
import dotenv from 'dotenv';


dotenv.config();

const bdd = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const testConnection = async () => {
    try {
        const connection = await db.getConnection();
        console.log('✅ Connexion à la base de données réussie');
        connection.release();
    } catch (error) {
        console.error('❌ Erreur de connexion à la base de données:', error.message);
    }
};

export { bdd, testConnection };
export default bdd;


