import { Component, OnInit } from '@angular/core';
import {PasswordModalService} from "../../services/password-modal.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserProfileService} from "../../services/user-profile.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profileform: FormGroup;
  user;
  constructor(private passwordmodal: PasswordModalService,private fb: FormBuilder,
              private userProfileService: UserProfileService
              ) { }

  ngOnInit() {
    this.makeProfileForm();
    this.setProfileInformation();
  }

  setProfileInformation(){
    this.user = this.userProfileService.getProfileInformation();
  }
  setProfileForm(user) {
    this.profileform.controls.name.patchValue(user.name);
    this.profileform.controls.phoneNumber.patchValue(user.phoneNumber);
    // this.profileform.controls.role.patchValue(user.role);
    this.profileform.controls.homeAddress.patchValue(user.homeAddress);
    this.profileform.controls.shopAddress.patchValue(user.shopAddress);
  }

  makeProfileForm() {
    this.profileform = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: [''],
      // role: [ '', Validators.required ],
      homeAddress: [''],
      shopAddress: ['']
    });
  }
  openChangePasswordModal() {
    this.passwordmodal.openPasswordChangeModal();
  }
}
