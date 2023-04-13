import React, { useEffect } from "react";
import {
	Animated,
	Dimensions,
	PanResponder,
	StyleSheet,
	View,
	useWindowDimensions,
} from "react-native";

import { Colors } from "@constants/colors";

import IconButton from "@components/UI/IconButton";

const BottomSheet = () => {
	const translateY = React.useRef(new Animated.Value(480)).current;
	const { height: windowHeight } = useWindowDimensions();
	const [panState, setPanState] = React.useState(0);
	const [showTextField, setShowTextField] = React.useState(false);
	const showTextFieldAnim = Animated.timing(translateY, {
		toValue: 300,
		duration: 1000,
		useNativeDriver: true,
	});

	const fadeTextFieldAnim = Animated.timing(translateY, {
		toValue: 480,
		duration: 1000,
		useNativeDriver: true,
	});

	function showTextFieldFunc() {
		setPanState((prev) => {
			return showTextField ? prev ^ (1 << 0) : prev | (1 << 0);
		});
	}

	const panResponders = React.useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: () => false,
			onPanResponderMove: React.useCallback(
				(event, gestureState) => {
					const { dy, y0 } = gestureState;
					let startOffset;
					if (dy <= 0) {
						if (!showTextField & (1 << 0)) {
							startOffset = 480;
						} else if (showTextField & (1 << 0)) {
							startOffset = 300;
						}
						translateY.setValue(startOffset + dy);
					} else {
						translateY.setValue(dy);
					}
				},
				[showTextField]
			),
			onPanResponderRelease: React.useCallback(
				(event, gestureState) => {
					const { dy, vy } = gestureState;
					if (dy < 0) {
						let startOffset;
						if (!showTextField & (1 << 0)) {
							startOffset = 480;
						} else if (showTextField & (1 << 0)) {
							startOffset = 300;
						}
						if (startOffset + dy < windowHeight / 2) {
							translateY.setValue(0);
						} else {
							translateY.setValue(startOffset);
						}
					} else {
						let endOffset;
						if (!showTextField & (1 << 0)) {
							endOffset = 480;
						} else if (showTextField & (1 << 0)) {
							endOffset = 300;
						}
						console.log(`endOffset : ${endOffset}`);
						translateY.setValue(endOffset);
					}
				},
				[showTextField]
			),
		})
	).current;

	useEffect(() => {
		console.log(panState & (1 << 0));
		if (!panState & (1 << 0) && showTextField) {
			fadeTextFieldAnim.start(() => {
				setShowTextField(false);
			});
		} else if (panState & (1 << 0)) {
			showTextFieldAnim.start(() => {
				setShowTextField(true);
			});
		}
	}, [panState, showTextField]);

	return (
		<Animated.View
			style={{
				...styles.bottomBox,
				transform: [{ translateY: translateY }],
			}}
			{...panResponders.panHandlers}
		>
			<View style={styles.tapBarBox}>
				<View style={styles.tapBar}></View>
			</View>
			<View style={styles.replyTextFieldBox}>
				<View style={styles.iconBox}>
					<View style={styles.emotionBox}>
						<IconButton
							icon={"md-heart-sharp"}
							color={"red"}
							size={25}
						/>
						<IconButton
							icon={"md-heart-dislike-outline"}
							color={Colors.primary700}
							size={25}
						/>
					</View>
					<View>
						<IconButton
							icon={
								panState & (1 << 0) ? "caret-up" : "caret-down"
							}
							color={"black"}
							size={25}
							onPress={showTextFieldFunc.bind(this)}
						/>
					</View>
				</View>
				{showTextField && <View style={styles.textFieldBox}></View>}
			</View>
		</Animated.View>
	);
};

export default BottomSheet;

const styles = StyleSheet.create({
	bottomBox: {
		position: "absolute",
		bottom: "0%",
		left: "0%",
		width: "100%",
		zIndex: 2,
		height: 225 + 300,
		backgroundColor: "#fff",
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		paddingTop: 5,
		paddingLeft: 15,
		paddingRight: 15,
	},
	tapBarBox: {
		width: "100%",
		height: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	tapBar: {
		width: 30,
		height: 3,
		backgroundColor: Colors.gray700,
		borderRadius: 5,
	},
	replyTextFieldBox: {
		width: "100%",
		height: 210,
	},
	iconBox: {
		width: "100%",
		height: 30,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	emotionBox: {
		width: 60,
		height: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	textFieldBox: {
		width: "100%",
		height: 180,
		backgroundColor: "yellow",
	},
});
