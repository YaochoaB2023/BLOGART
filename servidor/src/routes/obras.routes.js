import { Router } from "express";
import { getObras, getObra, createObra, updateObra, deleteObra } from "../controllers/obras.controller.js";
import { requireAuth } from "../middlewares/tokenValidation.js";
import { createObraSchema } from "../schema/obras.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";


const router = Router();

router.get('/obras',requireAuth, getObras)
router.get('/obras/:id',requireAuth, getObra)
router.post('/obras',requireAuth, validateSchema(createObraSchema), createObra)
router.put('/obras/:id',requireAuth, updateObra)
router.delete('/obras/:id',requireAuth, deleteObra)

export default router;