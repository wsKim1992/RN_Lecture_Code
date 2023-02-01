import React from 'react';
import { Keyboard, Pressable, Text, TextInput, View } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import { getFormattedDate } from '@util/date';

import { InputStyles } from '@constants/inputStyle';

const DateInput = ({ label, style, initialDate, textInputConfig }) => {
	const [showDatePicker, setShowDatePicker] = React.useState(false);
	const [mode] = React.useState('date');
	const [year, month, day] = initialDate.split('-');
	const [date, setDate] = React.useState(new Date(year, month - 1, day));
	const [dateStr, setDateStr] = React.useState(getFormattedDate(date));
	const DateInputTextOnFocus = () => {
		setShowDatePicker(true);
	};

	const onDateChange = (event) => {
		setShowDatePicker(false);
		const {
			nativeEvent: { timestamp },
		} = event;
		const newDateObj = new Date(timestamp);
		setDate(newDateObj);
		setDateStr(getFormattedDate(newDateObj));
	};

	return (
		<>
			<View style={[InputStyles.inputContainer, style]}>
				<Pressable onPress={Keyboard.dismiss()}>
					<Text style={[InputStyles.label]}>{label}</Text>
					<TextInput
						value={dateStr}
						style={InputStyles.input}
						{...textInputConfig}
						onFocus={DateInputTextOnFocus.bind(this)}
					/>
				</Pressable>
			</View>
			{showDatePicker && (
				<DateTimePicker
					is24Hour
					mode={mode}
					value={date}
					display="spinner"
					onChange={onDateChange.bind(this)}
				/>
			)}
		</>
	);
};

export default DateInput;
