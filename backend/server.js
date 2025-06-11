import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import jsonRouter from './routers/jsonRouter.js'


dotenv.config()
const app = express()
const PORT = process.env.PORT || 5001
const corsOptions = {
    origin: 'http://localhost:5000',
    origin: 'http://localhost:5001',
    origin: 'http://localhost:5173',
    origin: 'http://localhost:3000',
}


// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())



// routes
app.get('/', (req,res)=>{
    res.send('Hello World!')
})

app.use('/api', jsonRouter)


// listen
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})