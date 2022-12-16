import { AuthorizationDataDto } from '@dto/users/authorization-data.dto'
import { tokenRepository, userRepository } from '@database'
import { compare, hash } from 'bcrypt'
import { generateUniqueHex, randomNumber } from '@utils'
import { GenerateUserDto } from '@dto/users/generate-user.dto'
import { TokenService } from '@service/token.service'
import { Roles } from '@types'
import { MailService } from '@service/mail.service'

export class UserService {
    public static async registration(data: AuthorizationDataDto) {
        if (!data.email) throw new Error('Email is not specified')
        if (!data.password) throw new Error('Password is not specified')

        const candidate = await userRepository.findOneBy({ email: data.email })
        if (candidate) throw new Error('A user with such an email is already registered')

        const password = await hash(data.password, randomNumber(5, 7))
        const user = await userRepository.create()

        user.email = data.email
        user.password = password
        user.isActivated = false
        user.activationLink = await generateUniqueHex()
        user.role = [Roles.USER]

        await MailService.sendActivationMail(user.email, user.activationLink)
        await userRepository.save(user)

        const userInfo = new GenerateUserDto(user)
        const tokens = TokenService.generateTokens(userInfo)

        await TokenService.saveToken(user, tokens.refreshToken, data.ip)
        return { ...tokens, user: userInfo }
    }

    public static async login(data: AuthorizationDataDto) {
        if (!data.email) throw new Error('Email is not specified')
        if (!data.password) throw new Error('Password is not specified')

        const user = await userRepository.findOneBy({ email: data.email })
        if (!user) throw new Error('The user with this email is not registered')

        const isPassEquals = await compare(data.password, user.password)
        if (!isPassEquals) throw new Error('Invalid password')

        const userInfo = new GenerateUserDto(user)
        const tokens = TokenService.generateTokens(userInfo)

        await TokenService.saveToken(user, tokens.refreshToken, data.ip)
        return { ...tokens, user: userInfo }
    }

    public static async logout(refreshToken: string) {
        const candidate = await tokenRepository.findOneBy({ refreshToken })
        if (!candidate) throw new Error('You were not logged in.')

        return await tokenRepository.delete(candidate.id)
    }
}
