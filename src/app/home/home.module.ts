import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeDefaultComponent } from './components/home-default/home-default.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeService } from './services/home.service';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { ConfigModule } from '../config/config.module';


const routes:Routes=[
  {
		path: '',
		component:HomeDefaultComponent
	}
]
@NgModule({
  declarations: [HomeDefaultComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CoreModule,
    ConfigModule
  ],
  providers:[HomeService]
})
export class HomeModule { }
