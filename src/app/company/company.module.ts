import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CompanyRoutingModule } from './company.routing';
import { UtilsModule } from '../utils/utils.module';

import {
  CompanyService,
  CategoryService
} from './services';

import {
  CompanyListingComponent,
  CompanyUpdateComponent,
  CompanyCreateComponent
} from './components';

import { MediaModule } from '../media/media.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot(),
    MediaModule,
    CompanyRoutingModule,
    UtilsModule
  ],
  declarations: [
    CompanyListingComponent,
    CompanyUpdateComponent,
    CompanyCreateComponent,
  ],
  providers: [
    CompanyService,
    CategoryService
  ]
})
export class CompanyModule { }
