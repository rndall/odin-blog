import compression from "compression"
import cors, { type CorsOptions } from "cors"
import express, { type Express, json, urlencoded } from "express"
import helmet from "helmet"

import { env } from "@/config/env"
import { passport } from "@/lib/passport"
import { errorHandler } from "@/middlewares/errorHandler"

import authRouter from "@/routes/auth"
import postsRouter from "@/routes/posts"
import userRouter from "@/routes/user"

const app: Express = express()

const allowedOrigins = env.ALLOWED_ORIGINS.split(",")
const corsOptions: CorsOptions = {
	origin: (requestOrigin, callback) => {
		if (!requestOrigin) return callback(null, true)

		if (allowedOrigins.includes(requestOrigin)) {
			callback(null, true)
		} else {
			callback(new Error("Blocked by CORS policy"))
		}
	},
}

app.use(helmet())
app.use(cors(corsOptions))
app.use(compression())

app.use(json())
app.use(urlencoded({ extended: true }))

app.use(passport.initialize())

app.use("/", authRouter)
app.use("/posts", postsRouter)
app.use("/user", userRouter)

app.use(errorHandler)

export default app
