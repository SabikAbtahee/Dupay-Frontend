import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import * as util from 'util';
import { authentication_error_messages, snackbarMessages, urlPaths } from '../../../config/constants/dupayConstants';
import { Router } from '@angular/router';
import { QueryService } from '../../../core/query-services/query.service';
import { MutationService } from '../../../core/mutation-services/mutation.service';
import { SharedService } from '../../../shared/services/shared.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { loginCredentials } from '../../../config/interfaces/configurations.interface';
import { first } from 'rxjs/operators';
import { UtilityService } from '../../../core/utility-services/utility-service.service';
import { User } from '../../../config/interfaces/dupay.interface';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: [ './signin.component.scss' ]
})
export class SigninComponent implements OnInit {
	isLoading: boolean = false;
	signinform: FormGroup;
	error_messages = authentication_error_messages;
	urlPaths = urlPaths;

	constructor(
		private authService: AuthenticationService,
		private router: Router,
		private sharedService: SharedService,
		private fb: FormBuilder,
		private util: UtilityService
	) {}

	ngOnInit() {
		this.makeLoginForm();
	}

	makeLoginForm() {
		this.signinform = this.fb.group({
			email: [ '', [ Validators.required,Validators.email ] ],
			password: [ '', [ Validators.required ] ]
		});
	}

	onSubmit() {
		this.isLoading = true;
		if (this.signinform.valid) {
			let loginCredentials: loginCredentials = {
				email: this.signinform.value.email,
				password: this.signinform.value.password
			};

			this.authService.signInAccount(loginCredentials).pipe(first()).subscribe(
				(res) => {
					this.saveLoggedInUser(res);
					this.route(urlPaths.Home.HomeDefault.url);
					this.openSnackBar(snackbarMessages.login, true);
					this.isLoading = false;
				},
				(err) => {
					let message = this.util.giveErrorMessage(err);
					this.openSnackBar(this.util.toCapitalize(message), false);
					this.isLoading = false;
				}
			);
		} else {
			this.authService.touchAllfields(this.signinform);
			this.isLoading = false;
		}
	}

	saveLoggedInUser(user: User) {
		this.authService.setSession(user);
	}
	route(path) {
		this.router.navigate([ path ]);
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
