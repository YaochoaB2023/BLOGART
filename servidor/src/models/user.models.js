import mongoose, { Schema } from 'mongoose';

const useSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true, 
        trim: true
    },
    email : {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password : {
        type: String,
        required: true
    }
},{
    timestamps: true
});

export default mongoose.model("user", useSchema);