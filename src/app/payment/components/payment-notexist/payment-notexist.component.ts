import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-payment-notexist',
  templateUrl: './payment-notexist.component.html',
  styleUrls: ['./payment-notexist.component.scss']
})
export class PaymentNotexistComponent implements OnInit {

  MerchantName: any = 'Sabik Abtahee';
	Amount: number = 500;
	isSureCashOpen: boolean = false;
	surecashForm: FormGroup;
	selectedId:number;
	invoiceId:number;

	constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router:Router ) {}

	ngOnInit() {
		//let param1 = this.activatedRoute.snapshot.queryParams["invoiceId"];
			this.router.routerState.root.queryParams.subscribe(params => {
				this.selectedId = +params['id'];
				console.log(params);
        this.invoiceId=params.invoiceId;
				console.log(this.invoiceId);
		});
	
		
		

	}

}
