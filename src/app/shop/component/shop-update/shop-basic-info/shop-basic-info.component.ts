import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ShopService } from '../../../services/shop.service';
import { LocationService, AuthService } from '../../../../shared/services';
import * as _ from 'lodash';

@Component({
  selector: 'shop-basic-info',
  templateUrl: './shop-basic-info.html'
})
export class ShopBasicInfoComponent implements OnInit, OnChanges {
  @Input() shop: any;
  public isSubmitted = false;
  // public countries: any = [];
  public dialCode: any = '+260';
  public phone: any = {
    number: ''
  };
  public dialCodes: any = [];
  public cities: any = [];
  public citySelected: any = {
    areas: []
  };
  public newPickUpAddress: any = {
    street: '',
    city: '',
    area: ''
  };
  public pickUpCitySelected: any = {
    areas: []
  };

  constructor(
    private toasty: ToastyService,
    private shopService: ShopService,
    private locationService: LocationService,
    private authService: AuthService
  ) {
    this.cities = this.locationService.getCitiesZambia();
  }

  ngOnChanges() {
    if (this.shop.phoneNumber) {
      this.trackDial(this.shop.phoneNumber);
    }
    if (this.shop.city) {
      this.cityChange(this.shop.city, 'address');
    }
  }

  ngOnInit() {
    this.dialCodes = this.authService.getDialCodes();
    // this.locationService.countries().then(res => this.countries = res.data);
  }
  submit(frm: any) {
    this.isSubmitted = true;
    if (!frm.valid) {
      return this.toasty.error('Invalid form, please check and try again!');
    }
    const data = _.pick(this.shop, ['name', 'alias', 'address', 'city', 'state', 'country', 'zipcode',
      'email', 'featured', 'doCOD', 'phoneNumber', 'logoId', 'verificationIssueId', 'bannerId', 'pickUpAddress',
      'headerText', 'gaCode', 'announcement', 'activated', 'verified', 'pickUpAtStore', 'commission',
      'vatRegistrationNumber', 'tpinNumber', 'returnAddress']);

    this.shopService.update(this.shop.id, data).then(resp => {
      this.toasty.success('Updated successfuly!');
    }).catch((err) => this.toasty.error(err.data.data.message));
  }
  selectLogo(data: any) {
    this.shop.logoId = data._id;
    this.shop.logo = data;
  }
  selectVerificationIssue(data: any) {
    this.shop.verificationIssueId = data._id;
    this.shop.verificationIssue = data;
  }
  selectBanner(data: any) {
    this.shop.bannerId = data._id;
    this.shop.banner = data;
  }

  addTag(label) {
    return { label: label, tag: true };
  }

  selectDial(event) {
    this.dialCode = event;
  }

  inputPhone() {
    this.shop.phoneNumber = `${this.dialCode}${this.phone.number}`;
  }

  trackDial(string: any) {
    const validDials = this.dialCodes.filter(d => d.dialCode);
    validDials.forEach(d => {
      const i = string.indexOf(d.dialCode);
      if (i > -1) {
        const p = string.split(d.dialCode);
        this.dialCode = d.dialCode;
        this.phone.number = p[1];
      }
    });
  }

  cityChange(city: any, type: string) {
    if (type === 'address') {
      this.citySelected = _.find(this.cities, { 'name': city });
      if (this.citySelected.areas && this.citySelected.areas.length && !this.shop.area) {
        this.shop.area = this.citySelected.areas[0];
      }
    }

    if (type === 'pickup') {
      this.pickUpCitySelected = _.find(this.cities, { 'name': city });
      if (this.pickUpCitySelected.areas && this.pickUpCitySelected.areas.length && !this.shop.area) {
        this.newPickUpAddress.area = this.pickUpCitySelected.areas[0];
      }
    }
  }

  addNewPickUpAddress() {
    this.shop.pickUpAddress.unshift(this.newPickUpAddress);
    this.newPickUpAddress = {
      street: '',
      city: '',
      area: ''
    };
  }

  removePickUpAddress(index: number) {
    if (confirm('Are you sure?')) {
      this.shop.pickUpAddress.splice(index, 1);
    }
  }

  swipe(url: string) {
    console.log(url)
    if (url) {
      let h = window.screen.availHeight;
      let w = window.screen.availWidth
      window.open(url, 'Image', 'width=' + w + ',height=' + h + ',resizable=1');
    } else {
      return this.toasty.error('Image is not available');
    }
  }
}
