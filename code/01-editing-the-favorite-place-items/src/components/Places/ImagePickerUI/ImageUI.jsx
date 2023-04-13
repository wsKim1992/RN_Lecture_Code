import React from "react";
import { Animated, Image, StyleSheet, View } from "react-native";

import { observer } from "mobx-react-lite";

import UploadPictureStore from "@store/UploadPicture";

const ImageUI = observer(({ uri }) => {
	const { changeShowPictureMode, showPictureMode } = UploadPictureStore;

	const fadeAim = React.useRef(new Animated.Value(0)).current;
	function fadeIn() {
		Animated.timing(fadeAim, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true,
		}).start();
	}

	function fadeOut() {
		Animated.timing(fadeAim, {
			toValue: 0,
			duration: 1000,
			useNativeDriver: true,
		}).start();
	}

	React.useEffect(() => {
		console.log(showPictureMode);
		if (showPictureMode == 3) {
			fadeIn();
		} else if (showPictureMode == 2) {
			fadeOut();
			setTimeout(() => {
				changeShowPictureMode([{ step: 1, value: 1 }], false);
			}, 1000);
		}
	}, [showPictureMode]);

	return (
		<Animated.View
			style={[
				styles.container,
				{
					opacity: fadeAim,
				},
			]}
		>
			<Image style={styles.image} source={{ uri }} />
		</Animated.View>
	);
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginVertical: 10,
		borderRadius: 20,
		overflow: "hidden",
		flexDirection: "row",
		backgroundColor: "red",
	},
	image: {
		flex: 1,
		height: "auto",
	},
});

export default ImageUI;
