import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilityService } from '../../core/utility-services/utility-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private util:UtilityService) { }

  touchAllfields(group:FormGroup){
		this.util.touchAllFieldsOfForm(group);
	}
}
