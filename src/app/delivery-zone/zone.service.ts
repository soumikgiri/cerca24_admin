import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ZoneService {

  constructor(private restangular: Restangular) { }

  create(data: any): Promise<any> {
    return this.restangular.all('companies/delivery/zones').post(data).toPromise();
  }

  update(id, data: any): Promise<any> {
    return this.restangular.one('companies/delivery/zones', id).customPUT(data).toPromise();
  }

  search(params: any): Promise<any> {
    return this.restangular.one('companies/delivery/zones').get(params).toPromise();
  }


  remove(id): Promise<any> {
    return this.restangular.one('companies/delivery/zones', id).customDELETE().toPromise();
  }
}
