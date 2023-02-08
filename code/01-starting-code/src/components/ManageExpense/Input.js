import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';

import { InputStyles } from '@constants/inputStyle';

const Input = ({ label, style, multiline, keyboardType, rules }) => {
	const inputStyles = [InputStyles.input];
	const {
		control,
		formState: { errors },
	} = useFormContext();

	if (multiline) {
		inputStyles.push(InputStyles.inputMultiline);
	}

	if (errors[label]) {
		inputStyles.push(InputStyles.invalidInput);
	}

	return (
		<Controller
			control={control}
			name={label}
			rules={rules}
			render={({ field: { onChange, onBlur, value } }) => {
				return (
					<View style={[InputStyles.inputContainer, style]}>
						<Text
							style={[
								InputStyles.label,
								errors[label] && InputStyles.invalidLabel,
							]}
						>
							{label}
						</Text>
						<TextInput
							value={`${value}`}
							multiline={multiline}
							onBlur={onBlur}
							onChangeText={onChange}
							editable
							style={inputStyles}
							keyboardType={keyboardType}
						/>
						{errors[label] && (
							<View style={InputStyles.inValidMessageViewStyle}>
								<Text
									style={InputStyles.inValidMessageTextStyle}
								>
									{errors[label].message}
								</Text>
							</View>
						)}
					</View>
				);
			}}
		/>
	);
};

export default Input;
