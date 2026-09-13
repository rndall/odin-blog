import { signUpSchema } from '@odin-blog/schemas/auth'
import { z } from 'zod'

export const signUpFormSchema = signUpSchema
	.extend({
		confirmPassword: z.string()
	})
	.refine((data) => data.password === data.confirmPassword, {
		error: "Passwords don't match",
		path: ['confirmPassword']
	})
