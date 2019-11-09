import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
	selector: 'app-payment-default',
	templateUrl: './payment-default.component.html',
	styleUrls: [ './payment-default.component.scss' ]
})
export class PaymentDefaultComponent implements OnInit {
	MerchantName: any = 'Sabik Abtahee';
	Amount: number = 500;
	isSureCashOpen: boolean = false;
	surecashForm: FormGroup;

	constructor(private fb: FormBuilder) {}

	ngOnInit() {
		this.makeSurecashForm();

	}

	openSureCash() {
		this.isSureCashOpen = true;
	}
	closeSureCash(){
		this.isSureCashOpen=false;
	}

	openBkash() {}
	makeSurecashForm() {
		this.surecashForm = this.fb.group({
			amount: [ '', [ Validators.required ,Validators.maxLength(12),Validators.minLength(12) ]]
		});
	}


	
	
}
