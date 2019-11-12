import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentDefaultComponent } from './components/payment-default/payment-default.component';
import { Routes, RouterModule,Params } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { ConfigModule } from '../config/config.module';
import { PaymentNotexistComponent } from './components/payment-notexist/payment-notexist.component';
import { PaymentBkashComponent } from './components/payment-bkash/payment-bkash.component';




const routes:Routes=[
  {
		path: '',
		component:PaymentDefaultComponent
  },
  {
    path: 'payment',
    component:PaymentNotexistComponent
  },
  {
    path: 'bkash',
    component:PaymentBkashComponent
  }
]

@NgModule({
  declarations: [PaymentDefaultComponent, PaymentNotexistComponent, PaymentBkashComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CoreModule,
    ConfigModule,
    RouterModule
  ]
})
export class PaymentModule { }
