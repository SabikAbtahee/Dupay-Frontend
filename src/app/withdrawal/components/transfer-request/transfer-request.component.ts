import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { TransferRequest, TransferStatus } from 'src/app/config/interfaces/dupay.interface';
import { TransferState } from '@angular/platform-browser';

@Component({
  selector: 'app-transfer-request',
  templateUrl: './transfer-request.component.html',
  styleUrls: ['./transfer-request.component.scss']
})
export class TransferRequestComponent implements OnInit {

  dummyData: TransferRequest[];
  displayedColumns: string[];
  statusList: TransferStatus[];
  transferRequests = new MatTableDataSource<TransferRequest>();

  constructor() { }

  ngOnInit() {
    this.initialize();
    this.getTransferRequestList();
  }

  initialize(){
    this.displayedColumns = ["id", "time", "amount", "status" ];
    this.statusList = [
      {value: 'PENDING',viewValue:'Pending' },
      {value: 'IN_PROGRESS',viewValue:'In Progress' },
      {value: 'DONE',viewValue:'Complete' },
    ];
    this.dummyData =  [
      {id: '1', transactionId: '2',  amount: 120.50, withdrawDate: 1.10, status: 'PENDING'},
      {id: '2', transactionId: '2',  amount: 50.50,  withdrawDate: 0.10, status: 'IN_PROGRESS'},
      {id: '3', transactionId: '2',  amount: 110.50, withdrawDate: 1.10, status: 'PENDING'},
      {id: '4', transactionId: '2',  amount: 20.54,  withdrawDate: 18.10,status: 'DONE'},
      {id: '5', transactionId: '2',  amount: 12.50,  withdrawDate: 15.10,status: 'IN_PROGRESS'}
    ];
  }

  getTransferRequestList(){

    // using service get data and link with datasource

    this.transferRequests.data = this.dummyData as TransferRequest[];
  }

  onStatusChange(element: TransferRequest){

    if(element.status == "DONE"){
      console.log(element);
    }
    else{
      // update in database
    }

  }

}
