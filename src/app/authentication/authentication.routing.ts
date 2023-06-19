import { Routes } from '@angular/router';

import { NotFoundComponent } from './404/not-found.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { Signup2Component } from './signup2/signup2.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {path: '404',component: NotFoundComponent},
      {path: 'login',component: LoginComponent},
      {path: 'signup',component: SignupComponent},
      {path: 'signup2',component: Signup2Component},
      {path: 'forgetPassword',component: ForgetPasswordComponent}
    ]
  }
];
