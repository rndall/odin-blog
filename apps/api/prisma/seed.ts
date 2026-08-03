import bcrypt from "bcryptjs"
import { UserRole } from "generated/prisma/client"
import { prisma } from "@/lib/prisma"

async function main() {
	await prisma.comment.deleteMany()
	await prisma.post.deleteMany()
	await prisma.user.deleteMany()

	const hashedPassword = await bcrypt.hash("password", 10)

	await prisma.user.createMany({
		data: [
			{
				username: "author",
				password: hashedPassword,
				role: UserRole.AUTHOR,
				fullName: "Author 1",
				bio: "This is the bio of Author 1",
			},
			{
				username: "author2",
				password: hashedPassword,
				role: UserRole.AUTHOR,
				fullName: "Author 2",
				bio: "This is the bio of Author 2",
			},
			{ username: "user", password: hashedPassword, fullName: "User 1" },
		],
	})

	const authors = await prisma.user.findMany({
		where: { username: { contains: "author" } },
	})
	const user = await prisma.user.findUniqueOrThrow({
		where: { username: "user" },
	})

	for (const author of authors) {
		await prisma.post.createMany({
			data: [
				{
					title: "Published Post Title",
					slug: `published-post-title-${author.id}`,
					content: "Published Post Content",
					published: true,
					authorId: author.id,
					publishedAt: new Date(),
				},
				{
					title: "Unpublished Post Title",
					slug: `unpublished-post-title-${author.id}`,
					content: "Unpublished Post Content",
					authorId: author.id,
				},
			],
		})
	}

	for (const author of authors) {
		const post = await prisma.post.findFirstOrThrow({
			where: { authorId: author.id },
		})

		await prisma.comment.create({
			data: { content: "Comment Content", postId: post.id, userId: user.id },
		})
	}
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
