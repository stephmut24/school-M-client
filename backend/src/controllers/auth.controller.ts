import { Request, Response } from 'express'
import { AuthService } from '../services/auth.service'
import { ApiResponse, asyncHandler } from '../utils'


export class AuthController {
    private authService: AuthService

    constructor(){
        this.authService = new AuthService()
    }


    // Register
    register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const result = await this.authService.register(req.body)

        ApiResponse.created(
            res,
            { userId: result.userId },
            result.message
        )
    })

    // Login
    login = asyncHandler(async (req:Request, res:Response): Promise<void> => {
        const ipAddress = req.ip || req.socket.remoteAddress
        const result = await this.authService.login(req.body, ipAddress)

        ApiResponse.success(res, result, 'Login successful')
    })

    // logout
    logout = asyncHandler(async (_req: Request, res:Response): Promise<void> => {
        ApiResponse.success(res, null, 'Logged out successfully')
    })

    // Get profile

    getProfile = asyncHandler(async (req:Request, res:Response): Promise<void> => {
        const profile = await this.authService.getProfile(req.user!.id)

        ApiResponse.success(res, profile)
    })

}
