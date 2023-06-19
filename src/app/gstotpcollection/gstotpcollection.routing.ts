import { Routes } from '@angular/router';

import { GstuserComponent } from './gstuser/gstuser.component';
import {ThankyouComponent} from './thankyou/thankyou.component'



export const gstotpcollectionRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'gstuser/:loanRequestid/:mobileNumber/:retailerId/:userId/:retailerType',
        component: GstuserComponent
      },
      {
        path: 'thankyou/:name',
        component:ThankyouComponent
      }
    ]

},

]
    