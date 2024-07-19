import { Router } from 'express'
import { assetsRouter } from './assets'

export const fixedAssetsRouter = Router()

fixedAssetsRouter.use('/assets', assetsRouter)
