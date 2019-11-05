import {HttpHeaders} from '@angular/common/http';
import {Token_Role} from '../enums/dupay.enum';

export const dupayConst = {
  DefaultSideBar: [
    {
      name: 'Home',
      url: 'home',
      icon: 'home'
    },
    {
      name: 'Query Transaction',
      url: 'transaction/query',
      icon: 'search'
    }
  ],

  AdminSidebar: [
    {
      name: 'Home',
      url: 'home',
      icon: 'home'
    },
    {
      name: 'Profile',
      url: 'user/profile',
      icon: 'dashboard'
    },
    {
      name: 'Merchant Requests',
      url: 'user/merchant-request',
      icon: 'inbox'
    },
    {
      name: 'Merchant List',
      url: 'user/merchant-list',
      icon: 'waves'
    },
    {
      name: 'Transfer Request',
      url: 'withdrawal/transfer-request',
      icon: 'attach_money'
    },
    {
      name: 'Notify Merchant',
      url: 'user/merchant-notification',
      icon: 'notifications_active'
    },
    {
      name: 'Transaction History',
      url: 'transaction/history',
      icon: 'history'
    }
  ],

  MerchantSidebar: [
    {
      name: 'Home',
      url: 'home',
      icon: 'home'
    },
    {
      name: 'Profile',
      url: 'user/profile',
      icon: 'dashboard'
    },
    {
      name: 'Merchant Notification',
      url: 'user/merchant-notification',
      icon: 'notifications_active'
    },
    // {
    // 	name: 'Configuration',
    // 	url: 'home',
    // 	icon: 'build'
    // },
    {
      name: 'Withdraw request',
      url: 'withdrawal/withdraw-request',
      icon: 'compare_arrows'
    },
    {
      name: 'Transaction History',
      url: 'transaction/history',
      icon: 'history'
    }
  ],
  sideBar: [
    {
      name: 'Home',
      url: 'home',
      icon: 'home',
      role: [Token_Role.ANNONYMOUS, Token_Role.ROLE_ADMIN, Token_Role.ROLE_MERCHANT],
      mini_name: 'Home'
    },

    {
      name: 'Profile',
      url: 'user/profile',
      icon: 'dashboard',
      role: [Token_Role.ROLE_ADMIN, Token_Role.ROLE_MERCHANT],
      mini_name: 'Profile'


    },
    {
      name: 'Merchant Requests',
      url: 'user/merchant-request',
      icon: 'inbox',
      role: [Token_Role.ROLE_ADMIN],
      mini_name: 'Requests'

    },
    {
      name: 'Merchant List',
      url: 'user/merchant-list',
      icon: 'waves',
      role: [Token_Role.ROLE_ADMIN],
      mini_name: 'List'

    },
    {
      name: 'Transfer Request',
      url: 'withdrawal/transfer-request',
      icon: 'attach_money',
      role: [Token_Role.ROLE_ADMIN],
      mini_name: 'Transfer'

    },
    {
      name: 'Merchant Notification',
      url: 'user/merchant-notification',
      icon: 'notifications_active',
      role: [Token_Role.ROLE_MERCHANT],
      mini_name: 'Notification'

    },
    {
      name: 'Notify Merchant',
      url: 'user/notify-merchant',
      icon: 'notifications_active',
      role: [Token_Role.ROLE_ADMIN],
      mini_name: 'Notify'

    },
    {
      name: 'Withdraw Money',
      url: 'withdrawal/withdraw-history',
      icon: 'compare_arrows',
      role: [Token_Role.ROLE_MERCHANT],
      mini_name: 'Withdraw'

    },
    {
      name: 'Transaction History',
      url: 'transaction/history',
      icon: 'history',
      role: [Token_Role.ROLE_MERCHANT, Token_Role.ROLE_ADMIN],
      mini_name: 'Transaction'

    },
    {
      name: 'Query Transaction',
      url: 'transaction/query',
      icon: 'search',
      role: [Token_Role.ANNONYMOUS],
      mini_name: 'Query'

    },
  ],
  siteName: {
    name: 'DUPAY'
  },
  menu: {
    profile: {
      name: 'My Profile',
      url: 'user/profile'
    },
    logout: {
      name: 'Logout',
      url: 'sign-in'
    }

  },
  username: {
    name: 'Login',
    url: 'authentication/sign-in'
  }

};
// export const passwordRegex = '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$';
export const passwordRegex = '.{8,}$';


export const authentication_error_messages = {
  merchant_type: 'Please choose merchant type',
  empty_name: 'Please provide your name',
  email_error: 'Invalid email',
  email_required: 'Email is required',
  nid_error: 'Please provide your National ID number',
  weak_password: 'Password should be at least 8 characters',
  password_mismatch: 'Password does not match',
  password_required: 'Password is required',
  phone_number_error: 'Provide phone number',
  otp_error: 'Wrong OTP given',
  username_error: 'Provide valid username',
  trade_insurance_error: 'Provide valid trade insurance error',
  required_field: 'Required field',
  minimum_5: 'Minimum 5 length is required',
  maximum_20: 'Maximum length is 20'
};

export const snackbarMessages = {
  email_sent: 'Email sent successfully',
  login: 'Logged in successfully',
  login_failed: 'Email or password do not match',
  otp_verified: 'OTP verified',
  email_exists: 'Email already exists in our system',
  otp_failed: 'OTP verification failed',
  check_email_for_verification: 'Check email for verification',
  registration_complete: 'Registration Complete',
  try_again: 'Please try again',
  auth_failure: 'Must login to continue',
  access_denied: 'Access Denied',
  must_be_admin: 'You need Admin permission',
  must_be_merchant: 'You need to be merchant to access',
  reset_password_complete: 'Password reset successful',
  change_password_success: 'Password has been changed successfully',
  change_password_fail: 'Password change has been failed',
  selected_merchant_notification_sent_success: 'Notification has been sent',
  selected_merchant_notification_sent_fail: 'Notification sent has been failed',
  withdraw_success:'Request sent successfully'
};

export const withdrawErrorMessages={
  required_amount:'Please enter a valid amount',
  insufficient_amount:'You do not have enough balance',
  select_account:'Select one of your account',
  greater_than_20000:'Have to be less than 20000 BDT',
  less_than_0:'Cannot enter negative value',
  select_wallet:'Select a wallet',
  password_required:'Enter password'


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
  Home: {
    HomeDefault: {
      url: 'home'
    }
  },
  User: {
    profile: {
      url: 'user/profile'
    },
    notify_selected_merchant: {
      url:'user/notify-merchant'
    }
  }
};

export const httpHeader = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'

  })
};
export const httpHeaderLogin = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/x-www-form-urlencoded'

  })
};


export const httpOptionsText: Object = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }),


};
export const httpOptionsJson = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


export const localStorageKeys = {
  DupaySignUp: 'DupaySignUp',
  User: 'User',
  Token: 'Token',
  DupayAccountRecovery: 'DupayAccountRecovery'

}

