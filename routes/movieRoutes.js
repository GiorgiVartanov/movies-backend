const express = require("express")
const router = express.Router()

const {
    getMovies,
    getFilteredMovies,
    getMovie,
} = require("../controllers/movieController")

const { protect } = require("../middleware/authMiddleware")

router.get("/all", getMovies)
router.get("/filtered", protect, getFilteredMovies)
router.get("/:id", getMovie)

module.exports = router
