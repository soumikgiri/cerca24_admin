import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  SellerListingComponent,
  SellerViewComponent,
  DeliveryListingComponent,
  DeliveryViewComponent
} from './component';

import { SellerRequestPayoutService } from './services/seller-request.service';
import { DeliveryRequestPayoutService } from './services/delivery-request.service';
import { ProductService } from '../product/services/product.service';
import { CompanyService } from '../company/services';
import { RequestPayoutRoutingModule } from './request-payout.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RequestPayoutRoutingModule,
    NgbModule.forRoot()
  ],
  declarations: [
    SellerListingComponent,
    SellerViewComponent,
    DeliveryListingComponent,
    DeliveryViewComponent
  ],
  providers: [
    SellerRequestPayoutService,
    DeliveryRequestPayoutService,
    ProductService,
    CompanyService
  ],
  exports: []
})
export class RequestPayoutModule { }
