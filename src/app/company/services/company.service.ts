import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CompanyService {

  constructor(private restangular: Restangular) { }

  create(data: any): Promise<any> {
    return this.restangular.all('companies/register').post(data).toPromise();
  }

  update(id, data: any): Promise<any> {
    return this.restangular.one('companies', id).customPUT(data).toPromise();
  }

  search(params: any): Promise<any> {
    return this.restangular.one('companies').get(params).toPromise();
  }

  findOne(id): Promise<any> {
    return this.restangular.one('companies', id).get().toPromise();
  }
}
