import { Component, OnInit } from '@angular/core';
import {PasswordModalService} from "../../services/password-modal.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private passwordmodal: PasswordModalService,) { }

  ngOnInit() {
  }
  openChangePasswordModal() {
    this.passwordmodal.openPasswordChangeModal();
  }
}
