import { Router } from 'express';
import { createOrder } from '../controllers/pagos,controller.js';
import { requiredAuth } from "../middlewares/tokenValidation.js";

const router = Router()

router.post('/create-order',requiredAuth, createOrder)

export default router