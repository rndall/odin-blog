import { useMutation, useQueryClient } from "@tanstack/react-query"

import { createPost } from "../api"
import { myPostQueries } from "../queries"

export function useCreatePostMutation() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: createPost,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: myPostQueries.lists(),
			})
		},
	})
}
