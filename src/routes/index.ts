import { Router } from 'express'
import { rateLimiterMiddleware } from '@middleware/limiter'

import userRouter from '@route/users'
import offerRouter from '@route/offers'

const router = Router()

router.use('/users', rateLimiterMiddleware, userRouter)
router.use('/offers', rateLimiterMiddleware, offerRouter)

export default router
