const asyncHandler = require("express-async-handler")

const User = require("../models/userModel")
const Favorite = require("../models/favoriteModel")
const Movies = require("../models/movieModel")

// GET /api/favorites/all
const getFavorites = asyncHandler(async (req, res) => {
    console.log({ user: req.user })
    const favorites = await Favorite.find({ user: req.user })

    const favoriteIds = favorites.map((favorite) => favorite.movieId)

    const favoriteMovies = await Movies.find({
        _id: { $in: favoriteIds },
    })

    res.status(200).json(favoriteMovies)
})

// POST /api/favorite
const addFavorite = asyncHandler(async (req, res) => {
    if (!req.body.movieId) {
        res.status(400)
        throw new Error("no id")
    }

    // Check if user already has movie with this id in favorites
    const alreadyInFavorites = await Favorite.findOne({
        movieId: req.body.movieId,
        user: req.user.id,
    })

    if (alreadyInFavorites) {
        res.status(400)
        throw new Error("Already in favorites")
    }

    const favorite = await Favorite.create({
        movieId: req.body.movieId,
        user: req.user.id,
    })

    res.status(200).json(favorite)
})

// DELETE /api/favorites
const deleteFavorite = asyncHandler(async (req, res) => {
    const favorite = await Favorite.findOne({
        movieId: req.params.id,
        user: req.user.id,
    })

    // Check if it exists
    if (!favorite) {
        res.status(400)
        throw new Error("Favorite with this id does not exist")
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error("User not found")
    }

    // make sure the logged in user matches the favorite's user
    if (favorite.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User not authorized")
    }

    await favorite.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getFavorites,
    addFavorite,
    deleteFavorite,
}
