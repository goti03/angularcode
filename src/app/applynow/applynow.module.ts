import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginnowComponent } from './loginnow/loginnow.component';
import { OtpnowComponent } from './otpnow/otpnow.component';
import { DetailsnowComponent } from './detailsnow/detailsnow.component';
import { ThankyouleadComponent } from './thankyoulead/thankyoulead.component';
import {applynowRoutes} from './applynow.routing.module'



@NgModule({
  declarations: [LoginnowComponent,OtpnowComponent,DetailsnowComponent,ThankyouleadComponent],
  imports: [
    CommonModule, FormsModule,ReactiveFormsModule,
    NgbModule,RouterModule.forChild(applynowRoutes)
  ]
})
export class ApplynowModule { }
