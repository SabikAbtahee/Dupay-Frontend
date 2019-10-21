import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantListComponent } from './components/merchant-list/merchant-list.component';
import { MerchantRequestsComponent } from './components/merchant-requests/merchant-requests.component';
import { MerchantNotificationComponent } from './components/merchant-notification/merchant-notification.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes:Routes=[
  {
    path:'merchant-list',
    component:MerchantListComponent
  },
  {
    path:'merchant-request',
    component:MerchantRequestsComponent
  },
  {
    path:'merchant-notification',
    component:MerchantNotificationComponent
  },
  {
    path:'profile',
    component:UserProfileComponent
  }
]

@NgModule({
  declarations: [MerchantListComponent, MerchantRequestsComponent, MerchantNotificationComponent, UserProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class UserModule { }
