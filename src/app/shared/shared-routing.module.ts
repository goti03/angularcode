import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


let routes:Routes=[]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SharedRoutingModule { }
