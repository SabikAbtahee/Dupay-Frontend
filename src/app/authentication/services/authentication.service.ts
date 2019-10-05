import { Injectable } from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public logInForm = this.fb.group({
    email: [''],
    password: ['']
  });
  constructor(private fb: FormBuilder, ) { }
}
