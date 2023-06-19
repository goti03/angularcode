import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RulesComponent } from './rules.component';
import { RulesAddComponent } from './rules-add/rules-add.component';
import { RuleListComponent } from './rules-list/rules-list.component';
import { RulesDetailsComponent } from './rules-details/rules-details.component';
import { RulesUpdateComponent } from './rules-update/rules-update.component';


let routes:Routes=[
  {
    path: '', component: RulesComponent,
    children: [
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        {
          path: 'add',
          component: RulesAddComponent,
          data: {
            title: 'Rules',
            urls: [
              { title: 'Rules', url: '/rules' },
              { title: 'Add' }
            ]
          }
        },
        {
          path: 'list',
          component: RuleListComponent,
          data: {
            title: 'Rules',
            urls: [
              { title: 'Rules', url: '/rules' },
              { title: 'List' }
            ]
          }
        },
        {
          path: 'details/:id',
          component: RulesDetailsComponent,
          data: {
            title: 'Rules',
            urls: [
              { title: 'Rules', url: '/rules' },
              { title: 'Details' }
            ]
          }
        },
        {
          path: 'update/:id',
          component: RulesUpdateComponent,
          data: {
            title: 'Rules',
            urls: [
              { title: 'Rules', url: '/rules' },
              { title: 'Update' }
            ]
          }
        }
        // { path: 'add', component: RulesAddComponent },
        // { path: 'list', component: RuleListComponent },
        // { path: 'details/:id', component: RulesDetailsComponent },
        // { path: 'update/:id', component: RulesUpdateComponent },
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RulesRoutingModule { }
