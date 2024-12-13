import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config({
  path: '../.env'
})

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.listen(process.env.PORT, () => console.log('Server is up at ' + process.env.PORT))

async function connectDb() {
  await mongoose.connect("mongodb://localhost:27017/img-macro")
    .then(() => console.log('DB is Connected')).catch((err) => console.log(err))
}

connectDb();