import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GstsummaryComponent} from './gstsummary.component';

let routes:Routes=[
  {  path: '', component: GstsummaryComponent,}  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GstsummaryRoutingModule { }
