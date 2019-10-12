import { Roles, Merchant_Status } from '../enums/dupay.enum';

export interface User {
	Email: string;
	Password: string;
	Username: string;
	Name: string;
	Usertype: Roles;
	Merchant_id?: string;
	Merchant?: Merchant;
}

export interface Merchant {
	Merchant_NID: string;
	Merchant_balance: number;
	Merchant_type: string;
	Merchant_status: Merchant_Status;
	Merchant_trade_inc: string;
	code: string;
}

export interface Payment{
	Pay_Id:string,
	Pay_Date:Date,
	Pay_Amount:number,
	Pay_Account:string,
	Pay_Conf:string,
	Pay_Wallet:string
}

export interface Withdraw{
	With_ID:string,
	With_Date:Date,
	With_Amount:number,
	With_Status:string, //enum hobe
	With_Wallet_Type:string,
	With_Branch:string,
	With_Account_number:string,
}

export interface Notification{
	Ntf_ID:string,
	Ntf_Status:string, //enum hobe
	Ntf_Date:string,
	Ntf_Message:string
}

export interface authenticationEmailOtp{
	key:string,
	email?:string,
	isEmailDone?:boolean,
	isOtpDone?:boolean
}



export interface snackbar {
	duration?: number;
	data: snackbarData;
	horizontalPosition?: MatSnackBarHorizontalPosition;
	verticalPosition?: MatSnackBarVerticalPosition;
	panelClass?: string[];
}
export interface snackbarData{
	message:string,
	isAccepted?:any
}
export declare type MatSnackBarHorizontalPosition = 'start' | 'center' | 'end' | 'left' | 'right';
export declare type MatSnackBarVerticalPosition = 'top' | 'bottom';
export declare type acceptance = 'default' | true | false;