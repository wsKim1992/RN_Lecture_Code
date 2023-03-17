import React from "react";
import { StyleSheet, View } from "react-native";

import DatePickerUI from "./DatePickerUI";
import ImagePickerUI from "./ImagePickerUI";
import InputUI from "./InputUI";

const PlaceForm = () => {
	return (
		<View style={styles.container}>
			<View style={styles.inputBox}>
				<InputUI />
				<DatePickerUI />
			</View>
			<ImagePickerUI />
		</View>
	);
};

export default PlaceForm;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
	},
	inputBox: {
		flexDirection: "row",
	},
});
