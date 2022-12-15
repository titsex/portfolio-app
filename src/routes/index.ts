import { Router } from 'express'
import userRouter from '@route/users'

const router = Router()

router.use('/users', userRouter)

export default router
