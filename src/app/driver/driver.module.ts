import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DriverService } from './driver.service';
import { CompanyService } from '../company/services/company.service';
import {
  ListingComponent,
  UpdateComponent,
  CreateComponent
} from './components';
import { MediaModule } from '../media/media.module';
import { UtilsModule } from '../utils/utils.module';


const routes: Routes = [
  {
    path: '',
    component: ListingComponent,
    data: {
      title: 'Drivers manager',
      urls: [{ title: 'Drivers', url: '/drivers' }, { title: 'Listing' }]
    }
  },
  {
    path: 'update/:id',
    component: UpdateComponent,
    data: {
      title: 'Drivers manager',
      urls: [{ title: 'Drivers', url: '/drivers' }, { title: 'Update Driver' }]
    }
  },
  {
    path: 'create',
    component: CreateComponent,
    data: {
      title: 'Drivers manager',
      urls: [{ title: 'Drivers', url: '/drivers' }, { title: 'Create Driver' }]
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot(),
    MediaModule,
    UtilsModule
  ],
  declarations: [
    ListingComponent,
    UpdateComponent,
    CreateComponent
  ],
  providers: [
    DriverService,
    CompanyService
  ]
})
export class DriverModule { }
