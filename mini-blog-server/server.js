const express = require('express')
const cors = require('cors')
const connect = require('./db/conn')
const postRouter = require('./routes/postRoutes')
const authRouter = require('./routes/authRoutes')
require('dotenv').config()

const PORT = process.env.PORT

const app = express()
//parsing
app.use(express.json())
//cors
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  exposedHeaders: ['Authorization']  
}));

//routes
app.use('/api/posts', postRouter)
app.use('/api/auth', authRouter)

//MongDB connection
connect()

//App listening
app.listen(PORT, () => console.log(`Server running on port-${PORT}`))