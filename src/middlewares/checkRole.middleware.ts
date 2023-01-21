import { Response, NextFunction } from 'express'
import { IRequest, Roles } from '@types'
import { Forbidden, Unauthorized } from '@class/Errors'

export async function checkRole(request: IRequest, response: Response, next: NextFunction) {
    if (!request.user) throw new Unauthorized()

    if (!request.user.roles.includes(Roles.DEVELOPER)) throw new Forbidden()

    next()
}
