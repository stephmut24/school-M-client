import { Request, Response, NextFunction, RequestHandler } from 'express'
import { AppError } from './appError'
import { ApiResponse } from './apiResponse'
import { ZodError } from 'zod'

type AsyncFunction = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<unknown>

// wrapper pour eviter les try/catch dans chaque controller

export const asyncHandler = (fn: AsyncFunction): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next)
    }
}

// Global middleware 
export const errorHandler = (
    error:Error,
    req: Request,
    res:Response,
    //next: NextFunction
): void => {
    if (error instanceof ZodError){
        ApiResponse.error(
            res,
            'validation failed',
            400,
            error.issues.map(issue => ({
                Field: issue.path.join('.'),
                message: issue.message
            }))
        )
        return
    }

    //operational error (AppError)
    if(error instanceof AppError) {
        ApiResponse.error(
            res,
            error.message,
            error.statusCode,
            error.errors?.map(err => ({
                Field: err.field,
                message: err.message
            }))
        )
        return
    }

    //sequelize error - unique constraint error
    if(error.name === 'SequelizeUniqueConstraintError'){
        ApiResponse.error(res, 'Resource already exists', 409)
        return
    }
    
    // sequelize error - Foreign key constraint error
    if(error.name === 'SequelizeForeignKeyConstraintError'){
        ApiResponse.error(res, 'Related resource not found', 404)
        return
    }

    // sequelize error - validation error
    if(error.name === 'SequelizeValidationError'){
        ApiResponse.error(res, 'Database validation failed', 400)
        return
    }

    // erreur inconnue
    console.error('Unexpected error:', error)
    ApiResponse.error(res, 'Internal server error', 500)
}