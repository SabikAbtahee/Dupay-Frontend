import { Roles, Merchant_Status, Merchant_Types } from '../enums/dupay.enum';

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



