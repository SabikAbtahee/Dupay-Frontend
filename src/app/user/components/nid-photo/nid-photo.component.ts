import { Component, OnInit } from '@angular/core';
import {api_path} from "../../../config/apiRoutes/apiroutes";
import {PasswordModalService} from "../../services/password-modal.service";
import {FormBuilder} from "@angular/forms";
import {UserProfileService} from "../../services/user-profile.service";
import {QueryService} from "../../../core/query-services/query.service";
import {SecurityService} from "../../../core/security-services/security.service";

@Component({
  selector: 'app-nid-photo',
  templateUrl: './nid-photo.component.html',
  styleUrls: ['./nid-photo.component.scss']
})
export class NIDPhotoComponent implements OnInit {

  data;
  imgSrc='';
  constructor(private passwordmodal: PasswordModalService,private fb: FormBuilder,
              private userProfileService: UserProfileService,
              private queryService:QueryService,
              private securityService:SecurityService) { }

  ngOnInit() {
    let header = this.securityService.getAuthorizedHeader();
    let id = this.securityService.getLoggedInUserId();
    this.queryService.httpGet(`${api_path.getMerchantInfoWithId}/${id}`, header).subscribe(res =>{
      console.log(res);
      this.data = res;
      this.imgSrc = `data:image/png;base64,${this.data.nidFile}`;
    });
  }

}
