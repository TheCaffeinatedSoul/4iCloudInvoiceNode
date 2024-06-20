import { Router } from 'express'
import { getChecksBySearchController, getDetailsByCheckNumberController } from '../controller/checks'

export const checksRouter = Router()

checksRouter.post('/getdetails', getDetailsByCheckNumberController)
checksRouter.post('/getsearchedchecks', getChecksBySearchController)
