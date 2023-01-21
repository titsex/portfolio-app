import { Router } from 'express'
import { UserController } from '@controller/user.controller'
import { UserValidation } from '@validation/user.validation'

const userRouter = Router()

userRouter.post('/registration', UserValidation.registration, UserController.registration)
userRouter.post('/login', UserValidation.login, UserController.login)
userRouter.post('/logout', UserController.logout)
userRouter.get('/activate', UserValidation.activate, UserController.activate)
userRouter.get('/refresh', UserController.refresh)

export default userRouter
