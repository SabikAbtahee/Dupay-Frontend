import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {  TransferRequest } from 'src/app/config/interfaces/dupay.interface';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-status-complete-modal',
  templateUrl: './status-complete-modal.component.html',
  styleUrls: ['./status-complete-modal.component.scss']
})
export class StatusCompleteModalComponent implements OnInit {

  statusCompleteForm: FormGroup;
  transactionId = new FormControl('',[]);
  amount = new FormControl('',[]);
  password = new FormControl('',[]);

  constructor(private dialogRef: MatDialogRef<StatusCompleteModalComponent>, 
    @Inject(MAT_DIALOG_DATA) private data: TransferRequest, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.initializeForm();
  }

  initializeForm(){
    this.statusCompleteForm.controls.transactionId.patchValue(this.data.transactionId);
    this.statusCompleteForm.controls.amount.patchValue(this.data.amount);
  }

  createForm(){
    this.statusCompleteForm = this.formBuilder.group({
      transactionId : this.transactionId,
      amount: this.amount,
      password: this.password
    });
  }

  close(){
    this.dialogRef.close({event:"close"});
  }

  save(){
    
  }

}
