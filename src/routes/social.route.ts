import { Router } from 'express'
import { checkAuth } from '@middleware/checkAuth.middleware'
import { checkRole } from '@middleware/checkRole.middleware'
import { SocialValidation } from '@validation/social.validation'
import { SocialController } from '@controller/social.controller'

const socialRoute = Router()

socialRoute.post('/add', checkAuth, checkRole, SocialValidation.add, SocialController.add)
socialRoute.delete('/delete/:id', checkAuth, checkRole, SocialValidation.delete, SocialController.delete)
socialRoute.get('/:id', checkAuth, checkRole, SocialValidation.getOneById, SocialController.getOneById)
socialRoute.get('/', checkAuth, checkRole, SocialController.getAll)

export default socialRoute
