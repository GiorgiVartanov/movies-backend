const mongoose = require("mongoose")

const favoriteSchema = mongoose.Schema(
    {
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
    },
    {
        timestamps: true,
    }
)

// favoriteSchema.index({ user: 1, id: 1 }, { unique: true })

module.exports = mongoose.model("Favorite", favoriteSchema)
