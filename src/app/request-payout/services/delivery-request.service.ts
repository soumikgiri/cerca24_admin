import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DeliveryRequestPayoutService {
  constructor(private restangular: Restangular) { }

  getBalance(): Promise<any> {
    return this.restangular.one('delivery/balance').get().toPromise();
  }

  search(params: any): Promise<any> {
    return this.restangular.one('delivery/payout/requests').get(params).toPromise();
  }

  reject(id, data): Promise<any> {
    return this.restangular.one('delivery/payout/request', id).one('reject').customPOST(data).toPromise();
  }

  approve(id, data): Promise<any> {
    return this.restangular.one('delivery/payout/request', id).one('approve').customPOST(data).toPromise();
  }

  findOne(id): Promise<any> {
    return this.restangular.one('delivery/payout/requests', id).get().toPromise();
  }

  stats(params): Promise<any> {
    return this.restangular.one('delivery/stats').get(params).toPromise();
  }

  companyBalance(companyId: string): Promise<any> {
    return this.restangular.one(`delivery/balance/${companyId}`).get().toPromise();
  }
}
