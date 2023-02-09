import { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import deleteItemQuery from '@query/deleteItemQuery';
import loadSingleExpenseQuery from '@query/loadSingleExpenseQuery';
import updateItemQuery from '@query/updateItemQuery';
import uploadNewItemQuery from '@query/uploadNewItemQuery';

import { ExpensesContext } from '@store/expenses-context';

import { deleteExpense, storeExpense, updateExpense } from '@util/http';

import { formDefaultValue } from '@constants/formDefaultValue';
import { GlobalStyles } from '@constants/styles';

import DeleteComponent from '@components/ManageExpense/DeleteComponent';
import ExpenseForm from '@components/ManageExpense/ExpenseForm';
import LoadingOverlay from '@components/UI/LoadingOverlay';

const ManageExpense = ({ route, navigation }) => {
	const expensesCtx = useContext(ExpensesContext);
	const editedExpenseId = route.params?.expenseId;
	const isEditing = !!editedExpenseId;
	const cachedData = loadSingleExpenseQuery(editedExpenseId);
	const {
		data: returnedData,
		mutateAsync: updateMutateFn,
		status: updateStatus,
	} = isEditing ? updateItemQuery() : uploadNewItemQuery();
	const { status: deleteStatus } = deleteItemQuery();

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? 'Edit Expense' : 'Add Expense',
		});
	}, [navigation, isEditing]);

	function cancelHandler() {
		navigation.goBack();
	}

	async function confirmHandler(expenseData) {
		if (isEditing) {
			try {
				await updateMutateFn({ id: editedExpenseId, expenseData });
				expensesCtx.updateExpense(editedExpenseId, expenseData);
				navigation.goBack();
			} catch (err) {
				console.error(err);
			}
		} else {
			try {
				await updateMutateFn(expenseData);
				navigation.goBack();
			} catch (err) {
				console.error(err);
			}
		}
	}

	if (cachedData && cachedData.status == 'loading') {
		return <LoadingOverlay />;
	}

	if (cachedData && cachedData.status == 'error') {
		navigation.goBack();
	}

	if (isEditing && updateStatus == 'loading') {
		return <LoadingOverlay />;
	}

	if (isEditing && deleteStatus == 'loading') {
		return <LoadingOverlay />;
	}

	return (
		<View style={styles.container}>
			<ExpenseForm
				submitButtonLabel={isEditing ? 'Update' : 'Add'}
				onSubmit={confirmHandler}
				onCancel={cancelHandler}
				defaultValues={
					editedExpenseId
						? {
								...cachedData.data,
								date: new Date(cachedData.data.date),
						  }
						: { ...formDefaultValue }
				}
			/>
			{isEditing && <DeleteComponent editedExpenseId={editedExpenseId} />}
		</View>
	);
};

export default ManageExpense;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: GlobalStyles.colors.primary800,
	},
	deleteContainer: {
		marginTop: 16,
		paddingTop: 8,
		borderTopWidth: 2,
		borderTopColor: GlobalStyles.colors.primary200,
		alignItems: 'center',
	},
});
