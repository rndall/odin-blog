import compression from "compression"
import express, { type Express } from "express"
import helmet from "helmet"

import { passport } from "@/lib/passport"
import { errorHandler } from "@/middlewares/errorHandler"

import authRouter from "@/routes/auth"
import postsRouter from "@/routes/posts"

const app: Express = express()

app.use(helmet())
app.use(compression())

app.use(passport.initialize())

app.use("/", authRouter)
app.use("/posts", postsRouter)

app.use(errorHandler)

export default app
