

    
    import { NgModule } from '@angular/core';
    import { Routes, RouterModule } from '@angular/router';
    import { CustomerDataComponent } from './customer-data/customer-data.component';
    import { Transaction1Component } from './transaction1/transaction1.component';
    import { Transaction2Component } from './transaction2/transaction2.component';

    const routes: Routes = [
    
      {
        path: '',
        children: [
          {
            path: 'customerdata',component:CustomerDataComponent,
            data: {
              title: 'CustomerData',
              urls: [
                { title: 'customer Data', url: '/customerdata' },
              
              ]
            }
          },
          {
            path: 'transaction1data',component:Transaction1Component,
            data: {
              title: 'Transaction Data1',
              urls: [
                { title: 'Transaction Data1', url: '/transaction1data' },
                
              ]
            }
          },
          {
            path: 'transaction2data',component:Transaction2Component,
            data: {
              title: 'Transaction Data2',
              urls: [
                { title: 'Transaction Data2', url: '/transaction2data' },
                
              ]
            }
          }
    
        ]
      }
    ];
    
    @NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    })
    export class DataAnalyticsRoutingModule { }
    
    