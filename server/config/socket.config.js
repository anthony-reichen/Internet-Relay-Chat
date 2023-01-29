const { Server } = require("socket.io");

function socketConfig(httpServer) {
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })

    return io
}

module.exports = socketConfig;