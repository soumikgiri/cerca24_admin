import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { CompanyDeliveryZonesComponent } from './components/list.component';
import { CreateZoneComponent } from './components/create.component';
import { UpdateZoneComponent } from './components/update.component';


import { ZoneService } from './zone.service';

const routes: Routes = [
  {
    path: ':companyId/listing',
    component: CompanyDeliveryZonesComponent,
    data: {
      title: 'Manage Delivery Zones',
      urls: [{ title: 'Delivery Zones', url: '/zones' }, { title: 'Listing' }]
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot(),
    NgSelectModule
  ],
  declarations: [
    CompanyDeliveryZonesComponent,
    CreateZoneComponent,
    UpdateZoneComponent
  ],
  providers: [
    ZoneService
  ],
  exports: [],
  entryComponents: [
    CreateZoneComponent,
    UpdateZoneComponent
  ]
})
export class DeliveryZoneModule { }
