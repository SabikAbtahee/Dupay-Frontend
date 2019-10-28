import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {authentication_error_messages, passwordRegex} from "../../../config/constants/dupayConstants";
import {FieldMatcher} from "../../../core/utility-services/utility-service.service";
import {UserProfileService} from "../../services/user-profile.service";
import {passwordChange} from "../../../config/interfaces/dupay.interface";

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  constructor(	private fb: FormBuilder, private profileservice:UserProfileService) { }
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
        return { notMatching: true };
      }
    }

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
      console.log(result);
    });
  }
}
