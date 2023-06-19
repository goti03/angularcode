import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './upload.component';
import { UploadAddComponent } from './upload-add/upload-add.component';

let routes:Routes=[
  {
    path: '', component: UploadComponent,
    children: [
      { path: '', redirectTo: 'add', pathMatch: 'full' },
      {
        path: 'add',
        component: UploadAddComponent,
        data: {
          title: 'Sourcing Partner',
          urls: [
            { title: 'Sourcing Partner', url: '/upload' },
            { title: 'Upload' }
          ]
        }
      }
        // { path: 'add', component: UploadAddComponent }
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule { }
