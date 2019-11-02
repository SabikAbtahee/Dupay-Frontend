import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {passwordRegex} from "../../../config/constants/dupayConstants";
import {NotifyMerchantService} from "../../services/notify-merchant.service";

@Component({
  selector: 'app-merchant-notification',
  templateUrl: './merchant-notification.component.html',
  styleUrls: ['./merchant-notification.component.scss']
})
export class MerchantNotificationComponent implements OnInit {
  notificationForm: FormGroup;

  constructor(private fb: FormBuilder,
              private notifyMerchantService: NotifyMerchantService
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
    this.notifyMerchantService.sendNotification();
  }
}
