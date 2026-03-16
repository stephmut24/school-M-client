import { Response } from 'express'

interface PaginationMeta {
    total: number
    page: number
    limit: number
    totalPages: number
}
export class ApiResponse {
    // sucess
    static success<T>(
        res: Response,
        data:T,
        message: string = 'success',
        statusCode: number = 200

    ): Response {
        return res.status(statusCode).json({
            success: true,
            message,
            data
        })
    }

    // creation
    static created<T>(
        res: Response,
        data: T,
        message: string = 'Created successfully'
    ): Response {
        return res.status(201).json({
            success: true,
            message,
            data
        })
    }

    // Pagination success
    static paginated<T>(
        res: Response,
        data: T[],
        meta: PaginationMeta,
        message: string = 'success'
    ): Response {
        return res.status(200).json({
            success: true,
            message,
            data,
            meta
        })
    }

    // errors
    static error(
        res: Response,
        message: string,
        statusCode: number = 500,
        errors?: Array<{Field: string; message: string}>
    ): Response {
        const response : Record<string, unknown> = {
            success: false,
            message
        }

        if (errors && errors.length > 0) {
            response.errors = errors
        }
        return res.status(statusCode).json(response)
    }
    //No content
    static noContent(res: Response) : Response {
        return res.status(204).send()
    }

}