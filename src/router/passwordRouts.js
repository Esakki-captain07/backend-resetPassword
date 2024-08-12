import { Router } from "express";
import passwordService from '../service/passwordService.js'


const routes = Router()

routes.post('/forgot',passwordService.forgotPassword)
routes.post('/reset',passwordService.resetPassword)

export default routes