import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SharedService } from './services/shared.service';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { SnackbarComponent } from './components/snackbar/snackbar.component';

import { MatTableModule } from '@angular/material/table';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [SnackbarComponent, DialogComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    AngularFontAwesomeModule,
    MatDividerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatTableModule
  ],
  exports:[
    
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    AngularFontAwesomeModule,
    MatDividerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatTableModule
  ],
  providers:[SharedService],
  entryComponents:[SnackbarComponent]
})
export class SharedModule { }
