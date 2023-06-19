import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandComponent} from './brand.component';
import{BrandupdateComponent} from './brandupdate/brandupdate.component'
import { BrandRoutingModule } from './brand.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { BulkUploadComponent } from './bulk-upload/bulk-upload.component';
import { BeneDetailsCheckerComponent } from './bene-details-checker/bene-details-checker.component';
import { BeneDetailsAdderComponent } from './bene-details-adder/bene-details-adder.component';
import { MatButtonModule,
  MatCheckboxModule, MatTableModule, MatCardModule, MatDialogModule, MatAutocompleteModule,MatTooltipModule,
  MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MAT_DATE_LOCALE
} from '@angular/material';

@NgModule({
  declarations: [BrandComponent,BrandupdateComponent,BulkUploadComponent,BeneDetailsCheckerComponent,BeneDetailsAdderComponent],
  imports: [
    CommonModule,
    BrandRoutingModule,
    FormsModule,
    ReactiveFormsModule,Ng2SearchPipeModule,NgxPaginationModule,
    MatButtonModule,
    MatCheckboxModule, MatTableModule, MatCardModule, MatDialogModule, MatAutocompleteModule,MatTooltipModule,
    MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class BrandModule { }

