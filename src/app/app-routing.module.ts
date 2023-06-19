import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';


export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {path: '', redirectTo: '/authentication/login', pathMatch: 'full' },
      {path: 'upload', loadChildren: () => import('./upload/upload.module').then(m => m.UploadModule) },
      {path: 'invoice', loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule) },
      {path: 'report', loadChildren: () => import('./report/report.module').then(m => m.ReportModule) },
      {path: 'gst', loadChildren: () => import('./gst/gst.module').then(m => m.GstModule) },
      {path: 'camgstreport', loadChildren: () => import('./camgstreport/gstreport.module').then(m => m.GstreportModule) },
      {path: 'leads', loadChildren: () => import('./leads/leads.module').then(m => m.LeadsModule) },
      {path: 'brand', loadChildren: () => import('./brand/brand.module').then(m => m.BrandModule) },
      {path: 'master', loadChildren: () => import('./master/master.module').then(m => m.MasterModule) },
      {path: 'lender', loadChildren: () => import('./lender/lender.module').then(m => m.LenderModule) },
      {path: 'sourcing', loadChildren: () => import('./sourcing/sourcing.module').then(m => m.SourcingModule) },
      {path: 'rules',loadChildren: () => import('./rules/rules.module').then(m => m.RulesModule)},
      {path: 'program',loadChildren: () => import('./program/program.module').then(m => m.ProgramModule)},
      {path: 'collection', loadChildren: () => import('./collection/collection.module').then(m => m.CollectionModule) },
      {path: 'user', loadChildren: () => import('./finagg-user/finagg-user.module').then(m => m.FinaggUserModule) },
      {path: 'nach', loadChildren: () => import('./nach-form/nach-form.module').then(m => m.NachModule) },
      {path: 'dashboard',loadChildren: () => import('./dashboards/dashboard.module').then(m => m.DashboardModule)},
      {path: 'gst', loadChildren: () => import('./gst/gst.module').then(m => m.GstModule)},
      {path: 'disbursal', loadChildren: () => import('./ugro/ugro.module').then(m => m.UgroModule) },
      {path:'new-lead',loadChildren:'./applynow/applynow.module#ApplynowModule'},
      {path:'internaldashboard',loadChildren:()=>import('./internaldashboard/internaldashboard.module').then(m=>m.InternaldashboardModule)},
      {path:'recon',loadChildren:()=>import('./recon/recon.module').then(m=>m.ReconModule)},
      {path:'view',loadChildren:()=>import('./customer/customer.module').then(m=>m.CustomerModule)},
      {path:'payment',loadChildren:()=>import('./payment/payment.module').then(m=>m.PaymentModule)},
      { path: 'newmenu', loadChildren: () => import('./newmenu/newmenu.module').then(m => m.NewmenuModule) },
      {path:'Dataanalytics',loadChildren:()=>import('./data-analytics/data-analytics.module').then(m=>m.DataAnalyticsModule)},
      {path:'udyam',loadChildren:()=>import('./udhyam/udhyam.module').then(m=>m.UdhyamModule)},
    ]
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {path: 'authentication',loadChildren:() => import('./authentication/authentication.module').then(m => m.AuthenticationModule)},
      {path: 'sso',loadChildren:() => import('./sso/sso.module').then(m => m.ssoModule)},
      {path : 'notification',loadChildren:() => import('./notification/notification.module').then(m => m.NotificationModule)},
      {path: 'gstotpcollection',loadChildren:()=> import('./gstotpcollection/gstotpcollection.module').then(m => m.GstotpcollectionModule)},
      {path: 'newlead',loadChildren:'./applynow/applynow.module#ApplynowModule'},
      {path: 'shared',loadChildren:()=> import('./shared/shared.module').then(m => m.SharedModule)},
  ]
  }, 
  {path: 'orderinvoice',loadChildren:'./orderinvoice/orderinvoice.module#OrderinvoiceModule'},
  {path: '**',redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgbModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
