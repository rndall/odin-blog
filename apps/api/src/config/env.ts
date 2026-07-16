import z from "zod"
import "dotenv/config"

const envSchema = z.object({
	DATABASE_URL: z.url(),
	PORT: z.coerce.number().default(3000),
	NODE_ENV: z
		.enum(["development", "production", "test"])
		.default("development"),
	JWT_SECRET: z.string().nonempty(),
	ALLOWED_ORIGINS: z.string(),
})

export const env = envSchema.parse(process.env)
