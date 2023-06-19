import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewmenuComponent } from './newmenu.component';

const routes: Routes = [
  {
    path: '', component: NewmenuComponent,
    data: {
      title: 'Menu',
      urls: [
        { title: 'Menu', url: '/menu' },
      ]
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewmenuRoutingModule { }
