import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ViewChild, Component, OnInit, AfterViewInit } from '@angular/core';
import { ExportService } from '../../services/export.service';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../../config/interfaces/dupay.interface';
import { expand, tap } from 'rxjs/operators';

@Component({
	// tslint:disable-next-line: component-selector
	selector: 'history-transaction',
	templateUrl: './history-transaction.component.html',
	styleUrls: [ './history-transaction.component.scss' ]
})
export class HistoryTransactionComponent implements OnInit {
	panelOpenState = false;
	responseData = [];
	constructor(private exportService: ExportService, private transactionService: TransactionService) {}

	listData = new MatTableDataSource<Transaction>();
	displayedColumns: string[] = [ 'SI No', 'transactionId', 'time', 'amount' ];
	showChart = false;
	@ViewChild(MatSort, { static: true })
	sort: MatSort;
	@ViewChild(MatPaginator, { static: true })
	paginator: MatPaginator;
	totalDataSize;
	searchKey: string;

	ngOnInit() {
		this.setDataSource('0');
		// this.paginator.pageIndex=0;
		// this.paginator.pageSize=10;
		// this.setDataSourceWithPaginator();
	}
	// ngAfterViewInit() {
	// 	this.paginator.page.pipe(tap(() => this.setDataSourceWithPaginator())).subscribe();
	// }

	

	setDataSource(num) {
		// this.responseData = [];
		let merchantId = '';
		if (this.transactionService.getLoggedInUserRole() != 'ADMIN') {
			merchantId = this.transactionService.getCurrentUserID();
		}

		// let merchantId = '';

		this.transactionService.getAllTransactionsUntilEnd(merchantId, num).subscribe((list) => {
			// var result = list.content.filter(obj => {
			//   return obj.merchantId === merchantId
			// })

			for (let i of list.content) {
				this.responseData.push({
					transactionId: i.transactionId,
					time: i.payDate,
					amount: i.payAmount
				});
			}

			// this.listData = new MatTableDataSource(list.content);
			//  console.log('IBRAHIM' , this.listData);
			this.listData.data = this.responseData;
			this.listData.sort = this.sort;
			this.listData.paginator = this.paginator;
			if (list.hasNext == true) {
				this.setDataSource(String(Number(num) + 1));
			}
		});
	}

	setDataSourceWithPaginator() {
		let merchantId = '';
		if (this.transactionService.getLoggedInUserRole() != 'ADMIN') {
			merchantId = this.transactionService.getCurrentUserID();
		}
		let size= this.paginator.pageSize;
		let index=this.paginator.pageIndex;
		this.transactionService.getTransactionGivenMerchantIdPageSizePageIndex(merchantId,size,index).subscribe(list=>{
			// console.log(list.total);
			// this.totalDataSize=list.total;
			for (let i of list.content) {
				this.responseData.push({
					transactionId: i.transactionId,
					time: i.payDate,
					amount: i.payAmount
				});
			}

			// this.listData = new MatTableDataSource(list.content);
			//  console.log('IBRAHIM' , this.listData);
			this.listData.data = this.responseData;
			this.listData.sort = this.sort;
			this.listData.paginator = this.paginator;
			this.listData.paginator.length=list.total;
		});
	}

	applyFilter(filterValue: string) {
		this.listData.filter = filterValue.trim().toLowerCase();
	}

	toggleChart() {
		this.showChart = !this.showChart;
	}

	export() {
		this.exportService.exportExcel(this.listData.data, 'Transaction historys');
	}

	public redirectToDetails = (id: string) => {};

	public redirectToUpdate = (id: string) => {};

	public redirectToDelete = (id: string) => {};
}
