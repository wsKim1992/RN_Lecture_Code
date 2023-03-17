import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import { Colors } from "@constants/colors";

const DatePickerUI = () => {
	const [selectedDate, setSelectedDate] = React.useState(new Date());
	const [showCalendar, setShowCalendar] = React.useState(true);
	const setDate = (event) => {
		const {
			nativeEvent: { timestamp },
		} = event;
		setSelectedDate(new Date(timestamp));
		setShowCalendar(false);
	};
	return (
		<>
			<View style={styles.container}>
				<Text style={styles.label}>Date</Text>
				<Pressable
					onPress={() => setShowCalendar(true)}
					style={({ pressed }) => [
						styles.input,
						pressed && styles.inputPressed,
					]}
				>
					<Text
						style={styles.inputText}
					>{`${selectedDate.getFullYear()}-${
						selectedDate.getMonth() + 1
					}-${selectedDate.getDate()}`}</Text>
				</Pressable>
			</View>
			{showCalendar && (
				<DateTimePicker
					mode="date"
					display="calendar"
					onChange={setDate.bind(this)}
					value={selectedDate}
					textColor={Colors.primary200}
					accentColor={Colors.primary400}
					themeVariant="dark"
				/>
			)}
		</>
	);
};

export default DatePickerUI;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 15,
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
	inputPressed: {
		opacity: 0.75,
	},
});
