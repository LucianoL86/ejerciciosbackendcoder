import realTimeServer from './realTimeServer.js'
import app from './app.js'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 8080

const httpServer = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

realTimeServer(httpServer)