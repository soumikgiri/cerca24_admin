import { Component, OnInit } from '@angular/core';
import { StatService } from '../shared/services';
import { SellerRequestPayoutService } from '../request-payout/services/seller-request.service';
import { DeliveryRequestPayoutService } from '../request-payout/services/delivery-request.service';

@Component({
  templateUrl: './starter.component.html'
})
export class StarterComponent implements OnInit {

  public shopStat: any = {};
  public userStat: any = {};
  public productStat: any = {};
  public orderStat: any = {};
  public sellerRequestPayout: any = [];
  public deliveryRequestPayout: any = [];

  constructor(
    private statService: StatService,
    private sellerRequestPayoutService: SellerRequestPayoutService,
    private deliveryRequestPayoutService: DeliveryRequestPayoutService
  ) { }

  ngOnInit() {
    // *! statistic
    this.statService.shopStat().then(res => this.shopStat = res.data);
    this.statService.userStat().then(res => this.userStat = res.data);
    this.statService.prodStat().then(res => this.productStat = res.data);
    this.statService.orderStat().then(res => this.orderStat = res.data);

    // *! request payout
    this.sellerRequestPayoutService.search({ take: 5 }).then(resp => this.sellerRequestPayout = resp.data.items);
    this.deliveryRequestPayoutService.search({ take: 5 }).then(resp => this.deliveryRequestPayout = resp.data.items);
  }
}
