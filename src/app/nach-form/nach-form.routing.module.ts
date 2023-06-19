import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NachFormComponent } from './nach-form.component';
let routes:Routes=[
  {
    path: '', component: NachFormComponent,
    }
        // { path: 'add', component: ProgramAddComponent },
        // { path: 'details/:id', component: ProgramDetailsComponent },
        // { path: 'list' , component: ProgramListComponent },
        // { path: 'update/:id', component: ProgramUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NachRoutingModule { }
