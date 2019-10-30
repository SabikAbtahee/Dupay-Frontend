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
      {value: 'Accept',viewValue:'Accept' },
      {value: 'Pending',viewValue:'Pending' },
      {value: 'Complete',viewValue:'Complete' },
    ];
    this.dummyData =  [
      {id: '1', time: 1.10, amount: 120.50, status: 'Accept'},
      {id: '2', time: 0.10, amount: 50.50, status: 'Complete'},
      {id: '3', time: 1.10, amount: 110.50, status: 'Accept'},
      {id: '4', time: 18.10, amount: 20.54, status: 'Complete'},
      {id: '5', time: 15.10, amount: 12.50, status: 'Pending'}
    ];
  }

  getTransferRequestList(){

    // using service get data and link with datasource

    this.transferRequests.data = this.dummyData as TransferRequest[];
  }

  onStatusChange(element){
    console.log(element);
  }

}
