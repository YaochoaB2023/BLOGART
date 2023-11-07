import { Router } from "express";
import { getTasks, getTask, createTask, updateTask, deleteTask } from "../controllers/task.controller.js";
import { requiredAuth } from "../middlewares/tokenValidation.js"
import { validateSchema } from "../middlewares/validator.middlewares.js"
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router()

router.get( "/tasks", requiredAuth, getTasks )
router.get( "/task/:id", requiredAuth, getTask )
router.post( "/task", requiredAuth, validateSchema(createTaskSchema) , createTask )
router.put( "/task/:id", requiredAuth, updateTask )
router.delete( "/task/:id", requiredAuth, deleteTask )

export default router