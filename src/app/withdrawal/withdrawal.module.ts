import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferRequestComponent } from './components/transfer-request/transfer-request.component';
import { RouterModule, Routes } from '@angular/router';


const routes:Routes=[
  {
    path:'transer-request',
    component:TransferRequestComponent
  },
  
]

@NgModule({
  declarations: [TransferRequestComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class WithdrawalModule { }
