import { NextFunction, Response } from 'express'
import { IRequest } from '@types'
import { Unauthorized } from '@class/Errors'
import { GenerateDto } from '@dto/users'
import { TokenService } from '@service/token.service'

export async function checkAuth(request: IRequest, response: Response, next: NextFunction) {
    const authorization = request.headers.authorization
    if (!authorization) throw new Unauthorized()

    const accessToken = authorization.split(' ')[1]
    if (!accessToken) throw new Unauthorized()

    const userData = TokenService.validateAccessToken(accessToken)
    if (!userData) throw new Unauthorized()

    request.user = userData as GenerateDto
    next()
}
