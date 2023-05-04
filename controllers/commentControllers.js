const asyncHandler = require("express-async-handler")

const Comment = require("../models/commentModel")

// GET /api/comments/:movieId
const getCommentsForMovie = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ movie: req.params.movieId })

  console.log({ comments })

  res.status(200).json({ comments: comments, amount: comments.length })
})

const postCommentForMovie = asyncHandler(async (req, res) => {
  console.log(req.user)

  const newComment = await Comment.create({
    user: req.user,
    movie: req.body.movieId,
    text: req.body.text,
  })

  res.status(200).json({ comment: newComment })
})
const deleteCommentForMovie = asyncHandler(async (req, res) => {
  res.status(200).json({ data: null })
})
const updateCommentForMovie = asyncHandler(async (req, res) => {
  res.status(200).json({ data: null })
})

module.exports = {
  getCommentsForMovie,
  postCommentForMovie,
  deleteCommentForMovie,
  updateCommentForMovie,
}
