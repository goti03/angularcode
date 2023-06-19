import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
    MatCheckboxModule, MatTableModule, MatCardModule, MatDialogModule, MatAutocompleteModule,
    MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MAT_DATE_LOCALE
  } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedRoutingModule } from './shared-routing.module';
import { ActionTabComponent } from './action-tab/action-tab.component';

@NgModule({
    declarations: [
        ActionTabComponent
    ],
    imports : [
        SharedRoutingModule, CommonModule, 
        FormsModule,DragDropModule,
        NgxPaginationModule,Ng2SearchPipeModule,
        NgbModule,MatCheckboxModule, MatTableModule, MatCardModule, MatDialogModule, MatAutocompleteModule,
        MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, 
    ],
    exports : [ActionTabComponent,DragDropModule, SharedRoutingModule, CommonModule, 
        FormsModule,DragDropModule,
        NgxPaginationModule,Ng2SearchPipeModule,
        NgbModule,MatCheckboxModule, MatTableModule, MatCardModule, MatDialogModule, MatAutocompleteModule,
        MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule ]
})

export class SharedModule{
    
} 