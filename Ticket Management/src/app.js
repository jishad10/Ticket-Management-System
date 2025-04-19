import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js'
import busRouter from './routes/bus.routes.js'
import ticketRouter from './routes/ticket.routes.js'


//routes declaration
app.use("/api/v1/auth", userRouter)
app.use("/api/v1", busRouter);               
app.use("/api/v1", ticketRouter);  



export { app }