const express = require("express")
const router = express.Router()

const {
    getFavorites,
    addFavorite,
    deleteFavorite,
} = require("../controllers/favoriteController.js")

const { protect } = require("../middleware/authMiddleware")

router.get("/all", protect, getFavorites)
router.post("/", protect, addFavorite)
router.delete("/:id", protect, deleteFavorite)

module.exports = router
