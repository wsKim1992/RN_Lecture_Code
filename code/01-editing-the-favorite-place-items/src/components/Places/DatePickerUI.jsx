import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import { Colors } from "@constants/colors";

const DatePickerController = ({ label, rule }) => {
	const { control } = useFormContext();

	return (
		<Controller
			control={control}
			name={label}
			rules={rule}
			render={({
				field: { onChange, onBlur, value, ref },
				fieldState: { inValid, error },
			}) => {
				return (
					<DatePickerUI
						onChange={onChange}
						onBlur={onBlur}
						value={value}
						inValid={inValid}
						error={error}
					/>
				);
			}}
		/>
	);
};

const DatePickerUI = ({ onChange, value, ref, inValid, error }) => {
	/* const [selectedDate, setSelectedDate] = React.useState(value); */
	const [showCalendar, setShowCalendar] = React.useState(false);

	const setDate = (event) => {
		const {
			nativeEvent: { timestamp },
		} = event;
		/* setSelectedDate(new Date(timestamp)); */
		setShowCalendar(false);
		onChange(new Date(timestamp));
	};
	return (
		<>
			<View style={styles.container}>
				<View style={styles.titleBox}>
					<Text style={styles.label}>Date</Text>
					{(error || inValid) && (
						<Text style={styles.labelError}>{error?.message}</Text>
					)}
				</View>
				<Pressable
					onPress={() => setShowCalendar(true)}
					style={({ pressed }) => [
						styles.input,
						pressed && styles.inputPressed,
					]}
				>
					<Text style={styles.inputText}>{`${value.getFullYear()}-${
						value.getMonth() + 1
					}-${value.getDate()}`}</Text>
				</Pressable>
			</View>
			{showCalendar && (
				<DateTimePicker
					mode="date"
					display="calendar"
					onChange={setDate.bind(this)}
					value={value}
					textColor={Colors.primary200}
					accentColor={Colors.primary400}
					themeVariant="dark"
				/>
			)}
		</>
	);
};

export default DatePickerController;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 15,
	},
	titleBox: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	input: {
		width: "100%",
		flex: 1,
		borderRadius: 15,
		marginVertical: 0,
		paddingHorizontal: 4,
		paddingVertical: 8,
		fontSize: 16,
		borderBottomColor: Colors.primary700,
		borderBottomWidth: 2,
		backgroundColor: Colors.primary100,
	},
	inputText: {
		fontSize: 20,
	},
	label: {
		fontWeight: "bold",
		marginBottom: 4,
		color: Colors.primary500,
	},
	labelError: {
		color: "red",
	},
	inputPressed: {
		opacity: 0.75,
	},
});
