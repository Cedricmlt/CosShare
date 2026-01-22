import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

const sendResetEmail = async (email_connexion, resetLink) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email_connexion,
        subject: 'Réinitialisation de mot de passe',
        text: `Pour réinitialiser votre mot de passe, cliquez sur le lien suivant : ${resetLink}`,
        html: `<p>Pour réinitialiser votre mot de passe, cliquez sur le lien suivant : <a href="${resetLink}">${resetLink}</a></p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email de réinitialisation envoyé à ${email_connexion}`);
    } catch (error) {
        console.error(`Erreur lors de l'envoi de l'email à ${email_connexion}:`, error);
        throw error;
    }
};



export default {
    sendResetEmail
};
