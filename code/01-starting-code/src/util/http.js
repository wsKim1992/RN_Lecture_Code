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
			amount: response.data[key].amount,
			date: new Date(response.data[key].date),
			description: response.data[key].description,
		};
		expenses[expenses.length] = expenseObj;
	}
	return expenses;
}

export function loadExpense(id) {
	return axios.get(`${firebaseURL}/expenses/${id}.json`);
}

export function updateExpense(id, expenseData) {
	return axios.put(`${firebaseURL}/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
	return axios.delete(`${firebaseURL}/expenses/${id}.json`);
}
