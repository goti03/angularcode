import { Routes } from '@angular/router';

import { Interdashboard1Component } from './interdashboard1/interdashboard1.component';

import { Interdashboard2Component } from './interdashboard2/interdashboard2.component';
import { Subdashboard1Component } from './subdashboard1/subdashboard1.component';
import { Subdashboard2Component } from './subdashboard2/subdashboard2.component';


export const InternalcollectionRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard1',
        component: Interdashboard1Component
      },
      {
        path: `dashboard2`,
        component:Interdashboard2Component
      },
      {
          path:`subdashboard1`,
          component:Subdashboard1Component
      },
      {
          path:'subdashboard2',
          component:Subdashboard2Component
      }
    ]

},

]
   