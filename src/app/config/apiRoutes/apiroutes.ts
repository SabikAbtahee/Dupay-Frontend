import { environment } from '../../../environments/environment';


export const api_path = {
    baseURL: environment.baseurl,
	baseURLAdmin: environment.baseurlAdmin,
    baseURLMerchant: environment.baseurlMerchant,
    // CheckStatus
    checkStatus: `${environment.baseurl}status`,
    
    // Merchant signup
    signUpOTPEmail:`${environment.baseurl}/api/user/email/otp`,
    signUpOTPVerification:`${environment.baseurl}/api/user/email/otp/verify`,
    registerMerchantAccount:`${environment.baseurl}/api/user`


    
    
}