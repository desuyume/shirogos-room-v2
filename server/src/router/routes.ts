import { Router } from 'express'
import donateRouter from './donateRouter.js'
import uniqueRoleRouter from './uniqueRoleRouter.js'

const router = Router();

router.use('/donate', donateRouter)
router.use('/uniqueRole', uniqueRoleRouter)

export default router