import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  CompanyListingComponent,
  CompanyUpdateComponent,
  CompanyCreateComponent
} from './components';

const routes: Routes = [
  {
    path: '',
    component: CompanyListingComponent,
    data: {
      title: 'Companies manager',
      urls: [{ title: 'Companies', url: '/companies' }, { title: 'Listing' }]
    }
  },
  {
    path: 'update/:id',
    component: CompanyUpdateComponent,
    data: {
      title: 'Companies manager',
      urls: [{ title: 'Companies', url: '/companies' }, { title: 'Update Company' }]
    }
  },
  {
    path: 'create',
    component: CompanyCreateComponent,
    data: {
      title: 'Companies manager',
      urls: [{ title: 'Companies', url: '/companies' }, { title: 'Create Company' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
