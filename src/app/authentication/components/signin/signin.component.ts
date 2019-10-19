import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import * as util from 'util';
import { authentication_error_messages, snackbarMessages, urlPaths } from '../../../config/constants/dupayConstants';
import { Router } from '@angular/router';
import { QueryService } from '../../../core/query-services/query.service';
import { MutationService } from '../../../core/mutation-services/mutation.service';
import { SharedService } from '../../../shared/services/shared.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

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
		private coreQuery: QueryService,
		private coreMutate: MutationService,
		private sharedService: SharedService,
		private fb: FormBuilder
	) {}

	ngOnInit() {
		this.makeLoginForm();
	}

	makeLoginForm() {
		this.signinform = this.fb.group({
			email: [ '', [ Validators.required, Validators.email ] ],
			password: [ '', [ Validators.required ] ]
		});
	}

	onSubmit() {
		this.isLoading = true;
		if (this.signinform.valid) {
			// this.authService.signin(this.signinform);
			// console.log(util.inspect(this.signinform.value));
			this.openSnackBar(snackbarMessages.login, true);
		} else {
			this.authService.touchAllfields(this.signinform);
			this.isLoading = false;
		}
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
