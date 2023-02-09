import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { GlobalStyles } from '@constants/styles';

import DateInput from '@components/ManageExpense/DateInput';
import Input from '@components/ManageExpense/Input';
import Button from '@components/UI/Button';

const amountRules = {
	required: {
		value: true,
		message: '가격은 필수 입니다. 쳐 적으세요 뒤지기 싫으면',
	},
	min: { value: 2.0, message: '최소 2 입니다.' },
	max: { value: 200.0, message: '최대 200원 입니다.' },
	valueAsNumber: { value: true, message: '숫자만 쳐 입력하세요.' },
	pattern: {
		value: /^(0|[1-9]\d*)(\.\d+)?$/,
		message: '오직 숫자만 입력해 주세요!',
	},
	validate: (amount) => ({
		value: amount > 0,
		message: '양수여야 합니다. 생각을 좀 쳐 하고 입력하세요.',
	}),
};

const dateRules = {
	required: {
		value: true,
		message: '날짜 입력하세요.',
	},
	pattern: {
		value: /d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/,
		message: '날짜 형식에 맞춰 주세요!',
	},
	validate: (value) => {
		return Date.now() - value > 0;
	},
};

const descriptionRules = {
	required: {
		value: true,
		message: '상세 설명 입력 하세요.',
	},
};

const ExpenseForm = ({
	submitButtonLabel,
	onCancel,
	onSubmit,
	defaultValues,
}) => {
	const methods = useForm({ defaultValues });
	const {
		handleSubmit,
		formState: { isDirty },
	} = methods;
	const navigation = useNavigation();

	const checkBeforeSubmit = () => {
		if (isDirty) {
			handleSubmit(onSubmit)();
		} else {
			navigation.goBack();
		}
	};

	return (
		<View style={styles.form}>
			<FormProvider {...methods}>
				<Text style={styles.title}>Your Expense</Text>
				<View style={styles.inputsRow}>
					<Input
						style={styles.rowInput}
						label="amount"
						keyboardType="decimal-pad"
						multiline={false}
						rules={amountRules}
					/>
					<DateInput
						style={styles.rowInput}
						label="date"
						keyboardType="none"
						multiline={false}
						rules={dateRules}
					/>
				</View>
				<Input
					label="description"
					multiline
					keyboardType="default"
					rules={descriptionRules}
				/>
				<View style={styles.buttons}>
					<Button
						style={styles.button}
						mode="flat"
						onPress={onCancel}
					>
						Cancel
					</Button>
					<Button style={styles.button} onPress={checkBeforeSubmit}>
						{submitButtonLabel}
					</Button>
				</View>
			</FormProvider>
		</View>
	);
};

export default ExpenseForm;

const styles = StyleSheet.create({
	form: {
		marginTop: 40,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
		marginVertical: 24,
		textAlign: 'center',
	},
	inputsRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	rowInput: {
		flex: 1,
	},
	errorText: {
		textAlign: 'center',
		color: GlobalStyles.colors.error500,
		margin: 8,
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		minWidth: 120,
		marginHorizontal: 8,
	},
});
