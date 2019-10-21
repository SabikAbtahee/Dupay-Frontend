import { Roles, Merchant_Status } from '../enums/dupay.enum';

export interface otpVerification{
    email:string,
    otpCode:string
}
export interface authenticationEmailOtp{
	key:string,
	email?:string,
	isEmailDone?:boolean,
	isOtpDone?:boolean
}



export interface loginCredentials{
	email:string,
	password:string
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



