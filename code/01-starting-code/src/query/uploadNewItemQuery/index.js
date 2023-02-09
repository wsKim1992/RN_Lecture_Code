import { useMutation } from '@tanstack/react-query';

import { storeExpense } from '@util/http';

const uploadNewItemQuery = () => {
	return useMutation(storeExpense);
};

export default uploadNewItemQuery;
