import { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import loadSingleExpenseQuery from '@query/loadSingleExpenseQuery';
import updateItemQuery from '@query/updateItemQuery';

import { ExpensesContext } from '@store/expenses-context';

import { deleteExpense, storeExpense, updateExpense } from '@util/http';

import { formDefaultValue } from '@constants/formDefaultValue';
import { GlobalStyles } from '@constants/styles';

import ExpenseForm from '@components/ManageExpense/ExpenseForm';
import IconButton from '@components/UI/IconButton';
import LoadingOverlay from '@components/UI/LoadingOverlay';

const ManageExpense = ({ route, navigation }) => {
	const expensesCtx = useContext(ExpensesContext);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const editedExpenseId = route.params?.expenseId;
	const isEditing = !!editedExpenseId;
	const cachedData = loadSingleExpenseQuery(editedExpenseId);
	const { mutateAsync: updateMutateFn, status: updateStatus } =
		updateItemQuery();

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? 'Edit Expense' : 'Add Expense',
		});
	}, [navigation, isEditing]);

	async function deleteExpenseHandler() {
		setIsSubmitting(true);
		await deleteExpense(editedExpenseId);
		expensesCtx.deleteExpense(editedExpenseId);
		navigation.goBack();
	}

	function cancelHandler() {
		navigation.goBack();
	}

	async function confirmHandler(expenseData) {
		//setIsSubmitting(true);
		/* if (isEditing) {
			await updateExpense(editedExpenseId, expenseData);
			expensesCtx.updateExpense(editedExpenseId, expenseData);
		} else {
			const id = await storeExpense(expenseData);
			expensesCtx.addExpense({ ...expenseData, id });
		}
		navigation.goBack(); */

		if (isEditing) {
			try {
				await updateMutateFn({ id: editedExpenseId, expenseData });
				expensesCtx.updateExpense(editedExpenseId, expenseData);
			} catch (err) {
				if (isEditing && updateStatus == 'error') {
					navigation.goBack();
				}

				if (updateStatus == 'success') {
					expensesCtx.updateExpense(editedExpenseId, expenseData);
				}
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
			{isEditing && (
				<View style={styles.deleteContainer}>
					<IconButton
						icon="trash"
						color={GlobalStyles.colors.error500}
						size={36}
						onPress={deleteExpenseHandler}
					/>
				</View>
			)}
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
