import { Request, Response } from 'express'
import { UserService } from '@service/user.service'
import { getErrorMessage, getIp } from '@utils'
import { IRequest } from '@types'
import { BadRequest } from '@class/Errors'

export class UserController {
    public static async registration(request: Request, response: Response) {
        try {
            const { email, password } = request.body

            const result = await UserService.registration({ email, password, ip: getIp(request) })

            return response.status(200).json(result)
        } catch (error) {
            const message = getErrorMessage(error)

            throw new BadRequest(
                'An error occurred during user registration.',
                message
                    ? /No recipients defined|rejected/i.test(message)
                        ? 'Such mail does not exist or is blocked.'
                        : message
                    : message
            )
        }
    }

    public static async activate(request: Request, response: Response) {
        try {
            const { email, hex } = request.query

            const userData = await UserService.activate({
                email: email as string,
                hex: hex as string,
                ip: getIp(request),
            })

            response.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

            return response.status(200).json(userData)
        } catch (error) {
            throw new BadRequest('An error occurred during account activation.', getErrorMessage(error))
        }
    }

    public static async login(request: Request, response: Response) {
        try {
            const { email, password } = request.body

            const userData = await UserService.login({ email, password, ip: getIp(request) })

            response.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

            return response.status(200).json(userData)
        } catch (error) {
            throw new BadRequest('An error occurred during the user login.', getErrorMessage(error))
        }
    }

    public static async logout(request: IRequest, response: Response) {
        try {
            await UserService.logout(request.cookies['refreshToken'])

            request.user = undefined
            response.clearCookie('refreshToken')

            return response.status(200).json({ message: 'You have successfully logged out' })
        } catch (error) {
            throw new BadRequest('An error occurred during the user logout.', getErrorMessage(error))
        }
    }
}
