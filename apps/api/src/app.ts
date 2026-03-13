import express, { type Express } from "express"

import { errorHandler } from "@/middlewares/errorHandler"

import postsRouter from "@/routes/posts"

const app: Express = express()

app.use("/posts", postsRouter)

app.use(errorHandler)

export default app
