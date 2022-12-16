import { NextFunction, Request, Response } from 'express'
import { HttpError } from '@class/Errors'

export function errorMiddleware(error: Error | HttpError, request: Request, response: Response, _: NextFunction) {
    if (error instanceof HttpError) {
        const { statusCode, ...data } = error

        return response.status(statusCode).json(data)
    }

    return response.status(404).send({
        error: 'Does not exist',
        message: 'Does not exist',
    })
}
