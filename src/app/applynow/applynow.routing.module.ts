import { Routes } from '@angular/router';

import { LoginnowComponent } from './loginnow/loginnow.component';
import { OtpnowComponent } from './otpnow/otpnow.component';
import { DetailsnowComponent } from './detailsnow/detailsnow.component';
import { ThankyouleadComponent } from './thankyoulead/thankyoulead.component';



export const applynowRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'loginnow',
        component: LoginnowComponent
      },
      {
        path: 'otpnow',
        component:OtpnowComponent
      },
      {
          path:'detailsnow',
          component:DetailsnowComponent
      },
      {
        path:'thankyou',
        component:ThankyouleadComponent
      }
    ]

},

]