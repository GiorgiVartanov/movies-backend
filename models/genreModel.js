const mongoose = require("mongoose")

const genreSchema = mongoose.Schema({
    name: {
        type: String,
    },
})

module.exports = mongoose.model("Genre", genreSchema)
