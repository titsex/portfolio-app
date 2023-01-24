import { SendDto, ConfirmDto, ChangeStatusDto } from '@dto/offers'
import { Cache } from '@class/Cache'
import { offerRepository } from '@database'
import { MailService } from '@service/mail.service'
import { generateUniqueHex } from '@utils'
import { OfferEntity } from '@model/Offer.entity'

export class OfferService {
    public static async send(data: SendDto) {
        const cachedData = await Cache.getCache(data.email, 'OfferSending')

        if (cachedData)
            throw new Error(
                'This email is already at the last stage of sending the offer and is waiting for confirmation'
            )

        const offer = await offerRepository.create()

        offer.email = data.email
        offer.name = data.name
        offer.message = data.message
        offer.confirmationLink = await generateUniqueHex()

        await MailService.sendConfirmationOfferMail(offer.email, offer.confirmationLink)

        await Cache.setCache(offer.email, JSON.stringify(offer), 'OfferSending')
        return { message: 'To confirm your identity, we have emailed you a link to send an offer' }
    }

    public static async confirm(data: ConfirmDto) {
        const cachedData = await Cache.getCache(data.email, 'OfferSending')
        if (!cachedData) throw new Error('The email is incorrect or the time has expired')

        await Cache.deleteCache(data.email, 'OfferSending')

        const offer: OfferEntity = JSON.parse(cachedData)
        if (offer.confirmationLink !== data.hex) throw new Error('Invalid confirmation link')

        offer.isConfirmed = true
        offer.confirmationLink = ''

        await offerRepository.save(offer)
        return { message: 'Your offer has been successfully delivered' }
    }

    public static async getAll() {
        return await offerRepository.find()
    }

    public static async getOneById(id: number) {
        const candidate = await offerRepository.findOneBy({ id })
        if (!candidate) throw new Error('The offer with such an ID was not found')

        return candidate
    }

    public static async changeStatus(data: ChangeStatusDto) {
        const candidate = await offerRepository.findOneBy({ id: data.id })
        if (!candidate) throw new Error('The offer with such an ID was not found')

        if (candidate.status === data.status)
            throw new Error('You cannot change the status of the offer to the current one')

        candidate.status = data.status
        return await offerRepository.save(candidate)
    }
}
