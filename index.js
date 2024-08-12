import express from 'express'
import 'dotenv/config.js'
import cors from 'cors'
import routes from './src/router/index.js'
const PORT = process.env.PORT
const app = express()

app.use(cors({
    origin: 'http://http://localhost:5173/', // Replace with your frontend's local URL if it's different
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}))
app.use(express.json())
app.use(routes)

app.listen(PORT,()=>console.log(`Server listening at port ${PORT}`))
