import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { Colors } from "@constants/colors";

const InputUI = () => {
	const [enteredTitle, setEnteredTitle] = React.useState("");

	function changeTitleHandler(enteredText) {
		setEnteredTitle(enteredText);
	}
	return (
		<View style={styles.container}>
			{/* <Text style={styles.label}>Title</Text>
			<TextInput
				style={styles.input}
				onChangeText={changeTitleHandler}
				value={enteredTitle}
			/> */}
		</View>
	);
};

export default InputUI;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		height: 100,
	},
	label: {
		fontWeight: "bold",
		marginBottom: 4,
		color: Colors.primary500,
	},
	input: {
		borderRadius: 15,
		marginVertical: 0,
		paddingHorizontal: 4,
		paddingVertical: 8,
		fontSize: 16,
		borderBottomColor: Colors.primary700,
		borderBottomWidth: 2,
		backgroundColor: Colors.primary100,
	},
});
