import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentDefaultComponent } from './components/payment-default/payment-default.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { ConfigModule } from '../config/config.module';



const routes:Routes=[
  {
		path: '',
		component:PaymentDefaultComponent
	}
]

@NgModule({
  declarations: [PaymentDefaultComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CoreModule,
    ConfigModule
  ]
})
export class PaymentModule { }
