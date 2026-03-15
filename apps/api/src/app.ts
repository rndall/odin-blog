import compression from "compression"
import express, { type Express } from "express"
import helmet from "helmet"

import { errorHandler } from "@/middlewares/errorHandler"

import postsRouter from "@/routes/posts"

const app: Express = express()

app.use(helmet())
app.use(compression())

app.use("/posts", postsRouter)

app.use(errorHandler)

export default app
