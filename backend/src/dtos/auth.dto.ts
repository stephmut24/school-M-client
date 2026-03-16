import {z} from 'zod'

export const registerSchema = z.object({
    body: z.object({
        email: z
            .string()
            .min(1,'Email is required')
            .email('Invalid email format'),

        password: z
            .string()
            .min(1, 'Password is required')
            .min(8, 'Password must be at least 8 characters')
            .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .regex(/[0-9]/, 'Password must contain at least one number')
            .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),

        firstName: z
            .string()
            .min(1, 'First name is required')
            .min(2, 'First name must be at least 2 characters'),

        lastName: z
            .string()
            .min(1, 'Last name is required')
            .min(2, 'Last name must be at least 2 characters'),
        
            phoneNumber: z  
                .string()
                .optional(),

            role: z.enum(['STUDENT', 'PARENT'], {
                error: 'Role must be STUDENT or PARENT'
            }),

            deviceFingerprint: z
                .string()
                .min(1, 'Device fingerprint is required'),

            deviceName: z   
                .string()
                .optional()
    })
})

export const loginSchema = z.object({
    body: z.object({
        email: z
            .string()
            .min(1, 'Email is required')
            .email('Invalid email format'),
        
            password: z
                .string()
                .min(1, 'Password is required'),

            deviceFingerprint: z
                .string()
                .min(1, 'Device fingerprint is required')
    })
})
export type RegisterInput = z.infer<typeof registerSchema>['body']
export type LoginInput = z.infer<typeof loginSchema>['body']