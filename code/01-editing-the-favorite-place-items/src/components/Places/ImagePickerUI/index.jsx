import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@constants/colors";

import ButtonUI from "@components/Places/ImagePickerUI/buttonUI";

const ImagePickerUI = () => {
	return (
		<View style={styles.container}>
			<View style={styles.titleBox}>
				<Text style={styles.titleTextStyle}>Image Source</Text>
			</View>
			<View style={styles.inputBox}>
				<Text style={styles.inputText}>/src/image.png</Text>
			</View>
			<View style={styles.buttonBox}>
				<ButtonUI label="카메라" />
				<ButtonUI label="사진첩" />
			</View>
		</View>
	);
};

export default ImagePickerUI;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "auto",
		padding: 15,
	},
	buttonBox: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	titleBox: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 5,
	},
	titleTextStyle: {
		fontWeight: "bold",
		marginBottom: 4,
		color: Colors.primary500,
	},
	inputBox: {
		width: "100%",
		borderRadius: 15,
		marginVertical: 0,
		paddingHorizontal: 4,
		paddingVertical: 8,
		borderBottomColor: Colors.primary700,
		backgroundColor: Colors.primary100,
	},
	inputText: {
		fontSize: 20,
	},
});
