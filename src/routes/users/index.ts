import { Router } from 'express'
import { UserController } from '@controller/user.controller'
import { checkAuth } from '@middleware/authorization'

const userRouter = Router()

userRouter.post('/registration', UserController.registration)
userRouter.post('/login', UserController.login)
userRouter.post('/logout', checkAuth, UserController.logout)

export default userRouter
