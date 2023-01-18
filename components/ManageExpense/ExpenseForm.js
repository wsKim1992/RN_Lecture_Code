import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Input from "./Input";

const ExpenseForm = () => {
	const [inputValues, setInputValues] = React.useState({
		amount: "",
		date: "",
		description: "",
	});

	function inputChangedHandler(inputIdentifier, enteredAmount) {
		setInputValues((currentValues) => {
			return {
				...currentValues,
				[inputIdentifier]: enteredAmount,
			};
		});
	}

	return (
		<View style={styles.form}>
			<Text style={styles.title}>Your Expense</Text>
			<View style={styles.inputsRow}>
				<Input
					style={styles.rowInput}
					label="Amount"
					textInputConfig={{
						KeyboardType: "decimal-pad",
						onChangeText: inputChangedHandler.bind(this, "amount"),
						value: inputValues.amount,
						autoCapitalize: "characters",
						autoCorrect: true,
					}}
				/>
				<Input
					style={styles.rowInput}
					label="Date"
					textInputConfig={{
						placeholder: "YYYY-MM-DD",
						maxLength: 10,
						onChangeText: inputChangedHandler.bind(this, "date"),
						value: inputValues.date,
						autoCapitalize: "none",
						autoCorrect: false,
					}}
				/>
			</View>
			<Input
				label="Description"
				textInputConfig={{
					multiline: true,
					autoCapitalize: "none",
					autoCorrect: false,
					onChangeText: inputChangedHandler.bind(this, "description"),
					value: inputValues.description,
				}}
			/>
		</View>
	);
};

export default ExpenseForm;

const styles = StyleSheet.create({
	form: {
		marginTop: 80,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#fff",
		marginVertical: 24,
		textAlign: "center",
	},
	inputsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	rowInput: {
		flex: 1,
	},
});
