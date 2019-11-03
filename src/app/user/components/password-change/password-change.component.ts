import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  authentication_error_messages,
  passwordRegex,
  snackbarMessages,
  urlPaths
} from "../../../config/constants/dupayConstants";
import {FieldMatcher} from "../../../core/utility-services/utility-service.service";
import {UserProfileService} from "../../services/user-profile.service";
import {passwordChange} from "../../../config/interfaces/dupay.interface";
import {AuthenticationService} from "../../../authentication/services/authentication.service";
import {Router} from "@angular/router";
import {SharedService} from "../../../shared/services/shared.service";
import {PasswordModalService} from "../../services/password-modal.service";
import {group} from "@angular/animations";

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  constructor(	private fb: FormBuilder,
                private profileservice:UserProfileService,
                private router: Router,
                private passwordModalService: PasswordModalService,
                private sharedService: SharedService) { }
  changePasswordForm: FormGroup;
  passwordgroup: any = {};
  error_messages = authentication_error_messages;
  data : passwordChange = null;
  matcher;
  ngOnInit() {
    this.makePasswordChangeForm();
    this.setCustomValidation();
    this.passwordChangeValueAssign();
  }
  passwordChangeValueAssign(){
    let user;
    user = JSON.parse(this.profileservice.getProfileInformation());
    this.data ={
      email :user.email,
      oldPassword :this.changePasswordForm.value.oldpassword,
      newPassword :this.changePasswordForm.value.newpassword,
        confirmPassword :this.changePasswordForm.value.confirmpassword
    }
    // this.data.email = user.email;
    // this.data.oldPassword = this.changePasswordForm.value.oldpassword;
    // this.data.newPassword = this.changePasswordForm.value.newpassword;
    // this.data.confirmPassword = this.changePasswordForm.value.confirmpassword;

  }
  makePasswordChangeForm() {
    this.changePasswordForm = this.fb.group({
      oldpassword: [ '', [ Validators.required] ],
      newpassword: [ '', [ Validators.required, Validators.pattern(passwordRegex) ] ],
      confirmpassword: [ '', [ Validators.required, Validators.pattern(passwordRegex) ] ]
    });
  }
  passwordMatchValidator(group: FormGroup): any {
    if (group) {
      if (group.get('newpassword').value !== group.get('confirmpassword').value) {
        return { not_matching: true };
      }
    }

    // if(control.value !== this.changePasswordForm.value.newpassword) {
    //   return { notMatching: true };
    // }
    return null;
  }
  setCustomValidation() {
    this.changePasswordForm.setValidators(this.passwordMatchValidator);
    this.changePasswordForm.updateValueAndValidity();
    this.matcher = new FieldMatcher();
  }

  setPassword() {
    this.passwordgroup.oldpassword = this.changePasswordForm.value.oldpassword;
    this.passwordgroup.newpassword = this.changePasswordForm.value.newpassword;
    this.passwordgroup.confirmpassword = this.changePasswordForm.value.confirmpassword;
  }

  updateFields() {
    this.profileservice.touchAllfields(this.changePasswordForm);
  }
  onSubmit() {
    if (this.changePasswordForm.valid) {
      this.setPassword();
      this.passwordChangeValueAssign();
      this.updatePassword(this.passwordgroup);

    } else {
      this.updateFields();
    }
  }
  updatePassword(passwords) {

    this.profileservice.updatePassword(this.data).subscribe(result =>{
      if(result.message == 'Password has changed successfully.'){
        this.openSnackBar(snackbarMessages.change_password_success, true);
      }
      else if(result.error == 'Old password does not match.'){
        this.openSnackBar('Old password does not match.', false);
      }
      else{
        this.openSnackBar(snackbarMessages.change_password_fail, false);

      }
      this.close();
      console.log(result);
    });
  }
  close(){
    this.passwordModalService.modalClose();
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
