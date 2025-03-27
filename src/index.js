import express from "express"
import dotenv from "dotenv"
import authRutes from "./routes/auth.route.js"
import messageRutes from "./routes/message.route.js"
import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser"

dotenv.config()
const app = express()
const port = process.env.PORT 



app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRutes)
app.use("/api/message", messageRutes)















app.get("/user", (req, res) => {
    console.log("hi i am sajid")
    res.send("hi i am sajid")
})

app.get("/", (req, res) => {
    res.send("All ok from backend")
})

app.listen(port, () => {
    console.log(`App is listing from port ${port}`)
    connectDB()
})