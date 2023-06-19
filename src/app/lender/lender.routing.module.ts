import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LenderComponent } from './lender.component';
import { LenderAddComponent } from './lender-add/lender-add.component';
import { LenderDetailsComponent } from './lender-details/lender-details.component';
import { LenderListComponent } from './lender-list/lender-list.component';
import { LenderUpdateComponent } from './lender-update/lender-update.component';

let routes:Routes=[
  {
    path: '', component: LenderComponent,
    children: [
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        {
          path: 'add',
          component: LenderAddComponent,
          data: {
            title: 'Lender',
            urls: [
              { title: 'Lender', url: '/lender' },
              { title: 'Add' }
            ]
          }
        },
        {
          path: 'details/:id',
          component: LenderDetailsComponent,
          data: {
            title: 'Lender',
            urls: [
              { title: 'Lender', url: '/lender' },
              { title: 'Details' }
            ]
          }
        },
        {
          path: 'list',
          component: LenderListComponent,
          data: {
            title: 'Lender',
            urls: [
              { title: 'Lender', url: '/lender' },
              { title: 'List' }
            ]
          }
        },
        {
          path: 'update/:id',
          component: LenderUpdateComponent,
          data: {
            title: 'Lender',
            urls: [
              { title: 'Lender', url: '/lender' },
              { title: 'Update' }
            ]
          }
        }

        // { path: 'add', component: LenderAddComponent },
        // { path: 'details/:id', component: LenderDetailsComponent },
        // { path: 'list' , component: LenderListComponent },
        // { path: 'update/:id', component: LenderUpdateComponent }
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LenderRoutingModule { }
