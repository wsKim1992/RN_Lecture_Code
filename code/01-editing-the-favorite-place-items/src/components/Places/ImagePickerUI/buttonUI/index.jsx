import { Pressable, StyleSheet, Text } from "react-native";

import { Colors } from "@constants/colors";

const ButtonUI = ({ label, onPress, viewStyle }) => {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [
				styles.container,
				viewStyle,
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
		marginHorizontal: 15,
		marginTop: 15,
		borderRadius: 15,
		backgroundColor: Colors.primary400,
		paddingHorizontal: 4,
		paddingVertical: 8,
		alignItems: "center",
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
