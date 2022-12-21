const mongoose = require("mongoose")

const blockSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Movie",
    },
})

module.exports = mongoose.model("Block", blockSchema)
