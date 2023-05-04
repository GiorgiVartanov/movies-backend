const asyncHandler = require("express-async-handler")

const Movie = require("../models/movieModel")
const Block = require("../models/blockModel")

// GET /api/movies
const getMovies = asyncHandler(async (req, res) => {
  const amount = req.query.amount || 20
  const offset = req.query.offset || 0
  const genres = req.query.genres?.split(",") || ""

  let movies
  let amountOfMovies

  if (genres?.length > 0 && genres[0] !== "") {
    movies = await Movie.find({
      genre_ids: { $all: genres },
    })
      .skip(offset)
      .limit(amount)

    amountOfMovies = (
      await Movie.find({
        genre_ids: { $all: genres },
      })
    ).length
  } else {
    movies = await Movie.find().skip(offset).limit(amount)
    amountOfMovies = (await Movie.find()).length
  }

  //   const amountOfMovies = (await Movie.find()).length
  const pages = Math.ceil(amountOfMovies / amount)

  const currentPage = offset

  res.status(200).json({
    information: {
      amountOfMovies: amountOfMovies,
      offset: offset,
      showPerPage: amount,
    },
    movies: movies,
  })
})

//GET/movies/filtered
const getFilteredMovies = asyncHandler(async (req, res) => {
  const amount = req.query.amount || 20
  const offset = req.query.offset || 0
  const genres = req.query.genres?.split(",") || ""

  let movies
  let amountOfMovies

  const blockedMovies = await Block.find({ user: req.user })

  const blockedMovieIds = blockedMovies.map(
    (blockedMovie) => blockedMovie.movieId
  )

  if (genres?.length > 0 && genres[0] !== "") {
    movies = await Movie.find({
      genre_ids: { $all: genres },
      _id: { $nin: blockedMovieIds },
    })
      .skip(offset)
      .limit(amount)

    amountOfMovies = (
      await Movie.find({
        genre_ids: { $all: genres },
        _id: { $nin: blockedMovieIds },
      })
    ).length
  } else {
    movies = await Movie.find({
      _id: { $nin: blockedMovieIds },
    })
      .skip(offset)
      .limit(amount)

    amountOfMovies = (
      await Movie.find({
        _id: { $nin: blockedMovieIds },
      })
    ).length
  }

  res.status(200).json({
    information: {
      amountOfMovies: amountOfMovies,
    },
    movies: movies,
  })
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
  getFilteredMovies,
  getMovie,
}
