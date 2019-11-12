import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
	selectedId:number;
	invoiceId:number;

	constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router:Router ) {}

	ngOnInit() {
		//let param1 = this.activatedRoute.snapshot.queryParams["invoiceId"];
		console.log('sadf');
			this.router.routerState.root.queryParams.subscribe(params => {
				this.selectedId = +params['id'];
				console.log(params);
				this.invoiceId=params.invoiceId;
				console.log(this.invoiceId);
		});
		if (this.invoiceId!=null){
			this.makeSurecashForm();
		}else{
			console.log('Does not exist');
		}
	  
		//this.makeSurecashForm();
		
		

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
