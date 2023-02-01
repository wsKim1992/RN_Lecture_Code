import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

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
	valueAsNumber: true,
	pattern: {
		value: /^(0|[1-9]\d*)(\.\d+)?$/,
		message: '오직 숫자만 입력해 주세요!',
	},
	validate: (amount) => ({
		value: amount <= 0,
		message: '양수여야 합니다. 생각을 좀 쳐 하고 입력하세요.',
	}),
};

const dateRules = {
	required: {
		value: true,
		message: '날짜 입력하세요.',
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
	const { handleSubmit } = methods;
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
					{/* <DateInput
						style={styles.rowInput}
						label="date"
						keyboardType="numeric"
						multiline={false}
						
						rules={dateRules}
					/> */}
				</View>
				<Input
					label="description"
					multiline
					keyboardType="default"
					rules={descriptionRules}
				/>
				{/* {formIsInvalid && (
					<Text style={styles.errorText}>
						Invalid input values - please check your entered data!
					</Text>
				)} */}
				<View style={styles.buttons}>
					<Button
						style={styles.button}
						mode="flat"
						onPress={onCancel}
					>
						Cancel
					</Button>
					<Button
						style={styles.button}
						onPress={handleSubmit(onSubmit)}
					>
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
