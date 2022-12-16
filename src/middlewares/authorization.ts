import { Response, NextFunction } from 'express'
import { IRequest } from '@types'
import { decode } from 'jsonwebtoken'
import { GenerateUserDto } from '@dto/users/generate-user.dto'
import { tokenRepository } from '@database'
import { Unauthorized } from '@class/Errors'

export async function checkAuth(request: IRequest, response: Response, next: NextFunction) {
    const refreshToken = request.cookies['refreshToken']
    if (!refreshToken) throw new Unauthorized()

    const candidate = await tokenRepository.findOneBy({ refreshToken })
    if (!candidate) throw new Unauthorized()

    if (typeof refreshToken !== 'string') throw new Unauthorized()

    const tokenInfo = decode(refreshToken)
    if (!tokenInfo || typeof tokenInfo !== 'object') throw new Unauthorized()

    request.user = tokenInfo as GenerateUserDto
    next()
}
