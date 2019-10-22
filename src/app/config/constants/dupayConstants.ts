import { HttpHeaders } from '@angular/common/http';

export const dupayConst = {
	DefaultSideBar: [
		{
			name: 'Home',
			url: 'home',
			icon: 'home'
		},
		{
			name: 'Query Transaction',
			url: 'transaction/query',
			icon: 'search'
		}
	],

	AdminSidebar: [
		{
			name: 'Home',
			url: 'home',
			icon: 'home'
		},
		{
			name: 'Profile',
			url: 'user/profile',
			icon: 'dashboard'
		},
		{
			name: 'Merchant Requests',
			url: 'user/merchant-request',
			icon: 'inbox'
		},
		{
			name: 'Merchant List',
			url: 'user/merchant-list',
			icon: 'waves'
		},
		{
			name: 'Transfer Request',
			url: 'withdrawal/transfer-request',
			icon: 'attach_money'
		},
		{
			name: 'Notify Merchant',
			url: 'user/merchant-notification',
			icon: 'notifications_active'
		},
		{
			name: 'Transaction History',
			url: 'transaction/history',
			icon: 'history'
		}
	],

	MerchantSidebar: [
		{
			name: 'Home',
			url: 'home',
			icon: 'home'
		},
		{
			name: 'Profile',
			url: 'user/profile',
			icon: 'dashboard'
		},
		{
			name: 'Merchant Notification',
			url: 'user/merchant-notification',
			icon: 'notifications_active'
		},
		// {
		// 	name: 'Configuration',
		// 	url: 'home',
		// 	icon: 'build'
		// },
		{
			name: 'Withdraw request',
			url: 'withdrawal/withdraw-request',
			icon: 'compare_arrows'
		},
		{
			name: 'Transaction History',
			url: 'transaction/history',
			icon: 'history'
		}
	],
	siteName: {
		name: 'DUPAY'
	},
	menu: {
		profile: {
			name: 'My Profile',
			url: 'user/profile'
		},
		logout: {
			name: 'Logout',
			url: 'sign-in'
		}
		
	},
	username: {
		name: 'Login',
		url: 'authentication/sign-in'
	}
	
};
// export const passwordRegex = '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$';
export const passwordRegex = '.{8,}$';


export const authentication_error_messages = {
	merchant_type: 'Please choose merchant type',
	empty_name: 'Please provide your name',
	email_error: 'Invalid email',
	email_required: 'Email is required',
	nid_error: 'Please provide your National ID number',
	weak_password: 'Password should be at least 8 characters',
	password_mismatch: 'Password does not match',
	password_required: 'Password is required',
	phone_number_error: 'Provide phone number',
	otp_error: 'Wrong OTP given',
	username_error:'Provide valid username',
	trade_insurance_error:'Provide valid trade insurance error'
};

export const snackbarMessages = {
	email_sent: 'Email sent successfully',
	login: 'Logged in successfully',
	login_failed: 'Email or password do not match',
	otp_verified: 'OTP verified',
	email_exists: 'Email already exists in our system',
	otp_failed: 'OTP verification failed',
	check_email_for_verification: 'Check email for verification',
	registration_complete:'Registration Complete',
	try_again:'Please try again',
	auth_failure:'Must login to continue',
	access_denied:'Access Denied',
	must_be_admin:'You need Admin permission',
	must_be_merchant:'You need to be merchant to access'
};

export const urlPaths = {
	Authentication: {
		Signin: {
			url: 'authentication/sign-in'
		},
		Signup: {
			url: 'authentication/merchant-signup'
		},
		AccountRecovery: {
			url: 'authentication/account-recovery'
		}
	},
	Home: {
		HomeDefault: {
			url: 'home'
		}
	}
};

export const httpHeader = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
		
	})
};
export const httpHeaderLogin = {
	headers: new HttpHeaders({
		'Content-Type': 'application/x-www-form-urlencoded',
		'Accept':'application/x-www-form-urlencoded'
		
	})
};


export const httpOptionsText:Object = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
		'Accept':'application/json'
	}),
	
	
};
export const httpOptionsJson = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};


export const localStorageKeys={
	DupaySignUp:'DupaySignUp',
	User:'User',
	Token:'Token'

}

