import React from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";

import {
	PermissionStatus,
	getCurrentPositionAsync,
	useForegroundPermissions,
} from "expo-location";

import getMapPreview from "@util/location";

import { Colors } from "@constants/colors";

import OutlinedButton from "@components/UI/OutlinedButton";

const LocationPicker = () => {
	const [pickedLocation, setPickedLocation] = React.useState();
	const [locationPermissionInformation, requestPermission] =
		useForegroundPermissions();

	async function verifyPermissions() {
		if (
			locationPermissionInformation.status ===
			PermissionStatus.UNDETERMINED
		) {
			const permissionREsponse = await requestPermission();
			return permissionREsponse.granted;
		}

		if (locationPermissionInformation.status === PermissionStatus.DENIED) {
			Alert.alert(
				"Insufficient Permissions!",
				"You need to grant location permissions to use this app."
			);
			return false;
		}
		return true;
	}

	async function getLocationHandler() {
		console.log("getLocationHAndler");
		const hasPermission = await verifyPermissions();
		console.log(hasPermission);
		if (!hasPermission) {
			return;
		}
		try {
			console.log("try");
			const location = await getCurrentPositionAsync();
			console.log(location.coords);
			setPickedLocation({
				lat: location.coords.latitude,
				lng: location.coords.longitude,
			});
		} catch (err) {
			console.error(err);
		}
	}

	function pickOnMapHandler() {}

	let locationPreview = <Text>no Location picked yet</Text>;
	if (pickedLocation) {
		locationPreview = (
			<Image
				style={styles.mapPreviewImage}
				source={{
					uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
				}}
			/>
		);
	}
	return (
		<View>
			<View style={styles.mapPreview}>{locationPreview}</View>
			<View style={styles.actions}>
				<OutlinedButton icon="location" onPress={getLocationHandler}>
					Locate User
				</OutlinedButton>
				<OutlinedButton icon="map" onPress={pickOnMapHandler}>
					Pick on Map
				</OutlinedButton>
			</View>
		</View>
	);
};

export default LocationPicker;

const styles = StyleSheet.create({
	mapPreview: {
		width: "100%",
		height: 200,
		marginVertical: 8,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.primary100,
		borderRadius: 4,
	},
	actions: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	mapPreviewImage: {
		width: "100%",
		height: "100%",
	},
});
