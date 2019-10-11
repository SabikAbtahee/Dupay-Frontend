import { HttpHeaders } from '@angular/common/http';

export const dupayConst = {
	DefaultSideBar: [
		{
			name: 'Home',
			url: 'home',
			icon: 'account_balance'
		},
		{
			name: 'Query Transaction',
			url: 'transaction/query',
			icon: 'account_balance'
		}
	],

	AdminSidebar: [
		{
			name: 'Dashboard',
			url: 'home',
			icon: 'dashboard'
		},
		{
			name: 'Merchant',
			url: 'home',
			icon: 'account_balance'
		},
		{
			name: 'Configuration',
			url: 'home',
			icon: 'build'
		}
	],

	MerchantSidebar: [
		{
			name: 'Dashboard',
			url: 'home',
			icon: 'dashboard'
		},
		{
			name: 'Configuration',
			url: 'home',
			icon: 'build'
		},
		{
			name: 'Transfer request',
			url: 'home',
			icon: 'compare_arrows'
		}
	],
	siteName: {
		name: 'DUPAY'
	},
	username: {
		name: 'Login',
		url: 'authentication/sign-in'
	},
	
};
export const passwordRegex = '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$';

export const authentication_error_messages={
	merchant_type:'Please choose merchant type',
	empty_name:'Please provide your name',
	email_error:'Invalid email',
	email_required:'Email is required',
	nid_error:'Please provide your National ID number',
	weak_password:'Make within 8 characters',
	password_mismatch:'Password does not match',
	password_required:'Password is required',
	phone_number_error:'Provide phone number',
	otp_error:'Wrong OTP given'
};

export const snackbarMessages={
	email_sent:'Email sent successfully',
	login:'Log in successfully',
	login_failed:'Email or password do not match',
	otp_verified:'OTP verified',
	email_exists:'Email already exists in our system',
	otp_failed:'OTP verification failed',
	check_email_for_verification:'Check email for verification'
}

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
	Home:{
		HomeDefault:{
			url:'home'
		}
	}
	
};

export const httpHeader = {
	headers: new HttpHeaders({
		'Content-Type':'application/json'
	})
};

export const httpOptions = {
	headers: new HttpHeaders({
	  'Content-Type':  'application/json',
	  'Authorization': 'my-auth-token'
	})
  };
