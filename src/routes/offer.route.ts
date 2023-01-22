import { Router } from 'express'
import { OfferController } from '@controller/offer.controller'
import { checkAuth, checkRole } from '@middleware/index'
import { OfferValidation } from '@validation/offer.validation'

const offerRouter = Router()

offerRouter.post('/send', OfferValidation.send, OfferController.send)
offerRouter.put('/changeStatus', checkAuth, checkRole, OfferValidation.changeStatus, OfferController.changeStatus)
offerRouter.get('/confirm', OfferValidation.confirm, OfferController.confirm)
offerRouter.get('/:id', OfferValidation.getOneById, OfferController.getOneById)
offerRouter.get('/', OfferController.getAll)

export default offerRouter
