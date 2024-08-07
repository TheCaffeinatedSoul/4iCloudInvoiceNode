import { Router } from 'express'
import { LoginController } from '../../controller/login/login'

export const loginRouter = Router()

loginRouter.post('/userlogin', LoginController)
