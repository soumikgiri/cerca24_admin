import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { StarterComponent } from './starter.component';
import { StatCardComponent } from '../stats/statistic-card/stats-card.component';
import { LatestRequestCardComponent } from '../stats/latest-request-card/latest-request-card.component';
import { MediaModule } from '../media/media.module';

import { StatService } from '../shared/services';
import { SellerRequestPayoutService } from '../request-payout/services/seller-request.service';
import { DeliveryRequestPayoutService } from '../request-payout/services/delivery-request.service';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Dashboard',
    urls: [{ title: 'Dashboard', url: '/starter' }, { title: 'Admin dashboard' }]
  },
  component: StarterComponent
}];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    MediaModule
  ],
  declarations: [
    StarterComponent,
    StatCardComponent,
    LatestRequestCardComponent
  ],
  providers: [
    StatService,
    SellerRequestPayoutService,
    DeliveryRequestPayoutService
  ]
})
export class StarterModule { }
