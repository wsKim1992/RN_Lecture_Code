import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateExpense } from '@util/http';

import { LOAD_SINGLE_EXPENSE_KEY } from '@constants/keys';

const updateItemQuery = () => {
	const queryClient = useQueryClient();
	return useMutation(updateExpense, {
		onMutate: async (paramData) => {
			const { id, expenseData } = paramData;
			await queryClient.cancelQueries([LOAD_SINGLE_EXPENSE_KEY, id]);
			const previousData = queryClient.getQueryData([
				LOAD_SINGLE_EXPENSE_KEY,
				id,
			]);
			queryClient.setQueryData(
				[LOAD_SINGLE_EXPENSE_KEY, id],
				expenseData
			);
			return {
				previousData,
			};
		},
		onError: (error, paramData, context) => {
			const { id } = paramData;
			const { previousData } = context;
			queryClient.setQueryData(
				[LOAD_SINGLE_EXPENSE_KEY, id],
				previousData
			);
		},
		onSuccess: (returnData, paramData) => {
			const { id } = paramData;
			queryClient.invalidateQueries([LOAD_SINGLE_EXPENSE_KEY, id]);
		},
	});
};

export default updateItemQuery;
