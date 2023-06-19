import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  } from './lead-documents/lead-documents.component';
import { LeadsComponent } from './leads.component';
import { LeadsRoutingModule } from './leads.routing.module';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadPromotorsComponent } from './lead-promotors/lead-promotors.component';
import { LeadDocumentsComponent } from './lead-documents/lead-documents.component';
@NgModule({
  declarations: [LeadsComponent,LeadPromotorsComponent,LeadDocumentsComponent],
  imports: [
    CommonModule,LeadsRoutingModule,NgbModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class LeadsModule { }
