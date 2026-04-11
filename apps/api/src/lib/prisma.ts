import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "generated/prisma/client"

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const baseClient = new PrismaClient({ adapter })

const prisma = baseClient.$extends({
	query: {
		post: {
			async create({ args, query }) {
				if (args.data.published) {
					args.data.publishedAt = new Date()
				}

				return query(args)
			},

			async update({ args, query }) {
				if (args.data.published) {
					args.data.publishedAt = new Date()
				} else {
					args.data.publishedAt = null
				}

				return query(args)
			},
		},
	},
})

export { prisma }
