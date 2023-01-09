import { Request, Response } from 'express'
import { BadRequest } from '@class/Errors'
import { getErrorMessage } from '@utils'
import { OfferService } from '@service/offer.service'

export class OfferController {
    public static async send(request: Request, response: Response) {
        try {
            const { email, name, message } = request.body

            const result = await OfferService.send({ email, name, message })

            return response.status(200).json(result)
        } catch (error) {
            throw new BadRequest('An error occurred while sending the offer', getErrorMessage(error))
        }
    }

    public static async confirm(request: Request, response: Response) {
        try {
            const { email, hex } = request.query

            const result = await OfferService.confirm({ email: email as string, hex: hex as string })

            return response.status(200).json(result)
        } catch (error) {
            throw new BadRequest(
                'An error occurred while confirming the submission of the offer.',
                getErrorMessage(error)
            )
        }
    }

    public static async getAll(request: Request, response: Response) {
        try {
            const result = await OfferService.getAll()
            return response.status(200).json(result)
        } catch (error) {
            throw new BadRequest('An error occurred while receiving all offers.', getErrorMessage(error))
        }
    }

    public static async getOneById(request: Request, response: Response) {
        try {
            const { id } = request.params

            const result = await OfferService.getOneById(+id)

            return response.status(200).json(result)
        } catch (error) {
            throw new BadRequest('An error occurred while receiving offer.', getErrorMessage(error))
        }
    }

    public static async changeStatus(request: Request, response: Response) {
        try {
            const { id, status } = request.body

            const result = await OfferService.changeStatus({ id, status })

            return response.status(200).json(result)
        } catch (error) {
            throw new BadRequest('An error occurred when changing the offer status.', getErrorMessage(error))
        }
    }
}
