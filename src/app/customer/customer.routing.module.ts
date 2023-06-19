import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomerListComponent} from './customer-list/customer-list.component';
import { LanListComponent } from './lan-list/lan-list.component';

let routes:Routes=[
  {  path: 'customer', component: CustomerListComponent} , 
  {  path: 'lan', component: LanListComponent}  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
