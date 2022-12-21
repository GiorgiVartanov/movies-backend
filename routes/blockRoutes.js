const express = require("express")
const router = express.Router()

const {
    getBlocked,
    getBlockedIds,
    addBlocked,
    deleteBlocked,
} = require("../controllers/blockController.js")

const { protect } = require("../middleware/authMiddleware")

router.get("/all", protect, getBlocked)
router.get("/ids", protect, getBlockedIds)
router.post("/", protect, addBlocked)
router.delete("/:id", protect, deleteBlocked)

module.exports = router
