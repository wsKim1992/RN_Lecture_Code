import { useQuery } from '@tanstack/react-query';

import { loadExpense } from '@util/http';

import { LOAD_SINGLE_EXPENSE_KEY } from '@constants/keys';

const loadSingleExpenseQuery = (expenseId) => {
	if (!expenseId) return null;
	return useQuery(
		[LOAD_SINGLE_EXPENSE_KEY, expenseId],
		async () => (await loadExpense(expenseId)).data,
		{
			refetchIntervalInBackground: false,
			refetchOnReconnect: true,
			refetchOnMount: true,
			staleTime: 60 * 1000 * 1,
			cacheTime: 60 * 1000 * 3,
		}
	);
};

export default loadSingleExpenseQuery;
