import React from "react";
import { Animated, StyleSheet, View, useWindowDimensions } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { observer } from "mobx-react-lite";

import UploadPictureStore from "@store/UploadPicture";

import { Colors } from "@constants/colors";

import IconButton from "@components/UI/IconButton";

const Modal = observer(({ children }) => {
	const { showEndModal } = UploadPictureStore;
	const popUpAnimation = React.useRef(new Animated.Value(285)).current;
	function showUpward() {
		Animated.timing(popUpAnimation, {
			toValue: 0,
			duration: 1000,
			useNativeDriver: true,
		}).start();
	}

	const { width: windowWidth } = useWindowDimensions();

	React.useEffect(() => {
		if (showEndModal) {
			showUpward();
		}
	}, [showEndModal]);

	return (
		<Animated.View
			style={[
				styles.container,
				{
					transform: [
						{ translateX: windowWidth > 500 ? -177.5 : -160.5 },
						{ translateY: popUpAnimation },
					],
				},
			]}
		>
			<View style={styles.cancelButtonBox}>
				<IconButton
					icon={"exit-outline"}
					size={25}
					color={Colors.primary700}
				/>
			</View>
			<View style={styles.buttonBox}>{children}</View>
		</Animated.View>
	);
});

export default Modal;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: 355,
		height: 255,
		position: "absolute",
		left: "50%",
		bottom: 0,
		marginHorizontal: "auto",
		backgroundColor: "#fff",
		opacity: 1,
		borderRadius: 15,
	},
	buttonBox: {
		flex: 1,
		width: "100%",
		height: 255,
		padding: 5,
		flexDirection: "column",
	},
	cancelButtonBox: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
		height: 50,
		width: "100%",
		padding: 5,
	},
});
