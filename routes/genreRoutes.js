const express = require("express")
const router = express.Router()

const { getAllGenres } = require("../controllers/genreController.js")

router.get("/all", getAllGenres)

module.exports = router
