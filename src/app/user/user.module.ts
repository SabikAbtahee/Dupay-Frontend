import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantListComponent } from './components/merchant-list/merchant-list.component';
import { MerchantRequestsComponent } from './components/merchant-requests/merchant-requests.component';
import { MerchantNotificationComponent } from './components/merchant-notification/merchant-notification.component';
import { Routes, RouterModule } from '@angular/router';

const routes:Routes=[
  {
    path:'',
    redirectTo:'/home'
  },
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
  }
]

@NgModule({
  declarations: [MerchantListComponent, MerchantRequestsComponent, MerchantNotificationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }
