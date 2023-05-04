const asyncHandler = require("express-async-handler")

const User = require("../models/userModel")
const Movies = require("../models/movieModel")
const Block = require("../models/blockModel")

// GET /api/block/movies
const getBlockedMovies = asyncHandler(async (req, res) => {
    const blockedMovieList = await Block.find({ user: req.user })

    const blockedIds = blockedMovieList.map(
        (blockedMovie) => blockedMovie.movieId
    )

    const blockedMovies = await Movies.find({
        _id: { $in: blockedIds },
    })

    res.status(200).json(blockedMovies)
})

// GET /api/block/ids
const getBlockedIds = asyncHandler(async (req, res) => {
    const blockedMovieIds = await Block.find({ user: req.user._id })

    const blockedIds = blockedMovieIds.map(
        (blockedMovie) => blockedMovie.movieId
    )

    res.status(200).json(blockedIds)
})

// POST /api/block
const addBlocked = asyncHandler(async (req, res) => {
    if (!req.body.movieId) {
        res.status(400)
        throw new Error("no id")
    }

    // Check if user already has movie with this id in blocked
    const alreadyBlocked = await Block.findOne({
        movieId: req.body.movieId,
        user: req.user.id,
    })

    if (alreadyBlocked) {
        res.status(400)
        throw new Error("Already blocked")
    }

    await Block.create({
        movieId: req.body.movieId,
        user: req.user.id,
    })

    const blockedMovie = await Movies.findById(req.body.movieId)

    console.log({ blockedMovie })

    res.status(200).json(blockedMovie)
})

// DELETE /api/blockList
const deleteBlocked = asyncHandler(async (req, res) => {
    const blockedMovie = await Block.findOne({
        movieId: req.params.id,
        user: req.user.id,
    })

    // Check if it exists
    if (!blockedMovie) {
        res.status(400)
        throw new Error("Favorite with this id does not exist")
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error("User not found")
    }

    // make sure the logged in user matches the favorite's user
    if (blockedMovie.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User not authorized")
    }

    await blockedMovie.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getBlockedIds,
    getBlockedMovies,
    addBlocked,
    deleteBlocked,
}
