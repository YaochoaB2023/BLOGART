import { Router } from "express"
import { register, login, logout, profile, verifyToken, updateUser } from "../controllers/auth.controller.js"
import { requiredAuth } from "../middlewares/tokenValidation.js"
import { registerSchema, loginSchema } from "../schemas/auth.schema.js"
import { validateSchema } from "../middlewares/validator.middlewares.js"
import { upload } from "../controllers/multer.controller.js"

const router = Router()

router.post( "/register", validateSchema( registerSchema ), register )
router.post( "/login", validateSchema( loginSchema ), login )
router.post( "/logout", logout )
router.get('/verify', verifyToken)
router.get( "/profile", requiredAuth, profile )
router.put("/updateUser", requiredAuth, upload.single('file'), updateUser);

export default router