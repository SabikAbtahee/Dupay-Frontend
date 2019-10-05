import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MutationService} from './mutation-services/mutation.service';
import {QueryService} from './query-services/query.service';
import { UtilityService } from './utility-services/utility-service.service';
@NgModule({
	declarations: [],
	imports: [ CommonModule ],
	providers: [ MutationService, QueryService,UtilityService ]
})
export class CoreModule {}
