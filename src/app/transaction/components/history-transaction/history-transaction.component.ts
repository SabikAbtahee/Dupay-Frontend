import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ViewChild, Component, OnInit } from '@angular/core';
import { ExportService } from '../../services/export.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'history-transaction',
  templateUrl: './history-transaction.component.html',
  styleUrls: ['./history-transaction.component.scss']
})
export class HistoryTransactionComponent implements OnInit {


  constructor(private exportService: ExportService,
              private transactionService: TransactionService) { }
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['SI No','id', 'time', 'amount'];
  @ViewChild(MatSort, {static: false}  ) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  searchKey: string;


  ngOnInit() {
    this.transactionService.getAllTransactionsByUserId().subscribe(list => {
         this.listData = new MatTableDataSource(list.content);
        //  console.log('IBRAHIM' , this.listData);
         this.listData.sort = this.sort;
         this.listData.paginator = this.paginator;
    });

  }
  applyFilter(filterValue: string) {
    this.listData.filter = filterValue.trim().toLowerCase();
  }













  export() {
    this.exportService.exportExcel(this.listData.data, 'transaction historys');
  }

  public redirectToDetails = (id: string) => {

  }

  public redirectToUpdate = (id: string) => {

  }

  public redirectToDelete = (id: string) => {

  }

}
