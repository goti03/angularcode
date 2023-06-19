import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinaggUserComponent } from './finagg-user.component';
import { UserAddComponent } from './user-add/user-add.component';

let routes:Routes=[
  {  path: 'user', component: FinaggUserComponent,
    data: {
      title: 'Operation',
      urls: [
        { title: 'Operation', url: 'user' },
        { title: 'User' }
      ]
    }
  },  
  {  path: 'adduser', component: UserAddComponent}  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinaggUserRoutingModule { }
