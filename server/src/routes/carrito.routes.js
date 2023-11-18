import { Router } from 'express';
import { createCarritoArte, getCarritoArte, putArte, deleteArte } from '../controllers/carritoController.js';
import { requiredAuth } from "../middlewares/tokenValidation.js"

const router = Router();

router.post('/carrito', requiredAuth, createCarritoArte);
router.get('/carrito/:id', requiredAuth, getCarritoArte);
router.get('/carrito', requiredAuth, getCarritoArte);
router.put('/carrito/:arteId', putArte);
router.delete('/carrito/:arteId', deleteArte);

export default router;