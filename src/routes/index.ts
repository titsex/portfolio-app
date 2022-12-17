import { Router } from 'express'
import userRouter from '@route/users'
import { rateLimiterMiddleware } from '@middleware/limiter'

const router = Router()

router.use('/users', rateLimiterMiddleware, userRouter)

export default router
