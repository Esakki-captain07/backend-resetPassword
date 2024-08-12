import { Router } from "express";
import userSevice from "../service/userSevice.js";

const routes = Router()

routes.post('/',userSevice.createUser)
routes.post('/login',userSevice.loginUser)


export default routes