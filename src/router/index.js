import { Router } from "express";
import userRoutes from './userRoutes.js'
import passwordRoutes from './passwordRouts.js'
const routes = Router()

routes.get('/',(req,res)=>{
    res.send(`<div>
        <h1>Welcome to Backend of reset password</h1>
        <p>Please refer postman collections for API endpoints</p>
    </div>`)
})

routes.use('/user',userRoutes)
routes.use('/password',passwordRoutes)

export default routes