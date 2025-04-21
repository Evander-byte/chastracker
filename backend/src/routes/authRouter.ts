import { Router } from "express"
import { AuthController } from "../controllers/AuthController"
import { body } from "express-validator"
import { handleInputError } from "../middleware/validation"
import { limiter } from "../config/db/limiter"

const router = Router()

router.use(limiter)

router.post("/create_account", 
    body('name').notEmpty().withMessage('Name cannot be empty'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 8}).withMessage('Password must be eight characters long'),
    handleInputError,
    AuthController.createAccount)

router.post("/confirm_account",
    body('token').notEmpty().isLength({min: 6, max: 6}).withMessage('Invalid token'),
    handleInputError,
    AuthController.confirmAccount
)

router.post("/login",
    body('email').isEmail().withMessage("Invalid email"),
    body('password').notEmpty().withMessage("Password cannot be empty"),
    handleInputError,
    AuthController.login
)

export default router