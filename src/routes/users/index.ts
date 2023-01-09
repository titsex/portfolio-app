import { Router } from 'express'
import { UserController } from '@controller/user.controller'

const userRouter = Router()

userRouter.post('/registration', UserController.registration)
userRouter.post('/login', UserController.login)
userRouter.post('/logout', UserController.logout)
userRouter.get('/activate', UserController.activate)
userRouter.get('/refresh', UserController.refresh)

export default userRouter
