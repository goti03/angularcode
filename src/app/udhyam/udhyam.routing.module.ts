import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UdhyamportalComponent } from './udhyamportal/udhyamportal.component';

const routes: Routes = [
    { path: 'udyam/:orgId/:loanId/:custId/:retId', component: UdhyamportalComponent },]

   
    

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UdhyamRoutingModule { }