export const AuthRules = {
	email: {
		required: {
			value: true,
			message: '이메일을 입력해 주세요!',
		},
		pattern: {
			value: /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]|.[a-zA-Z].[a-zA-Z]$/i,
			message: '이메일 형식이 올바르지 않습니다',
		},
	},
	password: {
		required: { value: true, message: '비밀번호를 입력해 주세요!' },
		minLength: { value: 5, message: '비밀번호는 최소 5자 이내여야함' },
		maxLength: { value: 12, message: '비밀번호는 최대 15자 이하여야함' },
		/* pattern: {
			value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{5,15}$/,
			message:
				'최소 하나의 문자 하나의 숫자 하나의 특수문자를 포함해야 합니다',
		}, */
	},
	checkPassword: {
		required: { value: true, message: '비밀번호를 재입력해 주세요!' },
		minLength: { value: 5, message: '비밀번호는 최소 5자 이내여야함' },
		maxLength: { value: 12, message: '비밀번호는 최대 15자 이하여야함' },
		pattern: {
			value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{5,15}$/,
			message:
				'최소 하나의 문자 하나의 숫자 하나의 특수문자를 포함해야 합니다',
		},
	},
};

export const customErrorMessage = {
	password: { message: '비밀번호가 틀렸습니다' },
	email: { message: '존재하지 않는 계정 입니다.' },
};
