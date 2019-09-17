import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './components/signin/signin.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AccountRecoveryComponent } from './components/account-recovery/account-recovery.component';
import { MerchantSignupComponent } from './components/merchant-signup/merchant-signup.component';

const routes:Routes=[
  {
    path:'',
    redirectTo:'sign-in'
  },

  {
		path: 'sign-in',
		component:SigninComponent
  },
  {
    path:'account-recovery',
    component:AccountRecoveryComponent
  },
  {
    path:'merchant-signup',
    component:MerchantSignupComponent
  }
]

@NgModule({
  declarations: [SigninComponent,MerchantSignupComponent, AccountRecoveryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class AuthenticationModule { }
