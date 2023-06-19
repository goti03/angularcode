import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SourcingComponent } from './sourcing.component';
import { SourcingAddComponent } from './sourcing-add/sourcing-add.component';
import { SourcingDetailsComponent } from './sourcing-details/sourcing-details.component';
import { SourcingListComponent } from './sourcing-list/sourcing-list.component';
import { SourcingUpdateComponent } from './sourcing-update/sourcing-update.component';
import { UploadExcelComponent } from './sourcing-updateExcel/sourcing-updateExcel.component';
import { UploadEamilComponent } from './email-trigger/email-trigger.component';
import { EmailListComponent } from './email-list/email-list.component';
import { DistanceAnalysisComponent } from './distance-analysis/distance-analysis.component';
import { PartnerLinkComponent } from './partner-link/partner-link.component';


let routes:Routes=[
  {
    path: '', component: SourcingComponent,
    children: [
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        {
          path: 'add',
          component: SourcingAddComponent,
          data: {
            title: 'Sourcing',
            urls: [
              { title: 'Sourcing', url: '/sourcing' },
              { title: 'Add' }
            ]
          }
        },
        {
          path: 'details/:id',
          component: SourcingDetailsComponent,
          data: {
            title: 'Sourcing',
            urls: [
              { title: 'Sourcing', url: '/sourcing' },
              { title: 'Details' }
            ]
          }
        },
        {
          path: 'list',
          component: SourcingListComponent,
          data: {
            title: 'Sourcing',
            urls: [
              { title: 'Sourcing', url: '/sourcing' },
              { title: 'List' }
            ]
          }
        },
        {
          path: 'update/:id',
          component: SourcingUpdateComponent,
          data: {
            title: 'Sourcing',
            urls: [
              { title: 'Sourcing', url: '/sourcing' },
              { title: 'Brand Data Upload' }
            ]
          }
         }
        //  ,{
        //   path: 'updateExcel',
        //   component: UploadExcelComponent,
        //   data: {
        //     title: 'Sourcing',
        //     urls: [
        //       { title: 'Sourcing', url: '/sourcing' },
        //       { title: 'updateExcel' }
        //     ]
        //   }
        // }
,
         { path: 'updateExcel', component: UploadExcelComponent,
          data: {
            title: 'Sourcing',
            urls: [
              { title: 'Sourcing', url: '/sourcing' },
              { title: 'Supplier Upload' }
            ]
          }
         },
         { path: 'clickReport', component: EmailListComponent,
          data: {
            title: 'Sales',
            urls: [
              { title: 'Sales', url: '/sourcing' },
              { title: 'Email Excel' }
            ]
          } 
        },
         { path: 'updateEmail', component: UploadEamilComponent,
          // data: {
          //   title: 'Sales',
          //   urls: [
          //     { title: 'Sales', url: '/sourcing' },
          //     { title: 'Email Excel' }
          //   ]
          // } 
        },
         { path: 'distanceAnalysis', component: DistanceAnalysisComponent,
         data: {
          title: 'Sourcing Partner',
          urls: [
            { title: 'Sourcing Partner', url: '' },
            { title: 'Merchant Analysis' }
          ]
        }
         },
         { path: 'partner', component: PartnerLinkComponent },
           // { path: 'details/:id', component: SourcingDetailsComponent },
        // { path: 'list' , component: SourcingListComponent },
        // { path: 'update/:id', component: SourcingUpdateComponent }
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SourcingRoutingModule { }
