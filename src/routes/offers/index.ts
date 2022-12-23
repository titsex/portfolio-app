import { Router } from 'express'
import { OfferController } from '@controller/offer.controller'

const offerRouter = Router()

offerRouter.post('/send', OfferController.send)

export default offerRouter
