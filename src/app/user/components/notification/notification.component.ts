import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotifyMerchantService} from "../../services/notify-merchant.service";
import {SharedService} from "../../../shared/services/shared.service";
import {Router} from "@angular/router";
import {authentication_error_messages, snackbarMessages} from "../../../config/constants/dupayConstants";
import {UserProfileService} from "../../services/user-profile.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notificationForm: FormGroup;
  error_messages = authentication_error_messages;

  constructor(private fb: FormBuilder,
              private notifyMerchantService: NotifyMerchantService,
              private sharedService: SharedService,
              private router: Router,
              private profileservice:UserProfileService
  ) { }

  ngOnInit() {
    this.makeNotificationForm();
  }
  makeNotificationForm() {
    this.notificationForm = this.fb.group({
      notification: [ '', [ Validators.required] ],

    });
  }

  send() {
    if (this.notificationForm.valid) {
      this.notifyMerchantService.message = this.notificationForm.value.notification;
      this.sharedService.openSpinner();

      this.notifyMerchantService.sendNotification().subscribe(res => {
        this.sharedService.hideSpinner();

        if (res.message == "Email has been sent to the merchants") {
          console.log("ok");
          this.openSnackBar(snackbarMessages.selected_merchant_notification_sent_success, true);

        } else {
          this.openSnackBar(snackbarMessages.selected_merchant_notification_sent_fail, false);

        }
        this.notifyMerchantService.close();

      });
    }
    else {
      this.updateFields();

    }
  }
  updateFields() {
    this.profileservice.touchAllfields(this.notificationForm);
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
