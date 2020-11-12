import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  SellerListingComponent,
  SellerViewComponent,
  DeliveryListingComponent,
  DeliveryViewComponent
} from './component';

const routes: Routes = [{
  path: 'seller',
  component: SellerListingComponent,
  data: {
    title: 'Seller Request Payout Manager',
    urls: [{ title: 'Seller Requests Payout' }]
  }
},
{
  path: 'seller/:id',
  component: SellerViewComponent,
  data: {
    title: 'Seller Request Payout Manager',
    urls: [{ title: 'Seller Request Payout' }]
  }
}, {
  path: 'delivery',
  component: DeliveryListingComponent,
  data: {
    title: 'Delivery Request Payout Manager',
    urls: [{ title: 'Delivery Requests Payout' }]
  }
},
{
  path: 'delivery/:id',
  component: DeliveryViewComponent,
  data: {
    title: 'Delivery Request Payout Manager',
    urls: [{ title: 'Delivery Request Payout' }]
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestPayoutRoutingModule { }
