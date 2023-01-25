import { Router } from 'express'
import { rateLimiterMiddleware } from '@middleware/index'

import userRouter from '@route/user.route'
import offerRouter from '@route/offer.route'
import socialRoute from '@route/social.route'

const router = Router()

router.use('/users', rateLimiterMiddleware, userRouter)
router.use('/offers', rateLimiterMiddleware, offerRouter)
router.use('/socials', rateLimiterMiddleware, socialRoute)

export default router
