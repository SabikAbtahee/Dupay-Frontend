import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {passwordRegex, snackbarMessages} from "../../../config/constants/dupayConstants";
import {NotifyMerchantService} from "../../services/notify-merchant.service";
import {PasswordModalService} from "../../services/password-modal.service";
import {SharedService} from "../../../shared/services/shared.service";

@Component({
  selector: 'app-merchant-notification',
  templateUrl: './merchant-notification.component.html',
  styleUrls: ['./merchant-notification.component.scss']
})
export class MerchantNotificationComponent implements OnInit {
  notificationForm: FormGroup;

  constructor(private fb: FormBuilder,
              private notifyMerchantService: NotifyMerchantService,
              private sharedService: SharedService
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
    this.notifyMerchantService.message = this.notificationForm.value.notification;
    this.notifyMerchantService.sendNotification().subscribe(res=>{
      if(res.message == "Email has been sent to the merchants"){
        console.log("ok");
        this.openSnackBar(snackbarMessages.selected_merchant_notification_sent_success, true);

      }
      else {
        this.openSnackBar(snackbarMessages.selected_merchant_notification_sent_fail, false);

      }
      this.notifyMerchantService.close();

    });
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
