import type { JwtPayload } from "jsonwebtoken"
import passport from "passport"
import {
	ExtractJwt,
	Strategy as JwtStrategy,
	type StrategyOptionsWithoutRequest,
} from "passport-jwt"

import { env } from "@/config/env"
import { prisma } from "@/lib/prisma"

const opts: StrategyOptionsWithoutRequest = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: env.JWT_SECRET,
}

passport.use(
	new JwtStrategy(opts, async (jwtPayload: JwtPayload, done) => {
		try {
			const user = await prisma.user.findUnique({
				where: { id: Number(jwtPayload.sub) },
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
