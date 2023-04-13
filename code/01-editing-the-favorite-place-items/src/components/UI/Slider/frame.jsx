import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import { observer } from "mobx-react-lite";

import { Colors } from "@constants/colors";

import BottomSheet from "@components/UI/Slider/frame_bottom_sheet";
//import BottomSheet from "@components/UI/Slider/bottomSheet_example";

const { height: windowHeight } = Dimensions.get("window");

const Frame = observer(({ children }) => {
	const [modalVisible, setModalVisible] = React.useState(true);
	return (
		<View style={styles.container}>
			<View style={styles.titleBox}>
				<Text style={styles.title}>이미지 타이틀</Text>
				<Text style={styles.dateText}>2023-06-09</Text>
			</View>
			<View style={styles.imageBox}>{children}</View>
			<BottomSheet
			/>
		</View>
	);
});

export default Frame;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "space-between",
		position: "absolute",
		top: 0,
		left: 0,
	},
	titleBox: {
		width: "100%",
		height: 55,
		backgroundColor: Colors.primary800,
		padding: 5,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	title: {
		color: "#fff",
		fontSize: 25.5,
		lineHeight: 45,
	},
	dateText: {
		color: "#fff",
		fontSize: 18.5,
		lineHeight: 45,
	},
	imageBox: {
		width: "100%",
		height: "auto",
	},
});
