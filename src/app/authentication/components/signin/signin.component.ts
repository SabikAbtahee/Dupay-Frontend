import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import * as util from "util";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinform = this.authService.logInForm;

  constructor(private authService: AuthenticationService, ) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(util.inspect(this.signinform.value));
  }
}
