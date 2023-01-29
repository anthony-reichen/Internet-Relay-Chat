const Channels = require('../models/channels/channels.schema')

async function mongoose_migration() {
    if (await Channels.findOne({ channel_name: "backroom" }) === null) {
        await Channels.create({
            channel_name: "backroom",
            messages: []
        })
        console.log("channel initialised");
    };
}

module.exports = mongoose_migration