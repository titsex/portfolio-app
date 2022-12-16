import { tokenRepository } from '@database'
import { decode, JwtPayload, sign } from 'jsonwebtoken'
import { UserEntity } from '@model/User.entity'
import { GenerateUserDto } from '@dto/users/generate-user.dto'

export class TokenService {
    public static generateTokens(payload: GenerateUserDto) {
        payload = { ...payload }

        const accessToken = sign(payload, process.env.JWT_ACCESS_KEY!, { expiresIn: '30m' })
        const refreshToken = sign(payload, process.env.JWT_REFRESH_KEY!, { expiresIn: '30d' })

        return { accessToken, refreshToken }
    }

    public static async saveToken(user: UserEntity, refreshToken: string, ip: string) {
        const userTokens = await tokenRepository.findBy({ user: { id: user.id } })

        if (userTokens.length) {
            for (let i = 0; i < userTokens.length; i++) {
                const tokenInfo = decode(userTokens[i].refreshToken) as JwtPayload

                if (Date.now() < tokenInfo.exp!) await tokenRepository.delete(userTokens[i].id)

                if (userTokens[i].ip === ip) {
                    userTokens[i].refreshToken = refreshToken
                    userTokens[i].lastSignIn = Date.now()

                    return await tokenRepository.save(userTokens[i])
                }
            }
        }

        const token = await tokenRepository.create()

        token.user = user
        token.ip = ip
        token.refreshToken = refreshToken
        token.lastSignIn = Date.now()

        return await tokenRepository.save(token)
    }
}
