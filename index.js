import express from 'express'
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import cors from 'cors'
import postRouter from './routes/post.js'
import userRouter from "./routes/user.js"

const app = express()

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

app.use('/posts', postRouter)
app.use("/user", userRouter)

const CONNECTION_URL = 'mongodb+srv://parth:ashuandcow@cluster0.8nfjdv8.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Running in the port ${PORT}`)))
    .catch((err) => console.log(err.message))

mongoose.set('useFindAndModify', false)