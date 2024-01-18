import { Server } from 'socket.io'

const messages = []

const realTimeServer = (httpServer) => {
    const io = new Server(httpServer)
    
    io.on('connection', (socket) => {
        console.log(`New client connected: ${socket.id}`)

        socket.on('message-from-client', data => {
            messages.push(data)
            
            io.emit('messagelogs', messages)
        })

        socket.on('authenticated', data => {
            socket.emit('messagelogs', messages)

            socket.broadcast.emit('new-user', data)
        })
    })
}

export default realTimeServer
