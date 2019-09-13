import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeDefaultComponent } from './components/home-default/home-default.component';
import { RouterModule, Routes } from '@angular/router';


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
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
