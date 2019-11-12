import { WithdrawRequestModalService } from './../../services/withdraw-request-modal.service';
import { Component, OnInit, ViewChild, OnChanges, OnDestroy } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { WithdrawHistory } from '../../../config/interfaces/dupay.interface';
import { WithdrawalService } from '../../services/withdrawal.service';
import { first, takeUntil, throttleTime, takeWhile } from 'rxjs/operators';
import { Subject, pipe } from 'rxjs';
import { MatDialog } from '@angular/material';
import { WithdrawRequestComponent } from '../withdraw-request/withdraw-request.component';

@Component({
	selector: 'app-withdraw-history',
	templateUrl: './withdraw-history.component.html',
	styleUrls: [ './withdraw-history.component.scss' ]
})
export class WithdrawHistoryComponent implements OnInit,OnDestroy{
	displayedColumns: string[] = [ 'id', 'withdrawDate', 'amount', 'status' ];
	withdraws = new MatTableDataSource<WithdrawHistory>();
	_unsubscribeall:Subject<any>;
	// withdraws;
	@ViewChild(MatSort, { static: true })
	sort: MatSort;
	@ViewChild(MatPaginator, { static: true })
	paginator: MatPaginator;
	constructor(
		private withdrawRequestModalService: WithdrawRequestModalService,
		private withdrawService: WithdrawalService,
		private dialog:MatDialog
	) {
		this._unsubscribeall= new Subject();
	}

	ngOnInit() {
		this.setDataSource();
	}
	

	openWithdrawRequestWindow() {
		this.openWithdrawRequestModal();
	}

	openWithdrawRequestModal(width?: string) {
		const dialogRef = this.dialog.open(WithdrawRequestComponent, {
			minWidth: '450px',
			width: width ? width : '55vw'
			
		});

		dialogRef.afterClosed().subscribe(res=>{
			
			this.setDataSource();
		})
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
		},
		err=>{
			console.log(err);
		});
	}
	applyFilter(filterValue: string) {
		this.withdraws.filter = filterValue.trim().toLowerCase();
	}

	ngOnDestroy(){
		this._unsubscribeall.next();
		this._unsubscribeall.complete();
		this._unsubscribeall.unsubscribe();
	}


	
	

	

	
	
}
