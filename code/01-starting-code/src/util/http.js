import axios from 'axios';

import { firebaseURL } from '@constants/firebaseURL';

export async function storeExpense(expenseData) {
	const response = await axios.post(
		`${firebaseURL}/expenses.json`,
		expenseData
	);
	const id = response.data.name;
	return id;
}

export async function fetchExpenses() {
	const response = await axios.get(`${firebaseURL}/expenses.json`);

	const expenses = [];

	for (const key in response.data) {
		const expenseObj = {
			id: key,
			amount: parseFloat(response.data[key].amount),
			date: new Date(response.data[key].date),
			description: response.data[key].description,
		};
		expenses[expenses.length] = expenseObj;
	}
	return expenses;
}

export async function loadExpense(id) {
	return await axios.get(`${firebaseURL}/expenses/${id}.json`);
}

export async function updateExpense({ id, expenseData }) {
	return await axios.put(`${firebaseURL}/expenses/${id}.json`, expenseData);
}

export async function deleteExpense(id) {
	return await axios.delete(`${firebaseURL}/expenses/${id}.json`);
}
