import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Wallet_Types } from '../../../config/enums/dupay.enum';

// export interface WalletName {
//   walletName: string;
// }

@Component({
  selector: "app-withdraw-request",
  templateUrl: "./withdraw-request.component.html",
  styleUrls: ["./withdraw-request.component.scss"]
})


export class WithdrawRequestComponent implements OnInit {
  withdrawRequestForm: FormGroup;
  phoneNumber: number;
  constructor(private fb: FormBuilder) {}

  // walletName = new FormControl('', [Validators.required]);
  // selectFormControl = new FormControl('', [Validators.required]);
  wallets=Wallet_Types;
  ngOnInit() {
    this.makingThisForm();
  }
  makingThisForm() {
    this.withdrawRequestForm = this.fb.group({
      walletName: ['',[Validators.required,]],
      phoneNumber: ['',[Validators.required, Validators.maxLength(11)]]      
    })  

  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
