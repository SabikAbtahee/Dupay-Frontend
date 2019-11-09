import { Roles, Merchant_Status, Merchant_Types, Withdraw_status, Wallet_type } from '../enums/dupay.enum';

export interface User {
	id: string,
	username: string,
	email: string,
	password?: string,
	name: string,
	role: Roles,
	token: string
}

export interface Merchant {
	id?: string,
	username: string,
	email: string,
	password?: string,
	name: string,
	tradeInsuranceFile?: string,
	tradeInsuranceFileName?:string,
	nidFileName?:string,
	nidFile?: string,
	balance?: number,
	type?: Merchant_Types,
	code?: string,
	status: Merchant_Status,
	role?: Roles
}



export interface email {
	email: string
}

export interface emailOtp {
	email: string,
	otpCode: string
}

export interface emailPasswordConfirmPassword {
	email: string,
	newPassword: string,
	confirmPassword: string
}
export interface passwordChange {
	email: string,
	oldPassword: string,
	newPassword: string,
	confirmPassword: string
}
export interface merchantNotification{
  message: string,
	merchantIds:string[],

}

export interface DialogData {
	title?:string;
	message?:string;
	input?:string;
	buttons:string[];
}

// change the interface based on the response data 
export interface TransferRequest{
	id: string,
	transactionId?: string,
	amount: number,
	withdrawDate: any,
	status: any
}


export interface SelectOption{
	value: string;
	viewValue: string;
}

export interface WithdrawRequest{
	amount:number;
	merchantAccount: ID;
}
export interface ID{
	id:string;
}

export interface WithdrawHistory{
	id:string;
	amount:number;
	withdrawDate:any;
	walletType?:Wallet_type;
	status:Withdraw_status;

}