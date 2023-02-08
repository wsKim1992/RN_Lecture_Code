import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Keyboard, Pressable, Text, TextInput, View } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import { getFormattedDate } from '@util/date';

import { InputStyles } from '@constants/inputStyle';

const DateInput = ({ label, style, keyboardType, rules }) => {
	const {
		control,
		formState: { errors, defaultValues },
		setValue,
	} = useFormContext();
	const [showDatePicker, setShowDatePicker] = React.useState(false);
	const [mode] = React.useState('date');

	const DateInputTextOnFocus = () => {
		setShowDatePicker(true);
	};

	const onDateChange = (event) => {
		setShowDatePicker(false);
		const {
			nativeEvent: { timestamp },
		} = event;
		const newDateObj = new Date(timestamp);
		setValue(label, newDateObj);
	};

	return (
		<>
			<Controller
				name={label}
				control={control}
				rules={rules}
				render={({ field: { value } }) => {
					return (
						<>
							<View style={[InputStyles.inputContainer, style]}>
								<Pressable onPress={Keyboard.dismiss()}>
									<Text style={[InputStyles.label]}>
										{label}
									</Text>
									<TextInput
										value={getFormattedDate(value)}
										style={InputStyles.input}
										keyboardType={keyboardType}
										onFocus={DateInputTextOnFocus.bind(
											this
										)}
										defaultValue={defaultValues[label]}
									/>
									{errors[label] && (
										<View
											style={
												InputStyles.inValidMessageViewStyle
											}
										>
											<Text
												style={
													InputStyles.inValidMessageTextStyle
												}
											>
												{errors[label].message}
												{errors[label].type ==
													'validate' &&
													'오늘 이후의 날짜는 설정할 수 없습니다.'}
											</Text>
										</View>
									)}
								</Pressable>
							</View>
							{showDatePicker && (
								<DateTimePicker
									is24Hour
									mode={mode}
									value={value}
									display="spinner"
									onChange={onDateChange.bind(this)}
								/>
							)}
						</>
					);
				}}
			/>
		</>
	);
};

export default DateInput;
