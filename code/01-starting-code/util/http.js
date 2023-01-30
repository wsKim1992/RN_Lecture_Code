import axios from 'axios';

import { firebaseURL } from '@constants/firebaseURL';

export function storeExpense(expenseData) {
	axios.post(`${firebaseURL}/expenses.json`, expenseData);
}

export async function fetchExpenses() {
	const response = await axios.get(`${firebaseURL}/expenses.json`);

	const expenses = [];

	for (const key in response.data) {
		const expenseObj = {
			id: key,
			amount: response.data[key].amount,
			date: new Date(response.data[key].date),
			description: response.data[key].description,
		};
		expenses[expenses.length] = expenseObj;

		return expenses;
	}
}
