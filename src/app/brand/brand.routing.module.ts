import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrandComponent } from './brand.component';
import {BrandupdateComponent} from './brandupdate/brandupdate.component'
import { BulkUploadComponent } from './bulk-upload/bulk-upload.component';
import { BeneDetailsCheckerComponent } from './bene-details-checker/bene-details-checker.component';
import { BeneDetailsAdderComponent } from './bene-details-adder/bene-details-adder.component';


let routes:Routes=[
  {  
    path: '', 
    children: [

        {
          path: 'nodes',
          component: BrandComponent,
          data: {
            title: 'Brand Nodes',
            urls: [
              { title: 'Nodes', url: '/nodes' },
              { title: 'List' }
            ]
          }
        },
        {
          path: 'update/:orgId',
          component:BrandupdateComponent,
        },
        {
          path: 'bulkupload',
          component:BulkUploadComponent,
          data: {
            title: 'Sourcing Partner',
            urls: [
              { title: 'Sourcing Partner', url: '' },
              { title: 'Bulk Upload' }
            ]
          }
        },
        {path: 'saved/:orgId',component:BrandComponent,},
        {path: 'benechecker',component:BeneDetailsCheckerComponent,},
        {path: 'benedetails',component:BeneDetailsAdderComponent, 
        data: {
          title: 'Operation',
          urls: [
            { title: 'Operation', url: '' },
            { title: 'Beneficiary Detail' }
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
export class BrandRoutingModule { }
