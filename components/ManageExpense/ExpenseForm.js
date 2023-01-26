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
		amount: {
			value: defaultValues ? defaultValues.amount.toString() : "",
			isValid: defaultValues ? true : false,
		},
		date: {
			value: defaultValues ? getFormattedDate(defaultValues.date) : "",
			isValid: defaultValues ? true : false,
		},
		description: {
			value: defaultValues ? defaultValues.description.toString() : "",
			isValid: defaultValues ? true : false,
		},
	});

	function inputChangedHandler(inputIdentifier, enteredValue) {
		setInputValues((currentValues) => {
			return {
				...currentValues,
				[inputIdentifier]: { value: enteredValue, isValid: true },
			};
		});
	}

	function sumitHandler() {
		const expenseData = {
			amount: +inputValues.amount.value,
			date: new Date(inputValues.date.value),
			description: inputValues.description.value,
		};

		const amountIsValid =
			!isNaN(expenseData.amount) && expenseData.amount > 0;
		const dateIsValid = expenseData.date.toString() !== "Invalid Date";
		const descriptionIsValid = expenseData.description.trim().length > 0;

		if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
			// Alert.alert("Invalid input", "please check your input values");
			setInputValues((curInputs) => {
				return {
					amount: {
						value: curInputs.amount.value,
						isValid: amountIsValid,
					},
					date: { value: curInputs.date.value, isValid: dateIsValid },
					description: {
						value: curInputs.description.value,
						isValid: descriptionIsValid,
					},
				};
			});
			return;
		}
		onSubmit(expenseData);
	}

	const formIsInvalid =
		!inputValues.amount.isValid ||
		!inputValues.date.isValid ||
		!inputValues.description.isValid;

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
						value: inputValues.amount.value,
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
						value: inputValues.date.value,
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
					value: inputValues.description.value,
				}}
			/>
			{formIsInvalid && (
				<Text>
					Invalid input values - please check your entered value
				</Text>
			)}
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
