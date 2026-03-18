import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config'
import { Db as db } from '../database'
import { DeviceStatus, Role } from '../database/models/enums'
import { ApiResponse } from '../utils'

declare module 'express' {
    interface Request {
        user?: {
            id: string
            email: string
            role: Role
            deviceFingerprint?: string
        }
    }

}

export class AuthMiddleware {
    // check jwt

    static isAuthenticated = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> =>{
        try {
            const jwtSecret = config.jwt.secret
            if (!jwtSecret) {
                ApiResponse.error(res, 'Server configuration error', 500)
                return
            }
            const authHeader = req.headers.authorization

            if(!authHeader || !authHeader.startsWith('Bearer ')){
                ApiResponse.error(res, 'No token provided', 401)
                return
            }

            const token = authHeader.split(' ')[1]

            interface JwtPayload {
                id: string
                email: string
                role: Role
                deviceFingerprint: string
            }

            if (!token) {
                ApiResponse.error(res, 'Token missing', 401)
                return
            }

            const decoded = jwt.verify(token, jwtSecret) as unknown as JwtPayload

            // check if user exists in the database
            const user = await db.User.findByPk(decoded.id)

            if (!user || !user.isActive) {
                ApiResponse.error(res, 'User not found or inactive', 401)
                return
            }
            req.user = {
                id: decoded.id,
                email: decoded.email,
                role:decoded.role,
                deviceFingerprint: decoded.deviceFingerprint
            }
            next()
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError){
                ApiResponse.error(res, 'Token expired', 401)
                return
            }
            if (error instanceof jwt.JsonWebTokenError){
                ApiResponse.error(res, 'Invalid token', 401)
                return
            }
            next(error)
        }

    }

    // check the device
    static isDeviceVerified = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            if (!req.user?.deviceFingerprint){
                ApiResponse.error(res, 'Device fingerprint missing', 401)
                return
            }

            const device = await db.Device.findOne({
                where: {
                    userId: req.user.id,
                    deviceFingerprint: req.user.deviceFingerprint
                }
            })

            if (!device) {
                ApiResponse.error(res, 'Device not found', 401)
                return
            }

            if (device.status === DeviceStatus.PENDING){
                ApiResponse.error(res, 'Device pending verification. Please wait for admin approval.', 403)
                return
            }

            if (device.status === DeviceStatus.REJECTED){
                ApiResponse.error(res, 'Device has been rejected. Please contact admin', 403)
                return
            }
            next()
        } catch (error) {
            next(error)    
        }
    }

    // check role
    static hasRole = (...role:Role[]) =>{
        return (req: Request, res: Response, next:NextFunction): void =>{
            if (!req.user) {
                ApiResponse.error(res, 'Unauthorized', 401)
                return
            }

            if (!role.includes(req.user.role)) {
                ApiResponse.error(res, 'Forbidden: insufficient permissions', 403)
                return
            }
            next()
        }
    }


}
