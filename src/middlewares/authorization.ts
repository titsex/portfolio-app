import { Response, NextFunction } from 'express'
import { IRequest } from '@types'
import { decode } from 'jsonwebtoken'
import { GenerateUserDto } from '@dto/users/generate-user.dto'
import { tokenRepository } from '@database'

export async function checkAuth(request: IRequest, response: Response, next: NextFunction) {
    try {
        const refreshToken = request.cookies['refreshToken']
        if (!refreshToken) return response.status(401).json({ message: 'Unauthorized' })

        const candidate = await tokenRepository.findOneBy({ refreshToken })
        if (!candidate) return response.status(401).json({ message: 'Unauthorized' })

        const tokenInfo = decode(refreshToken)
        if (!tokenInfo || typeof tokenInfo !== 'object') return response.status(401).json({ message: 'Unauthorized' })

        request.user = tokenInfo as GenerateUserDto
        next()
    } catch (error) {
        return response.status(401).json({ message: 'Unauthorized' })
    }
}
