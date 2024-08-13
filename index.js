import express from 'express'
import 'dotenv/config.js'
import cors from 'cors'
import routes from './src/router/index.js'
const PORT = process.env.PORT || 5000;
const app = express()

app.use(cors({
    origin: 'https://passwordreset-front-end.netlify.app',
    methods: 'POST',
    allowedHeaders: 'Content-Type,Authorization'
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
app.use(routes)



app.listen(PORT,()=>console.log(`Server listening at port ${PORT}`))
