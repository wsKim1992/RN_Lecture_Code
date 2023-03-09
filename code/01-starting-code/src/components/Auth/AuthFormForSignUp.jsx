import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import ToastManager, { Toast } from 'toastify-react-native';

import SignUpMutation from '@query/signup';

import { errorType } from '@constants/errorType';
import { AuthRules, customErrorMessage } from '@constants/rules';

import Button from '@components/ui/Button';
import LoadingOverlay from '@components/ui/LoadingOverlay';

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
	const { mutateAsync, status } = SignUpMutation();
	const { handleSubmit, watch, resetField, setError, setFocus } = methods;
	const submitHandler = async (data) => {
		try {
			const resp = await mutateAsync(data);
			console.log(resp);
			Toast.success('회원가입 성공!');
		} catch (err) {
			let errorMessage;
			if (err !== errorType.INVALID_REQUEST) {
				resetField(err);
				setError(
					err,
					{
						type: 'custom',
						message: customErrorMessage.emailAlreadyExists.message,
					},
					{
						setFocus: true,
					}
				);
				errorMessage = customErrorMessage.emailAlreadyExists.message;
			} else {
				errorMessage = errorType[err];
			}
			Toast.error(errorMessage);
		}
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

	if (status === 'loading') {
		return <LoadingOverlay />;
	}

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
			<ToastManager
				width={280}
				height={55}
				position="bottom-center"
				duration={1000}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	buttons: { marginTop: 12 },
});

export default AuthFormFormSignUp;
