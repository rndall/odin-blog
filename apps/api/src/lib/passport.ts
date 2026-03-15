import jwt from "jsonwebtoken"
import passport from "passport"
import {
	ExtractJwt,
	Strategy as JwtStrategy,
	type StrategyOptionsWithoutRequest,
} from "passport-jwt"
import { env } from "@/config/env"
import { prisma } from "@/lib/prisma"
import type { JwtPayload } from "@/types/jwt"

const JWT_SECRET = env.JWT_SECRET

const opts: StrategyOptionsWithoutRequest = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: JWT_SECRET,
}

passport.use(
	new JwtStrategy(opts, async (jwtPayload: JwtPayload, done) => {
		try {
			const user = await prisma.user.findUnique({
				where: { id: jwtPayload.id },
			})

			if (!user) {
				return done(null, false)
			}

			return done(null, user)
		} catch (err) {
			return done(err, false)
		}
	}),
)

export { passport }
