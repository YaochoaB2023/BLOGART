import  express  from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import ObrasRoutes from './routes/obras.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use( cors({
    origin: "http://localhost:5173",
    credentials: true
}) )
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser()); // para manejar y acceder de forma mas facil  a las cookies
app.use("/api", authRoutes)
app.use("/api", ObrasRoutes)


export default app;