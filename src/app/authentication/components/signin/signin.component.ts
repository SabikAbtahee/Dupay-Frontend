import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import * as util from "util";
import {authentication_error_messages, snackbarMessages, urlPaths} from '../../../config/constants/dupayConstants';
import {Router} from "@angular/router";
import {QueryService} from "../../../core/query-services/query.service";
import {MutationService} from "../../../core/mutation-services/mutation.service";
import {SharedService} from "../../../shared/services/shared.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinform = this.authService.logInForm;
  error_messages = authentication_error_messages;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private coreQuery: QueryService,
              private coreMutate: MutationService,
              private sharedService: SharedService ) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.signinform.valid) {
      console.log(util.inspect(this.signinform.value));
      this.openSnackBar(snackbarMessages.login,true);
    }
    else {
      this.authService.touchAllfields(this.signinform);
    }
  }
  routeToSignup() {
    this.router.navigate([ urlPaths.Authentication.Signup.url ]);
  }

  routeToAccountRecovery() {
    this.router.navigate([ urlPaths.Authentication.AccountRecovery.url ]);
  }

  routeToHome() {

  }
  openSnackBar(message,isAccepted) {
    this.sharedService.openSnackBar({
      data: { message: message, isAccepted: isAccepted },
      duration: 2,
      panelClass: [ 'recovery-snackbar' ],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
