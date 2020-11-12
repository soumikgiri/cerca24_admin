import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { LocationService } from '../../shared/services';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'product-create',
  templateUrl: './form.html',
  styles: [`.form-control-custom { width: 300px; }`]
})
export class ProductCreateComponent implements OnInit {
  public product: any = {
    name: '',
    description: '',
    specifications: [],
    mainImage: null,
    metaSeo: {
      keywords: '',
      description: ''
    },
    stockQuantity: 0,
    type: 'physical',
    categoryId: '',
    isActive: true,
    price: 0,
    salePrice: 0,
    vat: 0,
    restrictFreeShipAreas: [],
    restrictCODAreas: [],
    weight: 0,
    weightType: 'kg',
    volume: 0
  };
  public tree: any = [];
  public countries: any = [];
  public states: any = [];
  public cities: any = [];
  public zipCode: any = '';
  public freeCountry: any;
  public freeState: any;
  public freeCity: any;
  public newSpecification: any = {
    key: '',
    value: ''
  };
  public imageUrl: any = '';
  public images: any = [];
  public mainImage: any = '';
  public tab = 'info';
  public freeShipAreas: any = [];
  public restrictCODAreas: any = '';
  public dealDate: any;
  public imagesOptions: any = {
    multiple: true
  };
  public seller: any;
  public searching: any = false;
  public searchFailed: any = false;
  public fileOptions: any = {};
  // search seller
  formatter = (x: {
    name: string,
    owner: {
      name: string
    }
  }) => {
    if (x.owner.name) {
      x.name + ' (' + x.owner.name + ')';
    } else {
      x.name + ' (N/A)';
    }
  }
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.productService.findSeller({ name: term }).then((res) => {
          if (res) {
            this.searchFailed = false;
            this.searching = false;
            return res.data.items;
          }
          this.searchFailed = true;
          this.searching = false;
          return of([]);
        })
      )
    )

  constructor(private router: Router, private categoryService: ProductCategoryService,
    private productService: ProductService, private toasty: ToastyService, private location: LocationService) {
  }

  ngOnInit() {
    this.fileOptions = {
      url: window.appConfig.apiBaseUrl + '/media/files',
      onFinish: (resp) => {
        this.product.digitalFileId = resp.data._id;
      }
    };
    this.location.countries().then((resp) => {
      this.countries = resp.data;
    });

    this.categoryService.tree()
      .then(resp => (this.tree = this.categoryService.prettyPrint(resp.data)));

  }

  submit(frm: any) {
    if (frm.invalid) {
      return this.toasty.error('Invalid form, please check again.');
    }

    if (this.product.salePrice > this.product.price || this.product.salePrice < 0.1 || this.product.price < 0.1) {
      return this.toasty.error('Price or sale price is invalid.');
    }

    if (this.product.dailyDeal && this.dealDate) {
      this.product.dealTo = new Date(this.dealDate.year, this.dealDate.month - 1, this.dealDate.day).toUTCString();
    }

    if (!this.product.weight || this.product.weight < 0) {
      return this.toasty.error('Weight is invalid.')
    }

    if (!this.product.volume || this.product.volume < 0) {
      return this.toasty.error('Volume is invalid.')
    }

    this.freeShipAreas.forEach((item) => {
      const data = _.pick(item, ['areaType', 'value', 'name']);
      this.product.restrictFreeShipAreas.push(data);
    });
    this.product.images = this.images.map(i => i._id);
    this.product.mainImage = this.mainImage || null;

    if (this.seller) {
      this.product.shopId = this.seller._id;
    } else if (!this.seller) {
      return this.toasty.error('Please select Seller');
    }

    if (this.product.type === 'digital' && !this.product.digitalFileId) {
      return this.toasty.error('Please select Digital file path!');
    }

    if (!this.product.categoryId) {
      return this.toasty.error('Please select category!');
    }

    this.productService.create(this.product)
      .then(() => {
        this.toasty.success('Product has been created');
        this.router.navigate(['/products', { queryParams: { tab: 'spec' } }]);
      }, err => this.toasty.error(err.data.data.details[0].message || err.data.message || 'Something went wrong!'));
  }

  changeAlias() {
    this.product.alias = this.product.name.split(' ').join('-');;
  }

  addSpecification() {
    if (!this.newSpecification.value.trim()) {
      return this.toasty.error('Please enter specification value');
    }
    this.product.specifications.push(this.newSpecification);
    this.newSpecification = { key: '', value: '' };
  }

  selectImage(media: any) {
    // this.product.mainImage = media._id;
    // this.imageUrl = media.fileUrl;
    if (media.type !== 'photo') {
      return this.toasty.error('Please select image!');
    }

    this.images.push(media);
  }

  // selectDigital(media: any) {
  //   this.product.digitalFileId = media._id;
  // }

  setMain(media: any) {
    this.mainImage = media._id;
  }

  removeImage(media: any, index: any) {
    if (media._id === this.mainImage) {
      this.mainImage = null;
    }
    this.images.splice(index, 1);
  }

  changeTab(tab: string) {
    this.tab = tab;
  }

  // loadStates(COD: any) {
  //   this.location.states({ country: COD }).then((res) => {
  //     this.states = res.data;
  //   });
  // }

  // loadCities(id: any) {
  //   this.location.cities({ state: id }).then((res) => {
  //     this.cities = res.data;
  //   });
  // }

  // addFreeShipAreas() {
  //   if (this.zipCode) {
  //     const data = {
  //       areaType: 'zipcode',
  //       value: this.zipCode
  //     };
  //     this.freeShipAreas.push(data);
  //     this.zipCode = '';
  //   } else if (!this.zipCode && this.freeCountry && !this.freeState) {
  //     const data = {
  //       areaType: 'country',
  //       value: this.freeCountry.isoCode,
  //       name: this.freeCountry.name
  //     };
  //     this.freeShipAreas.push(data);
  //     this.freeCountry = {};
  //   } else if (!this.zipCode && this.freeCountry && this.freeState && !this.freeCity) {
  //     const data = {
  //       areaType: 'state',
  //       value: this.freeState._id,
  //       name: this.freeState.name
  //     };
  //     this.freeShipAreas.push(data);
  //     this.freeState = {};
  //   } else if (!this.zipCode && this.freeCountry && this.freeState && this.freeCity) {
  //     const data = {
  //       areaType: 'city',
  //       value: this.freeCity._id,
  //       name: this.freeCity.name
  //     };
  //     this.freeShipAreas.push(data);
  //     this.freeCity = {};
  //   }
  // }

  // addRestrictCODAreas() {
  //   if (this.restrictCODAreas) {
  //     this.product.restrictCODAreas.push(this.restrictCODAreas);
  //     this.restrictCODAreas = '';
  //   }
  // }

  // removeArea(index: number) {
  //   this.freeShipAreas.splice(index, 1);
  // }

  // removeCodeArea(index: number) {
  //   this.product.restrictCODAreas.splice(index, 1);
  // }

  removeSpec(i: number) {
    this.product.specifications.splice(i, 1);
  }
}
