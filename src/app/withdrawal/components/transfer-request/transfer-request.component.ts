import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { TransferRequest, TransferStatus } from 'src/app/config/interfaces/dupay.interface';
import { TransferState } from '@angular/platform-browser';
import { WithdrawalService } from '../../services/withdrawal.service';

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

  constructor(private withdrawalService:WithdrawalService) { }

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
  }

  getTransferRequestList(){

    // using service get data and link with datasource
    this.withdrawalService.getTransferRequestList().subscribe( res =>{
      debugger;
      this.transferRequests.data = res as TransferRequest[];
    });
    //this.transferRequests.data = this.dummyData as TransferRequest[];
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
