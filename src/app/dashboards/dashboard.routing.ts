import { Routes } from '@angular/router';
import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { Dashboard3Component } from './dashboard3/dashboard3.component';
import { BrandDetailsComponent } from './brand-details/brand-details.component';
import { MiscomponentComponent } from './miscomponent/miscomponent.component';
import { CohortComponent } from './cohort/cohort.component';
import { BrandDashboardComponent } from './brand-dashboard/brand-dashboard.component';
import { LenderDashboardComponent } from './lender-dashboard/lender-dashboard.component';
import { FinaggDashboardComponent } from './finagg-dashboard/finagg-dashboard.component';
import { StatusDetailsComponent } from './status-details/status-details.component';
import{DetailscreenComponent} from './detailscreen/detailscreen.component'
import {MylistComponent} from './mylist/mylist.component'
import { RegionalStatusComponent } from './regional-status/regional-status.component';


export const DashboardRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'finaggDashboard',
        component: FinaggDashboardComponent,
        data: {
          title: 'Dashboard Details',
          urls: [
            { title: 'finaggDashboard', url: '/finaggDashboard' },
            { title: 'Dashboard Details' }
          ]
        }
      },
      {
        path: 'brandDashboard',
        component: BrandDashboardComponent,
        data: {
          title: 'Dashboard Details',
          urls: [
            { title: 'brandDashboard', url: '/brandDashboard' },
            { title: 'Dashboard Details' }
          ]
        }
      },
      {
        path: 'lenderDashboard',
        component: LenderDashboardComponent,
        data: {
          title: 'Dashboard Details',
          urls: [
            { title: 'lenderDashboard', url: '/lenderDashboard' },
            { title: 'Dashboard Details' }
          ]
        }
      },
      {
        path: 'dashboard1',
        component: Dashboard1Component,
        data: {
          title: 'Dashboard Details',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Dashboard Details' }
          ]
        }
      },
      {
        path: 'dashboard2',
        component: Dashboard2Component,
        data: {
          title: 'Classic Dashboard',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Classic Dashboard' }
          ]
        }
      },
      {
        path: 'dashboard3',
        component: Dashboard3Component,
        data: {
          title: 'Analytical Dashboard',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Analytical Dashboard' }
          ]
        }
      },{
        path: 'Details',
        component: BrandDetailsComponent,
        data: {
          title: ' Details',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: ' Details' }
          ]
        }
      },{
        path: 'statusDetails',
        component: StatusDetailsComponent,
        data: {
          title: ' statusDetails',
          urls: [
            { title: 'Dashboard', url: '/statusDetails' },
            { title: ' statusDetails' }
          ]
        }
      }, {
        path: 'hulretailerscreen',
        component: DetailscreenComponent,
        data: {
          title: 'Hul Consent',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title:  'hulconsent' }
          ]
        }
      },
      {path:'Mylist',
      component:MylistComponent,
      data: {
        title: 'MyList',
        urls: [
          { title: 'MyList', url: '/Mylist' },
          { title: 'List' }
        ]
      }

      },
      {

        path:'Mylist/:loanrequestid',

        component:MylistComponent


      },
      {
        path:'MISReport',
        component:MiscomponentComponent,
       
        
      },
      {
        path:'Cohort',
        component:CohortComponent,
       
      },{
        path: 'regionalstatus',
        component: RegionalStatusComponent,
        data: {
          title: 'Regional Status',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Regional Status' }
          ]
        }
      }
    ]
  }
];
