import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ViewChild, Component, OnInit } from '@angular/core';
import { ExportService } from '../../services/export.service';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from 'src/app/config/interfaces/dupay.interface';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'history-transaction',
  templateUrl: './history-transaction.component.html',
  styleUrls: ['./history-transaction.component.scss']
})
export class HistoryTransactionComponent implements OnInit {


  constructor(private exportService: ExportService, private transactionService: TransactionService) { }

  listData = new MatTableDataSource<Transaction>();
  displayedColumns: string[] = ['SI No','transactionId', 'time', 'amount'];

  @ViewChild(MatSort, {static: true}  ) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  searchKey: string;


  ngOnInit() {
    this.setDataSource();
  }

  setDataSource(){
    let responseData = [];
    this.transactionService.getAllTransactionsByUserId().subscribe(list => {
      for(let i of list.content) {
        responseData.push({
          transactionId: i.transactionId,
          time: i.payDate,
          amount: i.payAmount,
        });
      }
      // this.listData = new MatTableDataSource(list.content);
     //  console.log('IBRAHIM' , this.listData);
      this.listData.data = responseData;
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.listData.filter = filterValue.trim().toLowerCase();
  }













  export() {
    this.exportService.exportExcel(this.listData.data, 'Transaction historys');
  }

  public redirectToDetails = (id: string) => {

  }

  public redirectToUpdate = (id: string) => {

  }

  public redirectToDelete = (id: string) => {

  }

}
