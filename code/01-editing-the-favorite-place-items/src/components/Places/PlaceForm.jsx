import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
	BackHandler,
	Keyboard,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";

import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { observer } from "mobx-react-lite";

import UploadPictureStore from "@store/UploadPicture";

import { Colors } from "@constants/colors";

import DatePickerUI from "@components/Places/DatePickerUI";
import ImagePickerUI from "@components/Places/ImagePickerUI";
import ButtonUI from "@components/Places/ImagePickerUI/buttonUI";
import InputUI from "@components/Places/InputUI";
import IconButton from "@components/UI/IconButton";
import Modal from "@components/UI/Modal";

const rules = {
	title: {
		required: {
			value: true,
			message: "제목을 입력해 주세요!",
		},
		maxLength: {
			value: 7,
			message: "제목을 최대 7자 입니다.",
		},
		minLength: {
			value: 3,
			message: "제목은 최소 3자 입니다.",
		},
	},
	date: {
		validate: (value) => {
			const diff = value.getTime() - Date.now();
			if (diff > 0) return "현재 날짜 이전이여야 합니다!";
			return null;
		},
	},
	imageData: {
		required: {
			value: true,
			message: "이미지를 업로드해 주세요",
		},

		validate: (data) => {
			const { width, height } = data;
			if (height > 1000) {
				return "이미지 세로 해상도는 1000 pixel 미만 이여야 합니다!";
			}
			if (width > 1000) {
				return "이미지 가로 해상도는 1000 pixel 미만 이여야 합니다!";
			}
			return null;
		},
	},
};

const PlaceForm = observer(() => {
	const { showEndModal, setShowEndModal, initEntireState } =
		UploadPictureStore;
	const formMethods = useForm({
		defaultValues: { date: new Date(), title: "", imageData: null },
	});
	const { handleSubmit, setFocus } = formMethods;
	const navigate = useNavigation();

	function onSubmit(data) {
		console.log(data);
	}

	function onPressBackButton() {
		initEntireState();
		navigate.pop();
	}

	function onCancelEvent() {
		setShowEndModal();
	}

	function onError(err) {
		const firstErr = Object.keys(err)[0];
		setFocus(firstErr);
	}
	useFocusEffect(
		React.useCallback(() => {
			function backAction() {
				setShowEndModal();
				return true;
			}
			const backHandler = BackHandler.addEventListener(
				"hardwareBackPress",
				backAction
			);
			return () => backHandler.remove();
		}, [])
	);

	React.useEffect(() => {
		navigate.setOptions({
			headerLeft: ({ tintColor }) => (
				<IconButton
					icon="exit-outline"
					size={24}
					color={tintColor}
					onPress={onCancelEvent.bind(this)}
				/>
			),
		});
	}, []);

	return (
		<Pressable
			onPress={Keyboard.dismiss()}
			style={[
				styles.container,
				showEndModal && { backgroundColor: "#000" },
			]}
		>
			<FormProvider {...formMethods}>
				<View style={styles.inputBox}>
					<InputUI label="title" rule={rules.title} />
					<DatePickerUI label="date" rule={rules.date} />
				</View>
				<ImagePickerUI label={"imageData"} rule={rules.imageData} />
				<View style={styles.submitButtonBox}>
					<ButtonUI
						label={"upload"}
						onPress={handleSubmit(onSubmit, onError)}
					/>
				</View>
			</FormProvider>
			{showEndModal && (
				<Modal>
					<Text style={styles.textStyle}>
						업로드를 취소 하시겠습니까?
					</Text>
					<ButtonUI
						onPress={onPressBackButton}
						label={"업로드 취소하기"}
						viewStyle={{ height: 50 }}
					/>
				</Modal>
			)}
		</Pressable>
	);
});

export default PlaceForm;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		paddingBottom: 0,
	},
	inputBox: {
		flexDirection: "row",
	},
	submitButtonBox: {
		height: 100,
	},
	textStyle: {
		textAlign: "center",
		fontSize: 20,
		color: Colors.primary800,
	},
});
