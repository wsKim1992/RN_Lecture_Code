import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Input from "./Input";
import Button from "@components/UI/Buttons";
import { getFormattedDate } from "@util/date";

const ExpenseForm = ({
	onCancel,
	submitButtonLabel,
	onSubmit,
	defaultValues,
}) => {
	const [inputValues, setInputValues] = React.useState({
		amount: defaultValues ? defaultValues.amount.toString() : "",
		date: defaultValues ? getFormattedDate(defaultValues.date) : "",
		description: defaultValues ? defaultValues.description.toString() : "",
	});

	function inputChangedHandler(inputIdentifier, enteredAmount) {
		setInputValues((currentValues) => {
			return {
				...currentValues,
				[inputIdentifier]: enteredAmount,
			};
		});
	}

	function sumitHandler() {
		const expenseData = {
			amount: +inputValues.amount,
			date: new Date(inputValues.date),
			description: inputValues.description,
		};
		onSubmit(expenseData);
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
			<View style={styles.buttons}>
				<Button style={styles.button} mode="flat" onPress={onCancel}>
					Cancel
				</Button>
				<Button style={styles.button} onPress={sumitHandler}>
					{submitButtonLabel ? "Update" : "Add"}
				</Button>
			</View>
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
	buttons: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		minWidth: 120,
		marginHorizontal: 8,
	},
});
