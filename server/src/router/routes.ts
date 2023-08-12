import { Router } from 'express'
import donateRouter from './donateRouter.js'

const router = Router();

router.use('/donate', donateRouter)

export default router