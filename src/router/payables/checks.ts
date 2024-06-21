import { Router } from 'express'
import { getChecksBySearchController, getDetailsByCheckNumberController } from '../../controller/payables/checks'

export const checksRouter = Router()

checksRouter.post('/getdetails', getDetailsByCheckNumberController)
checksRouter.post('/getsearchedchecks', getChecksBySearchController)
