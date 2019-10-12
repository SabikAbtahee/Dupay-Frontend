import { Component, OnInit,ViewChild } from '@angular/core';
import { Merchant } from 'src/app/config/interfaces/dupay.interface';
import { User} from 'src/app/config/interfaces/dupay.interface';
import {Merchant_Status} from 'src/app/config/enums/dupay.enum';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-merchant-requests',
  templateUrl: './merchant-requests.component.html',
  styleUrls: ['./merchant-requests.component.scss']
})
export class MerchantRequestsComponent implements OnInit {
  
  dataSource: MatTableDataSource<Merchant>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

 
  requests: Merchant[]=[
  {
    Merchant_NID: "3452394839843948(NID)",
    Merchant_balance: 3000,
    Merchant_status: Merchant_Status.Inactive,
    Merchant_trade_inc:"Merchant_trade_inc",
    Merchant_type:"Merchant Type",
    code:"merchantcode"
  },
  {
    Merchant_NID: "3452394839843948(NID)",
    Merchant_balance: 4000,
    Merchant_status: Merchant_Status.Inactive,
    Merchant_trade_inc:"Merchant_trade_inc",
    Merchant_type:"Merchant Type",
    code:"merchantcode"
  },
  {
    Merchant_NID: "3452394839843948(NID)",
    Merchant_balance: 5000,
    Merchant_status: Merchant_Status.Inactive,
    Merchant_trade_inc:"Merchant_trade_inc",
    Merchant_type:"Merchant Type",
    code:"merchantcode"
  },
  {
    Merchant_NID: "3452394839843948(NID)",
    Merchant_balance: 6000,
    Merchant_status: Merchant_Status.Inactive,
    Merchant_trade_inc:"Merchant_trade_inc",
    Merchant_type:"Merchant Type",
    code:"merchantcode"
  }
    
  ]

  filteredRequests: Merchant[]
  private _searchTerm:string;
  get searchTerm(): string{
    return this._searchTerm;
  }

  // set searchTerm(value:string){
  //   this._searchTerm=value;
  //   this.filteredRequests=this.filterRequests(value);
  // }

  
  constructor() { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    
  }

}
