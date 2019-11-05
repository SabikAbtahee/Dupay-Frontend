import { WithdrawRequestModalService } from './../../services/withdraw-request-modal.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { WithdrawHistory } from '../../../config/interfaces/dupay.interface';
import { WithdrawalService } from '../../services/withdrawal.service';
import { first } from 'rxjs/operators';

@Component({
	selector: 'app-withdraw-history',
	templateUrl: './withdraw-history.component.html',
	styleUrls: [ './withdraw-history.component.scss' ]
})
export class WithdrawHistoryComponent implements OnInit {
	displayedColumns: string[] = [ 'id', 'withdrawDate', 'walletType', 'amount', 'status' ];
	withdraws = new MatTableDataSource<WithdrawHistory>();
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	constructor(
		private withdrawRequestModalService: WithdrawRequestModalService,
		private withdrawService: WithdrawalService
	) {}

	ngOnInit() {
		
		this.setDataSource();
	}

	openWithdrawRequestWindow() {
		this.withdrawRequestModalService.openWithdrawRequestModal();
	}
	setDataSource() {
		let data = [];
		this.withdrawService.getWithdrawRequestsByMerchant().pipe(first()).subscribe((res) => {
			for (let i of res) {
				data.push({
					id: i.id,
					withdrawDate: i.withdrawDate,
					walletType: i.merchantAccount.walletType,
					amount: i.amount,
					status: i.status
				});
			}
      this.withdraws.data = data;
      this.withdraws.sort = this.sort;
		  this.withdraws.paginator = this.paginator;
		});
	}
  applyFilter(filterValue: string) {
    this.withdraws.filter = filterValue.trim().toLowerCase();
  }
}
