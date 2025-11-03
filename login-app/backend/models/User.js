import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);