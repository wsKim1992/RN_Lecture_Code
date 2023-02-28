import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import LogIn from '@query/logIn';

import { errorType } from '@constants/errorType';
import { AuthRules, customErrorMessage } from '@constants/rules';
import { authFormName } from '@constants/variables';

import Button from '@components/ui/Button';
import LoadingOverlay from '@components/ui/LoadingOverlay';

import Input from './Input';

const AuthForm = () => {
	const methods = useForm({ defaultValues: { email: '', password: '' } });
	const { handleSubmit, setFocus, resetField, setError } = methods;
	const { mutateAsync, status } = LogIn();
	async function submitHandler(data) {
		try {
			await mutateAsync(data);
		} catch (error) {
			if (error !== errorType.INVALID_REQUEST) {
				resetField(error);
				setError(
					error,
					{
						type: 'custom',
						message: customErrorMessage[error].message,
					},
					{ shouldFocus: true }
				);
			} else {
				resetField(authFormName.email);
				setError(
					authFormName.email,
					{
						type: 'custom',
						message: customErrorMessage.email.message,
					},
					{ shouldFocus: true }
				);
			}
			console.error(error);
		}
	}

	const errorHandler = (errors) => {
		const firstNameToFocus = Object.keys(errors);
		setFocus(firstNameToFocus[firstNameToFocus.length - 1]);
	};

	if (status === 'loading') return <LoadingOverlay />;

	return (
		<View style={styles.form}>
			<FormProvider {...methods}>
				<View>
					<Input
						label="Email Address"
						keyboardType="email-address"
						name="email"
						rules={AuthRules.email}
					/>
					<Input
						label="Password"
						secure
						name="password"
						rules={AuthRules.password}
					/>
					<View style={styles.buttons}>
						<Button
							onPress={handleSubmit(submitHandler, errorHandler)}
						>
							Log In
						</Button>
					</View>
				</View>
			</FormProvider>
		</View>
	);
};

export default AuthForm;

const styles = StyleSheet.create({
	buttons: {
		marginTop: 12,
	},
});
