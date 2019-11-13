import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchTransactionComponent } from './components/search-transaction/search-transaction.component';
import { Routes, RouterModule } from '@angular/router';
import { HistoryTransactionComponent } from './components/history-transaction/history-transaction.component';
import { AuthGuard } from '../core/security-services/auth.guard';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatListModule, MatTableModule, MatSortModule, MatPaginatorModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { ChartsComponent } from './components/charts/charts.component';
import { ChartsModule } from 'ng2-charts';
import { MerchantGuard } from '../core/security-services/merchant.guard';

const routes:Routes=[
  
  {
    path:'',
    redirectTo:'query'
  },
  {
    path:'query',
    component:SearchTransactionComponent,
    canActivate: [MerchantGuard]
  },
  {
    path:'history',
    component:HistoryTransactionComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'chart',
    component:ChartsComponent,
    canActivate: [AuthGuard]

  }
 
]

@NgModule({
  declarations: [SearchTransactionComponent, HistoryTransactionComponent, ChartsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    RouterModule.forChild(routes),
    SharedModule,
    ChartsModule
  ]
})
export class TransactionModule { }
