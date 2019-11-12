import { Component, OnInit } from '@angular/core';
import { WithdrawalService } from '../../services/withdrawal.service';
import { SecurityService } from '../../../core/security-services/security.service';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/services/shared.service';
import { snackbarMessages, urlPaths, withdrawErrorMessages } from '../../../config/constants/dupayConstants';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { validateBasis } from '@angular/flex-layout';
import { Observable, BehaviorSubject } from 'rxjs';
import { loginCredentials } from '../../../config/interfaces/configurations.interface';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { UtilityService } from '../../../core/utility-services/utility-service.service';
import { WithdrawRequest, MerchantAccount } from 'src/app/config/interfaces/dupay.interface';
import { WithdrawRequestModalService } from '../../services/withdraw-request-modal.service';

@Component({
	selector: 'app-withdraw-request',
	templateUrl: './withdraw-request.component.html',
	styleUrls: [ './withdraw-request.component.scss' ]
})
export class WithdrawRequestComponent implements OnInit {
	withdrawForm: FormGroup;
	withdrawErrorMessages = withdrawErrorMessages;
	
	CurrentAmount = 0;
	RequestedAmount = 0;
	isLoading = false;
	loggedInEmail;
	accountInformation:MerchantAccount;
	constructor(
		private withdrawService: WithdrawalService,
		private router: Router,
		private sharedService: SharedService,
		private fb: FormBuilder,
		private authService: AuthenticationService,
		private util: UtilityService,
		private withdrawModalService:WithdrawRequestModalService
	) {}

	ngOnInit() {
		this.setAccountInformation();
		this.setAmount();
		this.makeWithdrawForm();
		this.setEmail();
	}
	makeWithdrawForm() {
		this.withdrawForm = this.fb.group({
			amount: [
				'',
				[
					Validators.required,
					Validators.min(0),
					(control: AbstractControl) => Validators.max(this.CurrentAmount - this.RequestedAmount)(control)
				]
			],
			
			password: [ '', [ Validators.required ] ]
		});
	}

	getMerchantAccount(): Observable<any> {
		return new Observable((observer) => {
			this.withdrawService.getMerchantAccounts().subscribe(
				(res) => {
					observer.next(res);
				},
				(err) => {
					this.openSnackBar(snackbarMessages.access_denied, false);
					this.route(urlPaths.Authentication.Signin.url);
				}
			);
		});
	}
	

	onSubmit() {
		this.sharedService.openSpinner();
		if (this.withdrawForm.valid) {
			let loginCredentials: loginCredentials = {
				email: this.loggedInEmail,
				password: this.withdrawForm.value.password
			};

			this.authService.signInAccount(loginCredentials).pipe(first()).subscribe(
				(res) => {
					this.withdrawRequest();
					this.sharedService.hideSpinner();
				},
				(err) => {
					let message = this.util.giveErrorMessage(err);
					this.openSnackBar(this.util.toCapitalize(message), false);
					this.sharedService.hideSpinner();
				}
			);
		} else {
			this.authService.touchAllfields(this.withdrawForm);
			this.sharedService.hideSpinner();
		}
	}

	route(path) {
		this.router.navigate([ path ]);
	}

	openSnackBar(message, isAccepted) {
		this.sharedService.openSnackBar({
			data: { message: message, isAccepted: isAccepted },
			duration: 3,
			panelClass: [ 'recovery-snackbar' ],
			horizontalPosition: 'right',
			verticalPosition: 'top'
		});
	}

	setAmount() {
		this.withdrawService.getMerchantInfo().subscribe((res) => {
			this.CurrentAmount = res.balance;
			this.RequestedAmount = res.requestedMoney;
		});
	}

	setEmail() {
		this.loggedInEmail = this.withdrawService.getEmail();
	}

	withdrawRequest() {
		let payload: WithdrawRequest = {
			amount: this.withdrawForm.value.amount,
			merchantAccount: {
				id: this.accountInformation.id
			}
		};

		this.withdrawService.withdrawMoney(payload).subscribe(
			(res) => {
				this.withdrawModalService.closeDialog();
				this.openSnackBar(snackbarMessages.withdraw_success, true);
			},
			(err) => {
				let message = this.util.giveErrorMessage(err);
				this.openSnackBar(this.util.toCapitalize(message), false);
			}
		);
	}

	setAccountInformation(){
		this.getMerchantAccount().pipe(first()).subscribe(res=>{
			this.accountInformation=res;
			
		},
		err=>{
			let message = this.util.giveErrorMessage(err);
			this.openSnackBar(this.util.toCapitalize(message), false);
		})
	}

	closeModal(){
		this.withdrawModalService.closeDialog();
		
	}
}
