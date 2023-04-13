import { Image, StyleSheet, View } from "react-native";

const ImageBox = ({ source }) => {
	console.log(`source : ${source}`);
	return (
		<View style={styles.container}>
			<Image
				style={styles.image}
				source={require("@public/image/sample1.jpg")}
			/>
		</View>
	);
};

export default ImageBox;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "red",
	},
	image: {
		flex: 1,
		width: "100%",
		height: "auto",
		objectFit: "contain",
	},
});
