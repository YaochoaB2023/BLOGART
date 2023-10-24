import mongoose from 'mongoose';
import { mongourl } from './config.js'

export const conectarDB = async () => {
    try {
        await mongoose.connect(mongourl, {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("conectado a mongo")
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
