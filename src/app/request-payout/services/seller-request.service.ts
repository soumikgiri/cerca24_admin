import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SellerRequestPayoutService {
  constructor(private restangular: Restangular) { }

  getBalance(): Promise<any> {
    return this.restangular.one('payout/balance').get().toPromise();
  }

  search(params: any): Promise<any> {
    return this.restangular.one('payout/requests').get(params).toPromise();
  }

  create(data): Promise<any> {
    return this.restangular.all('payout/request').post(data).toPromise();
  }

  reject(id, data): Promise<any> {
    return this.restangular.one('payout/request', id).one('reject').customPOST(data).toPromise();
  }

  approve(id, data): Promise<any> {
    return this.restangular.one('payout/request', id).one('approve').customPOST(data).toPromise();
  }

  findOne(id): Promise<any> {
    return this.restangular.one('payout/requests', id).get().toPromise();
  }

  stats(params): Promise<any> {
    return this.restangular.one('payout/stats').get(params).toPromise();
  }

  shopBalance(shopId: string): Promise<any> {
    return this.restangular.one(`payout/balance/${shopId}`).get().toPromise();
  }

  export(params: any): Promise<any> {
    return this.restangular.one('payout/requests/export/csv').get(params).toPromise();
  }
}
