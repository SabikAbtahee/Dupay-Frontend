import { api_path } from './../../config/apiRoutes/apiroutes';
import { Injectable } from '@angular/core';
import {FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { UtilityService } from '../../core/utility-services/utility-service.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { httpOptions } from '../../config/constants/dupayConstants';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  api_paths=api_path;
  constructor(private fb: FormBuilder,private util:UtilityService ,private http: HttpClient) { }


  touchAllfields(group:FormGroup){
		this.util.touchAllFieldsOfForm(group);
  }
  
  sendOtpToEmail(email:string){
    this.http.post(`${api_path.signUpOTPEmail}/${email}/`, httpOptions).pipe(first()).subscribe(res=>{
      console.log(res);
    });
  }

  // signin(signin):Observable<any>{
  //   return new Observable(observer=>{

  //   })

  // }


}
