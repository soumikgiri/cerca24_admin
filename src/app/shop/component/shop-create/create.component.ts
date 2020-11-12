import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { UserService } from '../../../user/user.service';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';
import { LocationService } from '../../../shared/services';
import * as _ from 'lodash';

@Component({
  selector: 'shop-create',
  templateUrl: './form.html'
})
export class ShopCreateComponent implements OnInit {

  public isSubmitted = false;
  public shop: any = {};
  public verificationIssue: any = {};
  public owner: any;
  public searching: any = false;
  public searchFailed: any = false;
  public dialCode: any = '+260';
  public phone: any = {
    number: ''
  };
  public cities: any = [];
  public citySelected: any = {
    areas: []
  };

  formatter = (x: { name: string, email: string }) => x.name + ' (' + x.email + ' )';
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.userService.search({ name: term, isShop: 0 }).then((res) => {
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

  constructor(
    private router: Router,
    private shopService: ShopService,
    private userService: UserService,
    private toasty: ToastyService,
    private locationService: LocationService
  ) {
    this.cities = this.locationService.getCitiesZambia();
    this.shop.city = this.cities[0].name;
    this.shop.area = this.cities[0].areas[0];
    this.cityChange(this.shop.city);
  }

  ngOnInit() {
  }

  submit(frm: any) {
    this.isSubmitted = true;
    if (!frm.valid) {
      return this.toasty.error('Invalid form, please check and try again!');
    }
    if (this.owner) {
      this.shop.ownerId = this.owner._id;
    } else if (!this.owner || !this.shop.ownerId) {
      return this.toasty.error('Please select Owner');
    }
    if (!this.shop.verificationIssueId) {
      return this.toasty.error('Please select verification Issue');
    }
    this.shopService.create(this.shop).then(resp => {
      this.toasty.success('Created successfuly!');
      this.router.navigate(['/shops/update', resp.data._id]);
    })
      .catch((err) => this.toasty.error(err.data.data.message));
  }

  selectVerificationIssue(data: any) {
    this.shop.verificationIssueId = data._id;
    this.verificationIssue = data;
  }

  selectDial(event) {
    this.dialCode = event;
  }

  inputPhone() {
    this.shop.phoneNumber = `${this.dialCode}${this.phone.number}`;
  }

  cityChange(city: any) {
    this.citySelected = _.find(this.cities, { 'name': city });
    this.shop.area = this.citySelected.areas[0];
  }
}
