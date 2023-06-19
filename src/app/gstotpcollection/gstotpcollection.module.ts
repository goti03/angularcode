import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { ApiService } from '../../core/api.service';
import {GstuserComponent} from './gstuser/gstuser.component';
import {ThankyouComponent} from './thankyou/thankyou.component'



import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { gstotpcollectionRoutes } from './gstotpcollection.routing';



@NgModule({
  declarations: [
    GstuserComponent,
    ThankyouComponent
  ],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(gstotpcollectionRoutes),
  

   
  
  ]
})
export class GstotpcollectionModule { }
