import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
    nombre: {
        type: String, 
        require:true
    },
    Urlimagen: {
        type: String,
         require:true
    },
    cantidad: {
        type: Number, 
        require: true
    },
    precio: {
        type: Number,
        require:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export default mongoose.model( "Carrito", carritoSchema )