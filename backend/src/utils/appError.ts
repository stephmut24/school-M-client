export class AppError extends Error {
    public statusCode!: number;
    public isOperational!: boolean
    public errors?: Array<{field: string; message: string}> | undefined

    constructor(
        message: string,
        statusCode: number = 500,
        errors?:Array<{field: string; message:string}>
    ){
        super(message)
        this.statusCode = statusCode
        this.isOperational = true
        this.errors = errors

        // Maintenir le prototype correct en TS
        Object.setPrototypeOf(this, AppError.prototype)
        Error.captureStackTrace(this, this.constructor)
    }

    // Predefine errors

    static badRequest(
        message: string,
        errors?: Array<{field:string; message: string}>
    ): AppError {
        return new AppError(message, 400, errors)
    }

    static unauthorized(message: string ='Unauthorized' ): AppError {
        return new AppError(message, 401)
    }
    static forbidden(message:string = 'Forbidden'): AppError {
        return new AppError(message, 403)
    }
    static notFound(message: string = 'Resource not found'): AppError {
        return new AppError(message, 404)
    }
    static conflict(message: string): AppError {
        return new AppError(message, 409)
    }

    static internal(message: string = 'Internal server error'): AppError{
        return new AppError(message, 500)
    }


}