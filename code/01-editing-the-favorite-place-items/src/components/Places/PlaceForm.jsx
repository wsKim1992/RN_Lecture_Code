import React from "react";
import { StyleSheet, View } from "react-native";

import DatePickerUI from "./DatePickerUI";
import InputUI from "./InputUI";

const PlaceForm = () => {
	return (
		<View style={styles.container}>
			<View style={styles.inputBox}>
				<InputUI />
				<DatePickerUI />
			</View>
		</View>
	);
};

export default PlaceForm;

const styles = StyleSheet.create({
	container: {
		padding: 15,
	},
	inputBox: {
		flexDirection: "row",
		backgroundColor: "purple",
	},
});
