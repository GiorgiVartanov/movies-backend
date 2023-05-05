const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv").config()
const { errorHandler } = require("./middleware/errorMiddleware")
const connectDB = require("./config/db")

const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const corsOptions = {
  origin: "https://movies-spp.netlify.app",
  // origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use("/api/favorites", require("./routes/favoriteRoutes"))
app.use("/api/movies", require("./routes/movieRoutes"))
app.use("/api/comments", require("./routes/commentRoutes"))
app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/genres", require("./routes/genreRoutes"))
app.use("/api/block", require("./routes/blockRoutes"))

app.use(errorHandler)

app.listen(port, () => console.log(`servers is running on port ${port}`))
