import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { TransferRequest, SelectOption } from 'src/app/config/interfaces/dupay.interface';
import { WithdrawalService } from '../../services/withdrawal.service';
import { StatusCompleteModalComponent } from './status-complete-modal/status-complete-modal.component';

@Component({
  selector: 'app-transfer-request',
  templateUrl: './transfer-request.component.html',
  styleUrls: ['./transfer-request.component.scss']
})
export class TransferRequestComponent implements OnInit {

  dummyData: TransferRequest[];
  displayedColumns: string[];
  statusList: SelectOption[];
  statusIndexMap : any;
  transferRequests = new MatTableDataSource<TransferRequest>();

  @ViewChild(MatPaginator,  { static: true } ) paginator: MatPaginator;

  constructor(private withdrawalService:WithdrawalService, private matDialog:MatDialog) { }

  ngOnInit() {
    this.initialize();
    this.getTransferRequestList();
    this.transferRequests.paginator = this.paginator;
  }

  initialize(){
    this.displayedColumns = ["id", "time", "amount", "status" ];
    this.statusList = [
      {value: 'PENDING',viewValue:'Pending' },
      {value: 'IN_PROGRESS',viewValue:'In Progress' },
      {value: 'DONE',viewValue:'Complete' },
    ];
    let i=0;
    this.statusIndexMap = new Map(this.statusList.map( element => [element.value, i++])) ;
  }

  getTransferRequestList(){
    this.withdrawalService.getTransferRequestList().subscribe( res =>{
      this.transferRequests.data = res as TransferRequest[];
    });
  }

  getStatusList(status:string): SelectOption[]{
    return Object.assign([], this.statusList).splice(this.statusIndexMap.get(status),this.statusList.length);
  }

  onStatusChange(element: TransferRequest){

    if(element.status == "DONE"){
      let dialogConfig = new MatDialogConfig();
      dialogConfig.width = "400px";
      dialogConfig.data = element;

      let dialogRef = this.matDialog.open(StatusCompleteModalComponent,dialogConfig);
      dialogRef.backdropClick().subscribe(()=>{
        this.getTransferRequestList()
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result.event == "close") this.getTransferRequestList();
      });
    }
    
    else{
      let updateRequest = {
        id: element.id,
        transactionId: element.transactionId,
        status: element.status,
        systemAccount: null
      };
      this.withdrawalService.updateTransferRequestStatus(updateRequest).subscribe( res =>{
        console.log("updated result = " +res);
      });
    }

  }

}
