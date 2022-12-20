const mongoose = require("mongoose")

const movieSchema = mongoose.Schema({
    backdrop_path: String,
    genre_ids: [String],
    overview: String,
    poster_path: String,
    release_date: String,
    title: String,
    vote_average: Number,
})

module.exports = mongoose.model("Movie", movieSchema)
