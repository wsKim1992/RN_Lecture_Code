import { Pressable, StyleSheet, Text } from "react-native";

import { Colors } from "@constants/colors";

const ButtonUI = ({ label }) => {
	return (
		<Pressable
			style={({ pressed }) => [
				styles.container,
				pressed && styles.containerPressed,
			]}
		>
			<Text style={styles.textStyle}>{label}</Text>
		</Pressable>
	);
};

export default ButtonUI;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 15,
		marginTop: 15,
		borderRadius: 15,
		backgroundColor: Colors.primary400,
		paddingHorizontal: 4,
		paddingVertical: 8,
	},
	containerPressed: {
		backgroundColor: Colors.accent500,
	},
	textStyle: {
		textAlign: "center",
		fontSize: 20,
		color: Colors.primary800,
	},
});
