import { Router } from "express";
import { getTasks, getAllObras, getTask, createTask, updateTask, deleteTask } from "../controllers/task.controller.js";
import { requiredAuth } from "../middlewares/tokenValidation.js"
import { validateSchema } from "../middlewares/validator.middlewares.js"
import { createTaskSchema } from "../schemas/task.schema.js";
import { upload } from "../controllers/multer.controller.js";

const router = Router()

router.get( "/userObras", requiredAuth, getTasks )
router.get( '/allObras', getAllObras )
router.get( "/task/:id", requiredAuth, getTask )
router.post( "/createObra", requiredAuth, upload.single('file'), validateSchema(createTaskSchema) , createTask )
router.put( "/updateObra/:id", requiredAuth, updateTask )
router.delete( "/deleteObra/:id", requiredAuth, deleteTask )

export default router