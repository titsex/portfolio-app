import { Request, Response } from 'express'
import { UserService } from '@service/user.service'
import { getErrorMessage, getIp } from '@utils'
import { IRequest } from '@types'

export class UserController {
    public static async registration(request: Request, response: Response) {
        try {
            const { email, password } = request.body

            const userData = await UserService.registration({ email, password, ip: getIp(request) })

            response.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

            return response.status(200).json(userData)
        } catch (error) {
            const message = getErrorMessage(error)

            return response.status(400).json({
                message: 'An error occurred during user registration.',
                error: message || 'No error details',
            })
        }
    }

    public static async login(request: Request, response: Response) {
        try {
            const { email, password } = request.body

            const userData = await UserService.login({ email, password, ip: getIp(request) })

            response.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

            return response.status(200).json(userData)
        } catch (error) {
            const message = getErrorMessage(error)

            return response.status(400).json({
                message: 'An error occurred during the user login.',
                error: message || 'No error details',
            })
        }
    }

    public static async logout(request: IRequest, response: Response) {
        await UserService.logout(request.cookies['refreshToken'])

        request.user = undefined
        response.clearCookie('refreshToken')

        return response.status(200).json({ message: 'You have successfully logged out' })
    }
}
