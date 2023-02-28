import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { check } from 'prettier';

import { AuthRules } from '@constants/rules';

import Button from '@components/ui/Button';

import Input from './Input';

const inputComponentsObj = [
	{
		label: 'Email Address',
		keyboardType: 'email-address',
		name: 'email',
		rules: AuthRules.email,
		secure: false,
	},
	{
		label: 'Password',
		keyboardType: 'default',
		name: 'password',
		secure: true,
		rules: AuthRules.password,
	},
	{
		label: 'Confirm Password',
		keyboardType: 'default',
		secure: true,
		name: 'checkPassword',
		rules: AuthRules.checkPassword,
	},
];

const AuthFormFormSignUp = () => {
	const methods = useForm({
		defaultValues: { email: '', password: '', checkPassword: '' },
	});
	const { handleSubmit, watch, setFocus } = methods;
	const submitHandler = (data) => {
		console.log(data);
	};

	const checkPasswordValidation = (checkPassword) => {
		const password = watch('password');
		if (password !== checkPassword) {
			return '비밀번호와 재입력한 비밀번호가 일치하지 않습니다!';
		}
		return null;
	};

	const errorHandler = (errors) => {
		console.log(errors);
		const firstTypeError = Object.keys(errors)[0];
		setFocus(firstTypeError);
	};

	return (
		<View>
			<FormProvider {...methods}>
				<View>
					{inputComponentsObj.map((v) => (
						<Input
							key={v.label}
							label={v.label}
							secure={v.secure}
							name={v.name}
							keyboardType={v.keyboardType}
							rules={
								v.label === 'Confirm Password'
									? {
											...v.rules,
											validate: checkPasswordValidation,
									  }
									: v.rules
							}
						/>
					))}
					<View style={styles.buttons}>
						<Button
							onPress={handleSubmit(submitHandler, errorHandler)}
						>
							회원가입
						</Button>
					</View>
				</View>
			</FormProvider>
		</View>
	);
};

const styles = StyleSheet.create({
	buttons: { marginTop: 12 },
});

export default AuthFormFormSignUp;
