import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferRequestComponent } from './components/transfer-request/transfer-request.component';
import { RouterModule, Routes } from '@angular/router';
import { WithdrawRequestComponent } from './components/withdraw-request/withdraw-request.component';
import { AdminGuard } from '../core/security-services/admin.guard';
import { MerchantGuard } from '../core/security-services/merchant.guard';
import { WithdrawHistoryComponent } from './components/withdraw-history/withdraw-history.component';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { WithdrawRequestModalService } from './services/withdraw-request-modal.service';
import { StatusCompleteModalComponent } from './components/transfer-request/status-complete-modal/status-complete-modal.component';
import { MatTooltipModule } from '@angular/material';


const routes:Routes=[
  {
    path:'transfer-request',
    component:TransferRequestComponent,
    canActivate:[AdminGuard]
  },
  {
    path:'withdraw-history',
    component:WithdrawHistoryComponent,
    canActivate:[MerchantGuard]

  },
  
]

@NgModule({
  declarations: [TransferRequestComponent, WithdrawRequestComponent, WithdrawHistoryComponent, StatusCompleteModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatTooltipModule
  ],
  exports:[WithdrawRequestComponent],
  providers:[WithdrawRequestModalService],
  entryComponents:[WithdrawRequestComponent, StatusCompleteModalComponent]
})
export class WithdrawalModule { }
