import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';

@Injectable()
export class CategoryService {
  private allowFields = [
    'name', 'description', 'ordering', 'parentId', 'mainImage',
    'specifications', 'chemicalIdentifiers', 'metaSeo'
  ];
  constructor(private restangular: Restangular) { }

  tree(companyId: string): Promise<any> {
    return this.restangular.one('companies/delivery/categories/tree', companyId).get().toPromise();
  }

  prettyPrint(tree: any, char: string = '', results: any = []) {
    tree.forEach(item => {
      item.name = `${char}${item.name}`;
      results.push(item);
      if (item.children && item.children.length) {
        this.prettyPrint(item.children, `${char}__`, results);
      }
    });
    return results;
  }
}
