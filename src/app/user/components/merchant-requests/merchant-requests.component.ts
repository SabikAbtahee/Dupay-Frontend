import { Component, OnInit,ViewChild } from '@angular/core';
import { Merchant } from 'src/app/config/interfaces/dupay.interface';
import { User} from 'src/app/config/interfaces/dupay.interface';
import {Merchant_Status} from 'src/app/config/enums/dupay.enum';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-merchant-requests',
  templateUrl: './merchant-requests.component.html',
  styleUrls: ['./merchant-requests.component.scss']
})
export class MerchantRequestsComponent implements OnInit {
  
  dataSource: MatTableDataSource<Merchant>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  merchants = new MatTableDataSource<Merchant>();
  public displayedColumns = ['SI No.','username','name','type', 'tradeInsurance', 'NID', 'details', 'approve', 'reject'];

 
  requests: Merchant[]=[]

  filteredRequests: Merchant[]
  private _searchTerm:string;


  get searchTerm(): string{
    return this._searchTerm;
  }

  // set searchTerm(value:string){
  //   this._searchTerm=value;
  //   this.filteredRequests=this.filterRequests(value);
  // }

  
  constructor(private userService:UserService) { }

  ngOnInit() {
    console.log('ng on init called');
    this.getMerchantList();
    
  }


  getMerchantList(){
    this.userService.getPendingMerchantList().subscribe(res=>{
      this.merchants.data = res as Merchant[];
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public redirectToDetails = (id: string) => {

  }

  public redirectToUpdate = (id: string) => {

  }

  public redirectToDelete = (id: string) => {

  }




}
