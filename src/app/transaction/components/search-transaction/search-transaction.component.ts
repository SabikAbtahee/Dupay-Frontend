import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/services/shared.service';
import { UtilityService } from '../../../core/utility-services/utility-service.service';
import { urlPaths } from '../../../config/constants/dupayConstants';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-search-transaction',
  templateUrl: './search-transaction.component.html',
  styleUrls: ['./search-transaction.component.scss']
})
export class SearchTransactionComponent implements OnInit {
  queryTransactionForm:FormGroup;
	isLoading: boolean = false;
	urlPaths = urlPaths;
  content={};
  dataready=false;
  constructor
  (private router: Router,
		private sharedService: SharedService,
		private fb: FormBuilder,
    private util: UtilityService,
    private transaction:TransactionService) { }

  ngOnInit() {
    this.makeQueryForm();
  }

  makeQueryForm(){
    this.queryTransactionForm = this.fb.group({
			id: [ '', [ Validators.required] ],
			
		});
  }

  onSubmit(){
		this.isLoading = true;
    if (this.queryTransactionForm.valid) {
      let id = this.queryTransactionForm.value.id;
      this.transaction.queryTransaction(id).subscribe(res=>{
        if(res.total==1){
          this.showData(res.content);
        }
        else{
          this.dataready=false;
          this.openSnackBar("No Such Id Found",false);
        }
        // console.log(res);
        this.isLoading = false;
      },
      err=>{
        // console.log(err);
        this.openSnackBar("No Such Id Found",false);
        this.dataready=false;

        this.isLoading = false;
      })
    }
    else {
			this.util.touchAllFieldsOfForm(this.queryTransactionForm);
			this.isLoading = false;
		}

  }

  showData(con){
    this.content={
      invoiceId:con[0].invoiceId,
      transactionId:con[0].transactionId,
      payDate:con[0].payDate,
      payAmount:con[0].payAmount,
      walletType:con[0].walletType,
    }
    this.dataready=true;
  }

  openSnackBar(message, isAccepted) {
		this.sharedService.openSnackBar({
			data: { message: message, isAccepted: isAccepted },
			duration: 2,
			panelClass: [ 'recovery-snackbar' ],
			horizontalPosition: 'right',
			verticalPosition: 'top'
		});
	}

}
