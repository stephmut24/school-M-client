import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'
import { AuthMiddleware } from '../middlewares/auth.middleware'
import { validate } from '../middlewares/validate.middleware'
import { registerSchema, loginSchema } from '../dtos/auth.dto'

const authRoute: Router = Router()
const authController = new AuthController()

//public routes

authRoute.post('/register', validate(registerSchema), authController.register)

authRoute.post('/login', validate(loginSchema), authController.login)

//Private routes

authRoute.get('/me', AuthMiddleware.isAuthenticated, AuthMiddleware.isDeviceVerified, authController.getProfile)

authRoute.post('/logout', AuthMiddleware.isAuthenticated, authController.logout)

export default authRoute
