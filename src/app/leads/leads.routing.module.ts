import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeadDocumentsComponent } from './lead-documents/lead-documents.component';
import { LeadPromotorsComponent } from './lead-promotors/lead-promotors.component';
import {LeadsComponent} from './leads.component';

let routes:Routes=[
  {  path: '', component: LeadsComponent,},  
  {  path: 'leadpromoters/:leadId', component: LeadPromotorsComponent},
  {  path: 'leaddocuments/:leadId', component: LeadDocumentsComponent}  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadsRoutingModule { }
