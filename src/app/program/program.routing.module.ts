import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProgramComponent } from './program.component';
import { ProgramAddComponent } from './program-add/program-add.component';
import { ProgramDetailsComponent } from './program-details/program-details.component';
import { ProgramListComponent } from './program-list/program-list.component';
import { ProgramUpdateComponent } from './program-update/program-update.component';
import { BannerComponent } from './banner/banner.component';
import { ProgramCopyComponent } from './program-copy/program-copy.component';

let routes:Routes=[
  {
    path: '', component: ProgramComponent,
    children: [
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        {
          path: 'add',
          component: ProgramAddComponent,
          data: {
            title: 'Program',
            urls: [
              { title: 'Program', url: '/program' },
              { title: 'Add' }
            ]
          }
        },
        {
          path: 'details/:id',
          component: ProgramDetailsComponent,
          data: {
            title: 'Program',
            urls: [
              { title: 'Program', url: '/program' },
              { title: 'Details' }
            ]
          }
        },
        {
          path: 'list',
          component: ProgramListComponent,
          data: {
            title: 'Program',
            urls: [
              { title: 'Program', url: '/program' },
              { title: 'List' }
            ]
          }
        },
        {
          path: 'update/:id',
          component: ProgramUpdateComponent,
          data: {
            title: 'Program',
            urls: [
              { title: 'Program', url: '/program' },
              { title: 'Update' }
            ]
          }
        },
        {
          path: 'banner',
          component: BannerComponent,
          data: {
            title: 'Program',
            urls: [
              { title: 'Program', url: '/program' },
              { title: 'banner' }
            ]
          }
        },
        {
          path: 'copy/:id',
          component: ProgramCopyComponent,
          data: {
            title: 'Program',
            urls: [
              { title: 'Program', url: '/program' },
              { title: 'Copy' }
            ]
          }
        }
        // { path: 'add', component: ProgramAddComponent },
        // { path: 'details/:id', component: ProgramDetailsComponent },
        // { path: 'list' , component: ProgramListComponent },
        // { path: 'update/:id', component: ProgramUpdateComponent }
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramRoutingModule { }
