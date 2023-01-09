import { Response, NextFunction } from 'express'
import { IRequest } from '@types'

export async function validateData(request: IRequest, response: Response, next: NextFunction) {
    // validate
    next()
}
