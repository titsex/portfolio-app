import { Request, Response } from 'express'
import { getErrorMessage } from '@utils'
import { BadRequest } from '@class/Errors'
import { SocialService } from '@service/social.service'

export class SocialController {
    public static async add(request: Request, response: Response) {
        try {
            const { title, url, icon } = request.body

            const result = await SocialService.add({ title, url, icon })

            return response.status(200).json(result)
        } catch (error) {
            throw new BadRequest('An error occurred during the social adding.', getErrorMessage(error))
        }
    }

    public static async delete(request: Request, response: Response) {
        try {
            const { id } = request.params

            const result = await SocialService.delete(+id)

            return response.status(200).json(result)
        } catch (error) {
            throw new BadRequest('An error occurred during the social deleting.', getErrorMessage(error))
        }
    }

    public static async getOneById(request: Request, response: Response) {
        try {
            const { id } = request.params

            const result = await SocialService.getOneById(+id)

            return response.status(200).json(result)
        } catch (error) {
            throw new BadRequest('An error occurred during the social getting.', getErrorMessage(error))
        }
    }

    public static async getAll(request: Request, response: Response) {
        try {
            const result = await SocialService.getAll()

            return response.status(200).json(result)
        } catch (error) {
            throw new BadRequest('An error occurred during the social getting.', getErrorMessage(error))
        }
    }
}
