const express = require("express")
const router = express.Router()

const {
    getBlockedMovies,
    getBlockedIds,
    addBlocked,
    deleteBlocked,
} = require("../controllers/blockController.js")

const { protect } = require("../middleware/authMiddleware")

router.get("/ids", protect, getBlockedIds)
router.get("/movies", protect, getBlockedMovies)
router.post("/", protect, addBlocked)
router.delete("/:id", protect, deleteBlocked)

module.exports = router
