import {environment} from '../../../environments/environment';


export const api_path = {
  baseURL: environment.baseurl,
  baseURLAdmin: environment.baseurlAdmin,
  baseURLMerchant: environment.baseurlMerchant,


  // CheckStatus
  checkStatus: `${environment.baseurl}status`,

  // Merchant signup
  signUpOTPEmail: `${environment.baseurl}/api/user/register/email/otp`,
  signUpOTPVerification: `${environment.baseurl}/api/user/register/otp/verify`,
  registerMerchantAccount: `${environment.baseurl}/api/user`,

  //Login
  loginWithUsernamePassword: `${environment.baseurl}/api/login`,

  //Merchant account recovery
  forgotPasswordOTPEmail: `${environment.baseurl}/api/user/reset/password/email/otp`,
  forgotPasswordOTPVerification: `${environment.baseurl}/api/user/reset/password/otp/verify`,
  resetPassword: `${environment.baseurl}/api/user/reset/password`,

  // profile
  changePassword : `${environment.baseurl}/api/user/change/password`,
  merchantList:`${environment.baseurl}/api/admin/merchant`,
  approveMerchant:`${environment.baseurl}/api/admin/approve/merchant`,


  // transfer-request
  transferRequestList : `${environment.baseurl}/api/admin/withdraw`,
  transferRequestStatusChange: `${environment.baseurl}/api/admin/withdraw/changestatus`
}
