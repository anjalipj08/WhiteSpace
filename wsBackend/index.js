require('dotenv').config()

const express = require('express')

const cors = require('cors')

require('./config/db')

const route = require('./router/route')

const wsServer = express()

wsServer.use(cors())
wsServer.use(express.json())//middleware
wsServer.use(route)
wsServer.use('/uploads', express.static('./uploads'))

const PORT = 3000 || process.env.PORT

wsServer.get('/',(req,res)=>{
    res.send("Welcome to White Space Server");
})

wsServer.listen(PORT,()=>{
    console.log(`whiteSpace server running on port ${PORT}`);
})