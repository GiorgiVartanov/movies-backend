const express = require("express")
const router = express.Router()

const {
  getCommentsForMovie,
  postCommentForMovie,
  deleteCommentForMovie,
  updateCommentForMovie,
} = require("../controllers/commentControllers.js")

const { protect } = require("../middleware/authMiddleware")

router.get("/:movieId", getCommentsForMovie)
router.post("/", protect, postCommentForMovie)
router.delete("/:movieId", protect, deleteCommentForMovie)
router.put("/:movieId", protect, updateCommentForMovie)

module.exports = router
