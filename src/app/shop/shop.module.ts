import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShopRoutingModule } from './shop.routing';

import { MediaModule } from '../media/media.module';
import { NgSelectModule } from '@ng-select/ng-select';

import {
  ShopListingComponent,
  ShopCreateComponent,
  ShopUpdateComponent,
  ShopBasicInfoComponent,
  ShopBusinessInfoComponent,
  ShopNotificationInfoComponent,
  ShopShippingInfoComponent,
  ShopSocialInfoComponent,
  CouponsComponent,
  ShopBankInfoComponent
} from './component';

import { ShopService } from './services/shop.service';
import { CouponService } from './services/coupon.service';
import { UserService } from '../user/user.service';
import { LocationService } from './../shared/services';
import { UtilsModule } from '../utils/utils.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // our custom module
    ShopRoutingModule,
    NgbModule.forRoot(),
    MediaModule,
    NgSelectModule,
    UtilsModule
  ],
  declarations: [
    ShopListingComponent,
    ShopCreateComponent,
    ShopUpdateComponent,
    ShopBasicInfoComponent,
    ShopBusinessInfoComponent,
    ShopNotificationInfoComponent,
    ShopShippingInfoComponent,
    ShopSocialInfoComponent,
    CouponsComponent, ShopBankInfoComponent
  ],
  providers: [ShopService, UserService, CouponService, LocationService],
  exports: [
    ShopListingComponent,
    ShopCreateComponent,
    ShopUpdateComponent,
    ShopBasicInfoComponent,
    ShopBusinessInfoComponent,
    ShopNotificationInfoComponent,
    ShopShippingInfoComponent,
    ShopSocialInfoComponent,
    CouponsComponent, ShopBankInfoComponent
  ]
})
export class ShopModule { }
