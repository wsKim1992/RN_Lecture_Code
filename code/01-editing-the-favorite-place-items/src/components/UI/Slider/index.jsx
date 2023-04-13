import React from "react";
import {
	Dimensions,
	Image,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";

import { observer } from "mobx-react-lite";

import { Colors } from "@constants/colors";

import Frame from "@components/UI/Slider/frame";

const { width, height } = Dimensions.get("window");
const SliderComponent = observer(() => {
	const [pageNum, setPageNum] = React.useState(0);
	const { width: windowWidth } = Dimensions.get("window");
	function setSliderPage(event) {
		const { x } = event.nativeEvent.contentOffset;
		const indexNext = Math.floor(x / windowWidth);
		if (indexNext !== pageNum) {
			setPageNum(indexNext);
		}
	}
	return (
		<View style={styles.container}>
			<View style={styles.pageDotBox}>
				{Array.from({ length: 3 }).map((item, idx) => (
					<View
						key={idx}
						style={[
							styles.dot,
							idx === pageNum && styles.dotSelected,
						]}
					></View>
				))}
			</View>
			<Frame>
				<SafeAreaView>
					<ScrollView
						showsHorizontalScrollIndicator={false}
						onScroll={setSliderPage.bind(this)}
						style={{ width, height }}
						horizontal={true}
						scrollEventThrottle={16}
						pagingEnabled={true}
					>
						<View style={{ width, height }}>
							<Image
								style={styles.image}
								source={require("@public/image/sample1.jpg")}
							/>
						</View>
						<View style={{ width, height }}>
							<Image
								style={styles.image}
								source={require("@public/image/sample2.jpg")}
							/>
						</View>
						<View style={{ width, height }}>
							<Image
								style={styles.image}
								source={require("@public/image/sample3.jpg")}
							/>
						</View>
					</ScrollView>
				</SafeAreaView>
			</Frame>
		</View>
	);
});

export default SliderComponent;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: "relative",
	},
	pageDotBox: {
		position: "absolute",
		top: "65%",
		left: "50%",
		width: 100,
		marginLeft: -50,
		height: 10,
		zIndex: 2,
		backgroundColor: Colors.primary100,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly",
		borderRadius: 5,
		opacity: 0.65,
	},
	dot: {
		height: 10,
		width: 10,
		borderRadius: 10 / 2,
		backgroundColor: Colors.gray700,
	},
	dotSelected: {
		backgroundColor: Colors.primary700,
	},
	scrollView: {
		width: "100%",
		height: "100%",
	},
	singleSlide: {
		width: "100%",
		height: "100%",
		backgroundColor: "red",
	},
	image: {
		width: "100%",
		height: "100%",
		objectFit: "contain",
	},
});
