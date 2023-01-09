import { SendDataDto, ConfirmDataDto, ChangeStatusDataDto } from '@dto/offers'
import { Cache } from '@class/Cache'
import { offersRepository } from '@database'
import { MailService } from '@service/mail.service'
import { generateUniqueHex } from '@utils'
import { OfferEntity } from '@model/Offer.entity'

export class OfferService {
    public static async send(data: SendDataDto) {
        if (!data.email) throw new Error('Email is not specified.')
        if (!data.name) throw new Error('Name is not specified.')
        if (!data.message) throw new Error('Message is not specified.')

        const cachedData = await Cache.getCache(data.email, 'OfferSending')

        if (cachedData)
            throw new Error(
                'This email is already at the last stage of sending the offer and is waiting for confirmation.'
            )

        const offer = await offersRepository.create()

        offer.email = data.email
        offer.name = data.name
        offer.message = data.message
        offer.confirmationLink = await generateUniqueHex()

        await MailService.sendConfirmationOfferMail(offer.email, offer.confirmationLink)

        await Cache.setCache(offer.email, JSON.stringify(offer), 'OfferSending')
        return { message: 'To confirm your identity, we have emailed you a link to send an offer.' }
    }

    public static async confirm(data: ConfirmDataDto) {
        if (!data.email) throw new Error('Email is not specified.')
        if (!data.hex) throw new Error('Confirmation link is not specified.')

        const cachedData = await Cache.getCache(data.email, 'OfferSending')
        if (!cachedData) throw new Error('The email is incorrect or the time has expired.')

        await Cache.deleteCache(data.email, 'OfferSending')

        const offer: OfferEntity = JSON.parse(cachedData)
        if (offer.confirmationLink !== data.hex) throw new Error('Invalid confirmation link.')

        offer.isConfirmed = true
        offer.confirmationLink = ''

        await offersRepository.save(offer)
        return { message: 'Your offer has been successfully delivered.' }
    }

    public static async getAll() {
        return await offersRepository.find()
    }

    public static async getOneById(id: number) {
        if (Number.isNaN(id)) throw new Error('The ID must be a number.')

        const candidate = await offersRepository.findOneBy({ id })
        if (!candidate) throw new Error('The offer with such an ID was not found.')

        return candidate
    }

    public static async changeStatus(data: ChangeStatusDataDto) {
        if (Number.isNaN(+data.id)) throw new Error('The ID must be a number.')

        if (!['rejected', 'interested', 'reviewed', 'accepted'].includes(data.status))
            throw new Error(
                "Here are the available statuses for the offer: 'rejected', 'interested', 'reviewed', 'accepted'"
            )

        const candidate = await offersRepository.findOneBy({ id: data.id })
        if (!candidate) throw new Error('The offer with such an ID was not found.')

        candidate.status = data.status
        return await offersRepository.save(candidate)
    }
}
