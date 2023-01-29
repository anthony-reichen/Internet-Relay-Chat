const Channel = require("../../models/channels/channels.schema")
const channelsRequests = require("../../db/channels/request.channels")

function socketMessage(socket, io) {
    socket.on("message", (message) => {
        message.timestamp = Date.now();
        io.to(message.room).emit("message", message);

        if (message.sender != "IRC manager") {
            Channel.find(
                { channel_name: message.room }, "_id"
            ).then(result => {
                var channelId = result[0]._id.toString();
                var dbMessage = {
                    sender: socket.username,
                    body: message.body,
                    timestamp: message.timestamp
                }
                Channel.findOneAndUpdate(
                    { _id: channelId },
                    { $push: { messages: dbMessage } },
                    function (error, success) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(success);
                        }
                    }
                );
            });
        }
    });
}

module.exports = socketMessage