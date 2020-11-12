import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  SellerSaleComponent,
  SellerPayoutComponent,
  DeliverySaleComponent,
  DeliveryPayoutComponent
} from './components';

const routes: Routes = [
  {
    path: 'seller/sales',
    component: SellerSaleComponent,
    data: {
      title: 'Seller Sales Management',
      urls: [{ title: 'Report' }, { title: 'Seller Sales' }]
    }
  },
  {
    path: 'seller/payout',
    component: SellerPayoutComponent,
    data: {
      title: 'Seller Payout Management',
      urls: [{ title: 'Report' }, { title: 'Seller Payout' }]
    }
  },
  {
    path: 'delivery/sales',
    component: DeliverySaleComponent,
    data: {
      title: 'Company Deliveries management',
      urls: [{ title: 'Report' }, { title: 'Company Deliveries' }]
    }
  },
  {
    path: 'delivery/payout',
    component: DeliveryPayoutComponent,
    data: {
      title: 'Company Payout management',
      urls: [{ title: 'Report' }, { title: 'Company Payout' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
