import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReportRoutingModule } from './report.routing';

import {
  SellerSaleComponent,
  SellerPayoutComponent,
  DeliverySaleComponent,
  DeliveryPayoutComponent
} from './components';

import { ReportSaleService } from './report.service';
import { ShopService } from '../shop/services/shop.service';
import { CompanyService } from '../company/services';
import { SellerRequestPayoutService } from '../request-payout/services/seller-request.service';
import { DeliveryRequestPayoutService } from '../request-payout/services/delivery-request.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    //our custom module
    ReportRoutingModule,
    NgbModule.forRoot()
  ],
  declarations: [
    SellerSaleComponent,
    SellerPayoutComponent,
    DeliveryPayoutComponent,
    DeliverySaleComponent
  ],
  providers: [
    ReportSaleService,
    ShopService,
    SellerRequestPayoutService,
    CompanyService,
    DeliveryRequestPayoutService
  ],
  exports: []
})
export class ReportModule { }
