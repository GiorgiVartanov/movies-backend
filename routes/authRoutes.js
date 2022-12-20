const express = require("express")
const router = express.Router()

const {
    registerUser,
    loginUser,
    getCurrentUser,
} = require("../controllers/authController.js")

const { protect } = require("../middleware/authMiddleware")

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/", protect, getCurrentUser)

module.exports = router
