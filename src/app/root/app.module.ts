import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ConfigModule } from './../config/config.module';
import { CoreModule } from './../core/core.module';
import { SharedModule } from './../shared/shared.module';
import { RootService } from './services/root.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './root-default/app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavSideBarComponent } from './nav-side-bar/nav-side-bar.component';
import { BlankComponent } from './blank/blank.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    NavSideBarComponent,
    BlankComponent
    
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    ConfigModule,
    LayoutModule,
    
  ],
  providers: [RootService],
  bootstrap: [AppComponent]
})
export class AppModule { }
