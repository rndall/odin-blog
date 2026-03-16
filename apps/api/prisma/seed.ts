import bcrypt from "bcryptjs"
import { type Prisma, UserRole } from "generated/prisma/client"
import { prisma } from "@/lib/prisma"

async function main() {
	const hashedPassword = await bcrypt.hash("password", 10)

	const users: Prisma.UserCreateInput[] = [
		{
			username: "author",
			password: hashedPassword,
			role: UserRole.AUTHOR,
			posts: {
				create: [
					{
						title: "Published Post Title",
						content: "Published Post Content",
						published: true,
					},
					{
						title: "Unpublished Post Title",
						content: "Unpublished Post Content",
					},
				],
			},
		},
		{
			username: "user",
			password: hashedPassword,
			comments: {
				create: [{ content: "Comment Content", postId: 1 }],
			},
		},
	]

	for (const user of users) {
		await prisma.user.upsert({
			where: { username: user.username },
			update: {},
			create: user,
		})
	}

	console.log({ users })
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
