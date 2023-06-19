import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {GstreportComponent} from './gstreport.component';

let routes:Routes=[
  {  path: '', component: GstreportComponent,}  ,
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GstreportRoutingModule { }
