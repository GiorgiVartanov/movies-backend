const asyncHandler = require("express-async-handler")

const Genre = require("../models/genreModel")

//GET /api/genres/all
const getAllGenres = asyncHandler(async (req, res, next) => {
    const genres = await Genre.find()

    res.status(200).json(genres.map((genre) => genre.name))
})

module.exports = {
    getAllGenres,
}
