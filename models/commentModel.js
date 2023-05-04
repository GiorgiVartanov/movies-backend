const mongoose = require("mongoose")

const commentModel = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Movie",
    },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Comment", commentModel)
