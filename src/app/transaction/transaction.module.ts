import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchTransactionComponent } from './components/search-transaction/search-transaction.component';
import { Routes, RouterModule } from '@angular/router';

const routes:Routes=[
  {
    path:'',
    redirectTo:'query'
  },
  {
    path:'query',
    component:SearchTransactionComponent
  }
 
]

@NgModule({
  declarations: [SearchTransactionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TransactionModule { }
