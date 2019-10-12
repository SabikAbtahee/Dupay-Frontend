import { Roles, Merchant_Status } from '../enums/dupay.enum';

export interface otpVerification{
    email:string,
    otpCode:string
}