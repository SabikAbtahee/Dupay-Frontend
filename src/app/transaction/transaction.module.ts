import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchTransactionComponent } from './components/search-transaction/search-transaction.component';
import { Routes, RouterModule } from '@angular/router';
import { HistoryTransactionComponent } from './components/history-transaction/history-transaction.component';
import { AuthGuard } from '../core/security-services/auth.guard';

const routes:Routes=[
  {
    path:'',
    redirectTo:'query'
  },
  {
    path:'query',
    component:SearchTransactionComponent
  },
  {
    path:'history',
    component:HistoryTransactionComponent,
    canActivate: [AuthGuard]

  }
 
]

@NgModule({
  declarations: [SearchTransactionComponent, HistoryTransactionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TransactionModule { }
