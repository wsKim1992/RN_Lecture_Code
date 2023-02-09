import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import deleteItemQuery from '@query/deleteItemQuery';

import { ExpensesContext } from '@store/expenses-context';

import { GlobalStyles } from '@constants/styles';

import IconButton from '@components/UI/IconButton';

const DeleteComponent = ({ editedExpenseId }) => {
	const { status, mutateAsync } = deleteItemQuery();
	const expensesCtx = React.useContext(ExpensesContext);
	const navigation = useNavigation();
	const deleteExpenseHandler = async () => {
		try {
			await mutateAsync(editedExpenseId);
			expensesCtx.deleteExpense(editedExpenseId);
			navigation.goBack();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<View style={styles.deleteContainer}>
			<IconButton
				icon="trash"
				color={GlobalStyles.colors.error500}
				size={36}
				onPress={deleteExpenseHandler}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	deleteContainer: {
		marginTop: 16,
		paddingTop: 8,
		borderTopWidth: 2,
		borderTopColor: GlobalStyles.colors.primary200,
		alignItems: 'center',
	},
});

export default DeleteComponent;
