const asyncHandler = require("express-async-handler")

const Movie = require("../models/movieModel")

// GET /api/movies
const getMovies = asyncHandler(async (req, res, next) => {
    const amount = req.query.amount || 20
    const offset = req.query.offset || 0
    const genres = req.query.genres.split(",") || ""

    let movies

    if (genres.length > 0 && genres[0] !== "") {
        movies = await Movie.find({ genre_ids: { $all: genres } })
            .skip(offset)
            .limit(amount)
    } else {
        movies = await Movie.find().skip(offset).limit(amount)
    }

    res.status(200).json(movies)
})

// GET /api/movie/:id
const getMovie = asyncHandler(async (req, res, next) => {
    const movie = await Movie.find({ _id: req.params.id })

    // Check if movie exists
    if (!movie) {
        res.status(400)
        throw new Error("Movie not found")
    }

    res.status(200).json(movie)
})

module.exports = {
    getMovies,
    getMovie,
}
