require("./config/config")
const express = require('express')
const cors = require("cors");
const { createServer } = require("http");
const app = express()
const port = 8000
const httpServer = createServer(app);
const router = require("./handler/router")
const mongooseInit = require('./config/mongoose_migration.config')
const socketConfig = require("./config/socket.config")
const socketSession = require("./sockets/socket_session/socket.session")
const socketConnection = require("./sockets/socket_connection/socket.connection")

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/', router)

mongooseInit()
const io = socketConfig(httpServer)

io.use(/* async */ (socket, next) => {
    const SocketSession = /* await */ socketSession(socket, io)
    if (SocketSession instanceof Error) {
        return next(SocketSession);
    }
    socket = SocketSession
    next();
});

io.on("connection", (socket) => {
    socketConnection(socket, io)
})

httpServer.listen(port, () => {
    console.log(`Listening on port ${port}`);
});