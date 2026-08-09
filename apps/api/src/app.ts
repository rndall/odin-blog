import compression from "compression"
import cors, { type CorsOptions } from "cors"
import express, { type Express, json, Router, urlencoded } from "express"
import helmet from "helmet"

import { env } from "@/config/env"
import { passport } from "@/lib/passport"
import { errorHandler } from "@/middlewares/errorHandler"

import indexRouter from "@/routes"
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

const apiRouter = Router()

apiRouter.use("/", authRouter)
apiRouter.use("/", indexRouter)
apiRouter.use("/posts", postsRouter)
apiRouter.use("/user", userRouter)

app.use("/api", apiRouter)

app.use(errorHandler)

export default app
