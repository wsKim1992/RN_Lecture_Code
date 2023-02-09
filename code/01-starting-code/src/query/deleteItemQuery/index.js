import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteExpense } from '@util/http';

import { LOAD_SINGLE_EXPENSE_KEY } from '@constants/keys';

const deleteItemQuery = () => {
	const queryClient = useQueryClient();
	return useMutation(deleteExpense, {
		onSucess: (data, id) => {
			queryClient.removeQueries([LOAD_SINGLE_EXPENSE_KEY, id]);
		},
		cacheTime: 0,
	});
};

export default deleteItemQuery;
