import { Router } from 'express'
import donateRouter from './donateRouter.js'
import uniqueRoleRouter from './uniqueRoleRouter.js'
import roomContentRouter from './roomContentRouter.js'

const router = Router();

router.use('/donate', donateRouter)
router.use('/uniqueRole', uniqueRoleRouter)
router.use('/roomContent', roomContentRouter)

export default router