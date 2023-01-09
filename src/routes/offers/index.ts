import { Router } from 'express'
import { OfferController } from '@controller/offer.controller'
import { checkAuth, checkRole } from '@middleware/index'

const offerRouter = Router()

offerRouter.post('/send', OfferController.send)
offerRouter.put('/changeStatus', checkAuth, checkRole, OfferController.changeStatus)
offerRouter.get('/confirm', OfferController.confirm)
offerRouter.get('/:id', OfferController.getOneById)
offerRouter.get('/', OfferController.getAll)

export default offerRouter
