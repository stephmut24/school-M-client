import crypto from 'crypto'
import jwt, { type Secret, type SignOptions } from 'jsonwebtoken'
import { config } from '../config'
import { Db as db } from '../database'
import { DeviceStatus, Role } from '../database/models/enums'
import { RegisterInput, LoginInput } from '../dtos/auth.dto'
import { AppError } from '../utils'

export class AuthService {
    // Hash password in SHA-512
    private hashPassword(password: string): string {
        return crypto.createHash('sha512').update(password).digest('hex')
    }

    // Generate JWT
    private generateToken(payload: {
        id: string
        email: string
        role: Role
        deviceFingerprint: string
    }): string {
        const secret: Secret = config.jwt.secret
        const options: SignOptions = config.jwt.expiresIn
            ? { expiresIn: config.jwt.expiresIn }
            : {}

        return jwt.sign(payload, secret, options)
    }

    // register
    async register(data: RegisterInput): Promise<{
        message: string
        userId: string
    }> {
        // check if user exists
        const existingUser = await db.User.findOne({
            where: { email: data.email }
        })

        if (existingUser) {
            throw new AppError('Email already in use', 400)
        }

        // create user
        const newUserData = {
            email: data.email,
            password: this.hashPassword(data.password),
            role: data.role as Role,
            firstName: data.firstName,
            lastName: data.lastName,
            isActive: true,
            ...(data.phoneNumber ? { phoneNumber: data.phoneNumber } : {})
        }

        const user = await db.User.create(newUserData)

        // create profile by role
        if (data.role === Role.STUDENT) {
            const studentCount = await db.Student.count()
            await db.Student.create({
                userId: user.id,
                studentNumber: `STU-${String(studentCount + 1).padStart(3, '0')}`
            })
        }

        if (data.role === Role.PARENT) {
            await db.Parent.create({
                userId: user.id
            })
        }

        // create Device status PENDING
        await db.Device.create({
            userId: user.id,
            deviceFingerprint: data.deviceFingerprint,
            deviceName: data.deviceName || 'Unknown Device',
            status: DeviceStatus.PENDING
        })

        return {
            message: 'Registration successful. Please wait for admin to verify your device.',
            userId: user.id
        }
    }

    // Login
    async login(data: LoginInput, ipAddress?: string): Promise<{
        token: string
        user: {
            id: string
            email: string
            role: Role
            firstName: string
            lastName: string
        }
    }> {
        // Check if user exist
        const user = await db.User.findOne({
            where: { email: data.email }
        })

        if (!user) {
            throw new AppError('Invalid credentials', 401)
        }

        // check the password
        const hashedPassword = this.hashPassword(data.password)
        if (user.password !== hashedPassword) {
            throw new AppError('Invalid credentials', 401)
        }

        // check if the user is active
        if (!user.isActive) {
            throw new AppError('Account is inactive. Please contact admin.', 403)
        }

        // check if the authorized role
        if (user.role === Role.ADMIN || user.role === Role.TEACHER) {
            throw new AppError('Please use the admin portal to login', 403)
        }

        // look for the device
        const device = await db.Device.findOne({
            where: {
                userId: user.id,
                deviceFingerprint: data.deviceFingerprint
            }
        })

        // if device unknown
        if (!device) {
            const newDeviceData = {
                userId: user.id,
                deviceFingerprint: data.deviceFingerprint,
                deviceName: data.deviceName || 'Unknown Device',
                status: DeviceStatus.PENDING,
                ...(ipAddress ? { ipAddress } : {})
            }

            await db.Device.create({
                ...newDeviceData
            })
            throw new AppError('New device detected. Please wait for admin to verify your device.', 403)
        }

        // check device status
        if (device.status === DeviceStatus.PENDING) {
            throw new AppError('Device pending verification. Please wait for admin approval.', 403)
        }

        if (device.status === DeviceStatus.REJECTED) {
            throw new AppError('Device has been rejected. Please contact admin.', 403)
        }

        // Generate jwt
        const token = this.generateToken({
            id: user.id,
            email: user.email,
            role: user.role,
            deviceFingerprint: data.deviceFingerprint
        })

        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName
            }
        }
    }

    // Get profile
    async getProfile(userId: string): Promise<object> {
        const user = await db.User.findByPk(userId, {
            attributes: { exclude: ['password'] }
        })

        if (!user) {
            throw new AppError('User not found', 404)
        }
        return user
    }
}
