import React from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";

import {
	PermissionStatus,
	launchCameraAsync,
	useCameraPermissions,
} from "expo-image-picker";

import { Colors } from "@constants/colors";

import OutlinedButton from "@components/UI/OutlinedButton";

const ImagePicker = () => {
	const [pickedImage, setPickedImage] = React.useState(null);

	const [cameraPermissionInformation, requestPermission] =
		useCameraPermissions();

	async function verifyPermissions() {
		if (
			cameraPermissionInformation.status === PermissionStatus.UNDETERMINED
		) {
			const permissionResponse = await requestPermission();
			return permissionResponse.granted;
		}
		if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
			Alert.alert("Insufficient Permissions!");
			return false;
		}
		return true;
	}

	async function takeImageHandler() {
		try {
			const hasPermission = await verifyPermissions();
			if (!hasPermission) {
				throw new Error("Insufficient Permissions");
			}
			const image = await launchCameraAsync({
				allowsEditing: true,
				aspect: [16, 9],
				quality: 0.5,
			});
			setPickedImage(image.uri);
		} catch (err) {
			console.error(err);
		}
	}

	let imagePreview = <Text>No Image Taken Yet</Text>;

	if (pickedImage) {
		imagePreview = (
			<Image style={styles.image} source={{ uri: pickedImage }} />
		);
	}

	return (
		<View>
			<View style={styles.imagePreview}>{imagePreview}</View>
			<OutlinedButton icon="camera" onPress={takeImageHandler}>
				Take Image
			</OutlinedButton>
		</View>
	);
};

export default ImagePicker;

const styles = StyleSheet.create({
	imagePreview: {
		width: "100%",
		height: 200,
		marginVertical: 8,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.primary100,
		borderRadius: 4,
	},
	image: {
		width: "100%",
		height: "100%",
	},
});
