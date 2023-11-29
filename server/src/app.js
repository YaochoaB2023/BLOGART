import express from "express"
import morgan from "morgan"
import authRoutes from "./routes/auth.routes.js"
import taskRoutes from "./routes/task.routes.js"
import carrito from './routes/carrito.routes.js';
import payment from './routes/payment.routes.js'
import cookieParser from "cookie-parser"
import cors from 'cors'
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express()
app.use( cors({
    origin: "http://localhost:5173",
    credentials: true
}) )
app.use( express.json() )
app.use( morgan( "dev" ) )
app.use( cookieParser() )

// Ruta para servir archivos estáticos (imágenes)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadsPath = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsPath));

app.use( "/api", authRoutes )
app.use( "/api", taskRoutes )
app.use("/api", carrito)
app.use("/api", payment)

export default app