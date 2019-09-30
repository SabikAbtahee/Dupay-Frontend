import { environment } from '../../../environments/environment';

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
			icon: 'account_balance'
		},
		{
			name: 'Merchant',
			url: 'home',
			icon: 'account_balance'
		},
		{
			name: 'Configuration',
			url: 'home',
			icon: 'account_balance'
		}
	],

	MerchantSidebar: [
		{
			name: 'Dashboard',
			url: 'home',
			icon: 'account_balance'
		},
		{
			name: 'Configuration',
			url: 'home',
			icon: 'account_balance'
		},
		{
			name: 'Transfer request',
			url: 'home',
			icon: 'account_balance'
		}
	],
	siteName: {
		name: 'DUPAY'
	},
	username: {
		name: 'Login',
		url: 'authentication/sign-in'
	},
	baseURL:environment.baseurl,
	baseURLAdmin:environment.baseurlAdmin,
	baseURLMerchant:environment.baseurlMerchant
};
