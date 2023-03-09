/* eslint-disable */
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
	action,
	computed,
	flow,
	makeObservable,
	observable,
	runInAction,
} from 'mobx';

class AuthContextClass {
	idToken = null;
	email = '';
	refreshToken = null;
	expiresIn = 3600;
	localId = '';
	registered = false;

	constructor() {
		makeObservable(this, {
			idToken: observable,
			email: observable,
			refreshToken: observable,
			expiresIn: observable,
			localId: observable,
			registered: observable,
			setAuthData: action.bound,
			logout: action.bound,
			setIdToken: action.bound,
		});
	}

	async setAuthData(authRespData) {
		const { idToken, email, refreshToken, expiresIn, localId, registered } =
			authRespData;
		this.email = email;
		this.refreshToken = refreshToken;
		this.expiresIn = expiresIn;
		this.localId = localId;
		this.registered = registered;

		const idTokenInAsyncStorage = await AsyncStorage.getItem('idToken');
		runInAction(() => {
			console.log('run in action');
			console.log(idTokenInAsyncStorage);
			if (
				idTokenInAsyncStorage == undefined ||
				idTokenInAsyncStorage == null
			) {
				this.idToken = idToken;
				AsyncStorage.setItem('idToken', idToken);
			} else {
				if (this.idToken == null || this.idToken == undefined) {
					this.idToken = idTokenInAsyncStorage;
				}
			}
		});
	}

	async getIdTokenFromAsyncStorage() {
		const idToken = await AsyncStorage.getItem('idToken');
		return idToken;
	}

	setIdToken(idToken) {
		this.idToken = idToken;
	}

	logout() {
		this.idToken = null;
		this.email = '';
		this.refreshToken = null;
		this.expiresIn = 3600;
		this.localId = '';
		this.registered = false;
		AsyncStorage.removeItem('idToken');
	}
}

const AuthMobXContext = new AuthContextClass();

export default AuthMobXContext;
