import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true // si l'email est déjà utilisé, on ne peut pas créer un autre compte avec le même email
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    like: {
        type: Array
    },
    watched: {
        type: Array
    },
    watchlist: {
        type: Array
    }
}, {timestamps: 
{createdAt: true}});


userSchema.plugin(mongooseUniqueValidator);

export default mongoose.model('User', userSchema);
