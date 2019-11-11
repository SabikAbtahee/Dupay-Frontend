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
  displayedColumns: string[] = ['id', 'time', 'amount', 'actions'];
  @ViewChild(MatSort, {static: false}  ) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  searchKey: string;


  ngOnInit() {
    this.transactionService.getAllTransactionsByUserId().subscribe(
      list => {
        // console.log('This should be worked: ', list);      
        //  const array = list.map(item => {
        //   return {
        //     $key: item.payload.doc.id,
        //     ...item.payload.doc.data()
        //   };
        // });
        //  this.listData = new MatTableDataSource(array);
        //  console.log(array);
        //  this.listData.sort = this.sort;
        //  this.listData.paginator = this.paginator;

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
