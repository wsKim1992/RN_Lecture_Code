import React, { useEffect, useRef } from "react";
import {
	Animated,
	Dimensions,
	Modal,
	PanResponder,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from "react-native";

const BottonSheet = (props) => {
	const { modalVisible, setModalVisible } = props;
	const screenHeight = Dimensions.get("screen").height;
	const panY = React.useRef(new Animated.Value(0)).current;
	const translateY = panY.interpolate({
		inputRange: [-1, 0, 1],
		outputRange: [-1, 0, 0],
	});

	const resetBottomSheet = Animated.timing(panY, {
		toValue: 0,
		duration: 300,
		useNativeDriver: true,
	});

	const closeBottomSheet = Animated.timing(panY, {
		toValue: screenHeight,
		duration: 300,
		useNativeDriver: true,
	});

	const panResponders = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: () => false,
			onPanResponderMove: (event, gestureState) => {
				const { y0, moveY, dy } = gestureState;
				console.log(y0);
				if (dy == 0) {
					// panY.setValue(0);
				} else {
					console.log(`dy : ${dy}`);
					panY.setValue(dy);
				}
			},
			onPanResponderRelease: (event, gestureState) => {
				/* if (gestureState.dy > 0 || gestureState.vy > 1.5) {
					resetBottomSheet.start();
				} */
				const { y0, moveY, dy } = gestureState;
				console.log(panY);
			},
		})
	).current;

	useEffect(() => {
		if (modalVisible) {
			resetBottomSheet.start();
		}
	}, [modalVisible]);

	const closeModal = () => {
		closeBottomSheet.start(() => {
			setModalVisible(false);
		});
	};

	return (
		<Modal
			visible={modalVisible}
			animationType={"fade"}
			transparent
			statusBarTranslucent
		>
			<View style={styles.overlay}>
				<TouchableWithoutFeedback onPress={closeModal}>
					<View style={styles.background} />
				</TouchableWithoutFeedback>
				<Animated.View
					style={{
						...styles.bottomSheetContainer,
						transform: [{ translateY: translateY }],
					}}
					{...panResponders.panHandlers}
				>
					<Text>This is BottomSheet</Text>
				</Animated.View>
			</View>
		</Modal>
	);
};

export default BottonSheet;

const styles = StyleSheet.create({
	modal: {
		position: "absolute",
		top: 30,
		left: 0,
		zIndex: 100,
	},
	overlay: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0, 0, 0, 0.4)",
	},
	background: {
		flex: 1,
	},
	bottomSheetContainer: {
		height: 300,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
});
