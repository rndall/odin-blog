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
			},
			{ username: "user", password: hashedPassword, fullName: "User 1" },
		],
	})

	const author = await prisma.user.findUniqueOrThrow({
		where: { username: "author" },
	})
	const user = await prisma.user.findUniqueOrThrow({
		where: { username: "user" },
	})

	await prisma.post.createMany({
		data: [
			{
				title: "Published Post Title",
				content: "Published Post Content",
				published: true,
				authorId: author.id,
			},
			{
				title: "Unpublished Post Title",
				content: "Unpublished Post Content",
				authorId: author.id,
			},
		],
	})

	const post = await prisma.post.findFirstOrThrow({
		where: { authorId: author.id },
	})

	await prisma.comment.create({
		data: { content: "Comment Content", postId: post.id, userId: user.id },
	})
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
