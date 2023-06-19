import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MasterComponent } from './master.component';
import { MasterAddComponent } from './master-add/master-add.component';
import { MasterDetailsComponent } from './master-details/master-details.component';
import { MasterListComponent } from './master-list/master-list.component';
import { MasterUpdateComponent } from './master-update/master-update.component';

let routes:Routes=[
  {
    path: '', component: MasterComponent,
    children: [
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        {
          path: 'add',
          component: MasterAddComponent,
          data: {
            title: 'Master',
            urls: [
              { title: 'Master', url: '/master' },
              { title: 'Add' }
            ]
          }
        },
        {
          path: 'details/:id',
          component: MasterDetailsComponent,
          data: {
            title: 'Master',
            urls: [
              { title: 'Master', url: '/master' },
              { title: 'Details' }
            ]
          }
        },
        {
          path: 'list',
          component: MasterListComponent,
          data: {
            title: 'Master',
            urls: [
              { title: 'Master', url: '/master' },
              { title: 'List' }
            ]
          }
        },
        {
          path: 'update/:id',
          component: MasterUpdateComponent,
          data: {
            title: 'Master',
            urls: [
              { title: 'Master', url: '/master' },
              { title: 'Update' }
            ]
          }
        }
        // { path: 'add', component: MasterAddComponent },
        // { path: 'details/:id', component: MasterDetailsComponent },
        // { path: 'list' , component: MasterListComponent },
        // { path: 'update/:id', component: MasterUpdateComponent }
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
