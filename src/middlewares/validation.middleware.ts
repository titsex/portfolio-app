import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { validationHandling } from '@utils'
import { BadRequest } from '@class/Errors'

export function validationMiddleware(request: Request, response: Response, next: NextFunction) {
    const errors = validationResult(request)

    if (!errors.isEmpty()) throw new BadRequest('Error during data validations.', validationHandling(errors))

    next()
}
