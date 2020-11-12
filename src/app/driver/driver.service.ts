import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DriverService {

  constructor(private restangular: Restangular) { }

  create(data: any): Promise<any> {
    return this.restangular.all('drivers').post(data).toPromise();
  }

  update(id, data: any): Promise<any> {
    return this.restangular.one('drivers', id).customPUT(data).toPromise();
  }

  search(params: any): Promise<any> {
    return this.restangular.one('drivers').get(params).toPromise();
  }

  findOne(id): Promise<any> {
    return this.restangular.one('drivers', id).get().toPromise();
  }
}
