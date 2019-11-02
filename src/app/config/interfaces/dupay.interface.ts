import { Roles, Merchant_Status, Merchant_Types } from '../enums/dupay.enum';

export interface User{
	id: string,
    username: string,
    email: string,
    password?: string,
    name: string,
    role: Roles,
    token: string
}

export interface Merchant {
	id?:string,
	username:string,
	email:string,
	password?:string,
	name?:string,
	tradeInsurance?:string,
	NID?:string,
	balance?:number,
	type?:Merchant_Types,
	code?:string,
	pending?:boolean,
	approved?:boolean




}



export interface email{
	email:string
}

export interface emailOtp{
	email:string,
	otpCode:string
}

export interface emailPasswordConfirmPassword{
	email:string,
	newPassword:string,
	confirmPassword:string
}
export interface passwordChange{
	email:string,
	oldPassword:string,
	newPassword:string,
	confirmPassword:string
}
export interface merchantNotification{
  "message": string,
	merchant_id:string[],

}



