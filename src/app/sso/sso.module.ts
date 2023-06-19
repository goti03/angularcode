import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



import { LoginComponent } from './login/login.component';

import { AuthenticationRoutes } from './sso.routing';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    NgbModule,
  
  ],
  declarations: [

    LoginComponent,
   
  ]
})
export class ssoModule {}
