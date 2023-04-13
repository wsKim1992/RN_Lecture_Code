import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { Colors } from "@constants/colors";

const InputUI = ({ label, rule }) => {
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
					<View style={styles.container}>
						<View style={styles.titleBox}>
							<Text style={styles.label}>Title</Text>
							{(inValid || error) && (
								<Text style={[styles.label, styles.labelError]}>
									{error?.message}
								</Text>
							)}
						</View>
						<TextInput
							style={styles.input}
							keyboardType="default"
							onChangeText={onChange}
							onBlur={onBlur}
							value={value}
							ref={ref}
							autoFocus
						/>
					</View>
				);
			}}
		/>
	);
};

export default InputUI;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 15,
		height: "auto",
	},
	titleBox: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	label: {
		fontWeight: "bold",
		color: Colors.primary500,
	},
	labelError: {
		color: "red",
	},
	input: {
		borderRadius: 15,
		marginVertical: 0,
		paddingHorizontal: 4,
		paddingVertical: 8,
		fontSize: 20,
		borderBottomColor: Colors.primary700,
		borderBottomWidth: 2,
		backgroundColor: Colors.primary100,
	},
});
