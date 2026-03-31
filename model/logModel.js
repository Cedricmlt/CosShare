import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    pseudo: {
        type: String,
        default: "inconnu"
    },
    action: {
        type: String,
        required: true
    },
    details: {
        type: String,
        default: null
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Log = mongoose.model('Log', logSchema);

export default Log;