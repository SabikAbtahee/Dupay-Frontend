import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig, MatSort } from '@angular/material';
import { TransferRequest, SelectOption, Merchant } from '../../../config/interfaces/dupay.interface';
import { WithdrawalService } from '../../services/withdrawal.service';
import { StatusCompleteModalComponent } from './status-complete-modal/status-complete-modal.component';
import { Withdraw_status, Withdraw_status_view } from '../../../config/enums/dupay.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { MerchantDetailsComponent } from '../../../user/components/merchant-details/merchant-details.component';
import { UserService } from '../../../user/services/user.service';

@Component({
  selector: 'app-transfer-request',
  templateUrl: './transfer-request.component.html',
  styleUrls: ['./transfer-request.component.scss']
})
export class TransferRequestComponent implements OnInit {

  dummyData: TransferRequest[];
  displayedColumns: string[];
  initialStatusList: SelectOption[];
  statusList: SelectOption[];
  statusIndexMap : any;
  initialStatusIndexMap : any;
  transferRequests = new MatTableDataSource<TransferRequest>();
  merchantNameList: string[] = [];
  selectedName: string;
  inputFilter: string;

  @ViewChild(MatPaginator,  { static: true } ) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true })	sort: MatSort;
  constructor(private withdrawalService:WithdrawalService, private matDialog:MatDialog, private spinner: NgxSpinnerService,private userService:UserService) { }

  ngOnInit() {
    this.initialize();
    this.getTransferRequestList();
    this.transferRequests.sort = this.sort;
    this.transferRequests.sortingDataAccessor = (item,property)=>{
      switch(property) {
        case 'accountNumber': return item.merchantAccount.accountNumber;
        default: return item[property];
      }
    };
    this.transferRequests.paginator = this.paginator;
    this.transferRequests.filterPredicate = function (data,filter:string) : boolean{
      return data.merchantAccount.accountNumber.toLowerCase().includes(filter) || data.status.toLowerCase().includes(filter)
      || data.amount.toString().includes(filter) || data.merchantName.toLowerCase().includes(filter) ;
    };
  }

  initialize(){
    this.displayedColumns = ["merchantName","accountNumber","accountName","bankName","branch", "withdrawDate", "amount", "status" ];
    this.initialStatusList = [
      {value: Withdraw_status.PENDING,viewValue: Withdraw_status_view.PENDING },
      {value: Withdraw_status.IN_PROGRESS,viewValue: Withdraw_status_view.ACCEPT },
      {value: Withdraw_status.REJECTED,viewValue:Withdraw_status_view.REJECTED },
    ];
    this.statusList = [
      {value: Withdraw_status.IN_PROGRESS, viewValue: Withdraw_status_view.IN_PROGRESS},
      {value: Withdraw_status.DONE, viewValue: Withdraw_status_view.DONE}
    ];
    this.initialStatusIndexMap =  this.getMap(this.initialStatusList);
    this.statusIndexMap = this.getMap(this.statusList);

  }

  getMap(list: SelectOption[]){
    let i = 0;
    return new Map(list.map( element => [element.value, i++])) ;
  }

  getTransferRequestList(){
    this.spinner.show();
    this.withdrawalService.getTransferRequestList().subscribe( res =>{
      res.forEach((element)=>{ if(!this.merchantNameList.includes(element.merchantName)) this.merchantNameList.push(element.merchantName)});
      this.merchantNameList.sort((first,second)=>first.localeCompare(second));
      this.transferRequests.data = res as TransferRequest[];
      this.spinner.hide();
    }, err=>{
      this.spinner.hide();
    });
  }

  getStatusList(status:string): SelectOption[]{
    if(status == Withdraw_status.PENDING) return Object.assign([], this.initialStatusList).splice(this.initialStatusIndexMap.get(status),this.initialStatusList.length);
    else if (status == Withdraw_status.REJECTED) return Object.assign([], this.initialStatusList).splice(this.initialStatusIndexMap.get(status),this.initialStatusList.length);
    else return Object.assign([], this.statusList).splice(this.statusIndexMap.get(status),this.statusList.length);
  }

  applyFilter(value:string){
    if(value!=null) this.transferRequests.filter = value.trim().toLowerCase();
  }

  onNamefilter(name: string){
    this.applyFilter(name);
  }

  onRefresh(){
    this.selectedName = undefined;
    this.inputFilter = undefined;
    this.onNamefilter("");
  }













  onStatusChange(element: TransferRequest){

    let updateRequest = {
      id: element.id,
      transactionId: element.transactionId,
      status: element.status,
      systemAccount: null
    };

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
        else if (result.event == "save") {
          updateRequest.transactionId = result.data.transactionId;
          this.spinner.show();
          this.withdrawalService.updateTransferRequestStatus(updateRequest).subscribe( res =>{
            this.spinner.hide();
            this.getTransferRequestList()
          });
        }
      });
    }
    
    else{
      updateRequest.transactionId = element.transactionId
      this.spinner.show();
      this.withdrawalService.updateTransferRequestStatus(updateRequest).subscribe( res =>{
        this.spinner.hide();
      });
    }

  }

  public redirectToDetails = (id: string) => {
		let specificMerchant: Merchant;

		this.userService.getMerchantDetails(id).subscribe(
			(res) => {
				this.userService.getMerchantAccountDetails(id).subscribe(
					(res2) => {
            // console.log('merchant details'+res2);
            // console.log('res:'+JSON.stringify(res));
						console.log('res2:'+JSON.stringify(res2));
						res.nidFile = 'data:image/png;base64,' + res.nidFile;
						res.tradeInsuranceFile = 'data:image/png;base64,' + res.tradeInsuranceFile;
						this.matDialog
							.open(MerchantDetailsComponent, {
								data: {res,res2},
								autoFocus: false,
								maxHeight: '90vh',
								maxWidth: '80vw !important'
							})
							.afterClosed()
							.subscribe((result) => {});
					},
					(err) => {
						console.log(err);
					}
				);
			},
			(err) => {
				console.error(err);
			}
		);
	};

}
