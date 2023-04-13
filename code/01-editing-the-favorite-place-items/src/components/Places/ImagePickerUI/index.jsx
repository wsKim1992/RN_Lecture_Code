import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Animated, StyleSheet, Text, View } from "react-native";

import {
	PermissionStatus,
	launchCameraAsync,
	launchImageLibraryAsync,
	useCameraPermissions,
	useMediaLibraryPermissions,
} from "expo-image-picker";
import { observer } from "mobx-react-lite";

import UploadPictureStore from "@store/UploadPicture";

import { Colors } from "@constants/colors";

import ImageUI from "@components/Places/ImagePickerUI/ImageUI";
import ButtonUI from "@components/Places/ImagePickerUI/buttonUI";
import IconButton from "@components/UI/IconButton";

const ImagePicerController = ({ label, rule }) => {
	const { control } = useFormContext();
	return (
		<Controller
			name={label}
			rules={rule}
			control={control}
			render={({
				field: { onChange, value },
				fieldState: { inValid, error },
			}) => {
				return (
					<ImagePickerUI
						onChange={onChange}
						inValid={inValid}
						error={error}
						value={value}
					/>
				);
			}}
		/>
	);
};

const ImagePickerUI = observer(({ onChange, inValid, error, value }) => {
	const { uploadMode, showPictureMode, changeShowPictureMode } =
		UploadPictureStore;

	const [cameraPermission, requestCameraPermission] = useCameraPermissions();
	const [galleryPermission, requestGalleryPermission] =
		useMediaLibraryPermissions();
	const [imageData, setImageData] = React.useState(null);
	async function getCameraPermission() {
		if (cameraPermission.status === PermissionStatus.UNDETERMINED) {
			const requestPerission = await requestCameraPermission();
			return requestPerission.granted;
		}
		if (cameraPermission.status === PermissionStatus.DENIED) {
			return false;
		}
		return true;
	}

	function onClickToggleButton() {
		if (!value) return false;
		if (showPictureMode === 0) {
			const mode = [
				{ step: 0, value: 1 },
				{ step: 1, value: 1 },
			];
			const showImage = true;
			changeShowPictureMode(mode, showImage);
		} else if (showPictureMode > 0) {
			const mode = [{ step: 0, value: 1 }];
			const showImage = false;
			changeShowPictureMode(mode, showImage);
		}
	}

	async function turnOnCamera() {
		try {
			console.log("turn on camera");
			const permissionFlag = await getCameraPermission();
			if (!permissionFlag) {
				throw new Error("카메라 권한 문제");
			}
			const imageData = await launchCameraAsync({
				allowsEditing: true,
				aspect: [16, 9],
				quality: 0.6,
			});
			onChange(imageData);
			console.log(imageData.assets);
		} catch (err) {
			console.error(err);
		}
	}

	async function getGalleryPermission() {
		if (galleryPermission.status === PermissionStatus.UNDETERMINED) {
			const requestPermission = await requestGalleryPermission();
			return requestPermission.granted;
		}
		if (galleryPermission.status === PermissionStatus.DENIED) {
			return false;
		}
		return true;
	}

	async function approachGalleryData() {
		try {
			const permissionFlag = await getGalleryPermission();
			if (!permissionFlag) throw new Error("사진첩 권한 접근 제한");
			const imageData = await launchImageLibraryAsync({
				allowsEditing: true,
				aspect: [16, 16],
				quality: 0.6,
			});

			onChange(imageData);
		} catch (err) {
			console.error(err);
		}
	}
	return (
		<View style={styles.container}>
			<View style={styles.titleBox}>
				<Text style={styles.titleTextStyle}>Image Source</Text>
				{(inValid || error) && (
					<Text style={[styles.titleTextStyle, styles.labelError]}>
						{error.message}
					</Text>
				)}
				<IconButton
					icon={showPictureMode > 0 ? "caret-up" : "caret-down"}
					size={25}
					color={Colors.primary400}
					onPress={() => onClickToggleButton()}
				/>
			</View>
			{value && showPictureMode > 0 && <ImageUI uri={value.uri} />}
			<View style={styles.inputBox}>
				<Text style={styles.inputText}>{value && value.uri}</Text>
			</View>
			<View style={styles.buttonBox}>
				<ButtonUI
					onPress={turnOnCamera}
					label="카메라"
					viewStyle={{ width: 135 }}
				/>
				<ButtonUI
					onPress={approachGalleryData}
					label="사진첩"
					viewStyle={{ width: 135 }}
				/>
			</View>
		</View>
	);
});

export default ImagePicerController;

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
	labelError: {
		color: "red",
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
