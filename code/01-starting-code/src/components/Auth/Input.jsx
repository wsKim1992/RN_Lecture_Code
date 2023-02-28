import { Controller, useFormContext } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors } from '@constants/styles';

const Input = ({ label, keyboardType, secure, rules, name }) => {
	const { control } = useFormContext();
	return (
		<Controller
			name={name}
			control={control}
			rules={{ ...rules }}
			render={({
				field: { onChange, onBlur, value, ref },
				fieldState: { invalid, error },
			}) => {
				return (
					<View style={styles.inputContainer}>
						<View style={styles.labelBox}>
							<Text
								style={[
									styles.label,
									invalid && styles.labelInvalid,
								]}
							>
								{label}
							</Text>
							{(invalid || error) && (
								<Text style={styles.labelErrorBox}>
									{error.message}
								</Text>
							)}
						</View>

						<TextInput
							style={[
								styles.input,
								(invalid || error) && styles.inputInvalid,
							]}
							autoCapitalize={false}
							keyboardType={keyboardType}
							secureTextEntry={secure}
							onChangeText={onChange}
							value={value}
							onBlur={onBlur}
							ref={ref}
						/>
					</View>
				);
			}}
		/>
	);
};

export default Input;

const styles = StyleSheet.create({
	inputContainer: {
		marginVertical: 8,
	},
	labelBox: {
		alignSelf: 'stretch',
		flexDirection: 'row',
		marginBottom: 4,
	},
	label: {
		flex: 1,
		color: 'white',
	},
	labelErrorBox: {
		flex: 1,
		color: Colors.error500,
		textAlign: 'left',
	},
	labelInvalid: {
		color: Colors.error500,
	},
	input: {
		paddingVertical: 8,
		paddingHorizontal: 6,
		backgroundColor: Colors.primary100,
		borderRadius: 4,
		fontSize: 16,
	},
	inputInvalid: {
		backgroundColor: Colors.error100,
	},
});
