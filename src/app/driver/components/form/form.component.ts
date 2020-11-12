import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { DriverService } from '../../driver.service';
import { CompanyService } from '../../../company/services/company.service';
import { AuthService, LocationService } from '../../../shared/services';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'driver-create',
  templateUrl: './form.html'
})
export class CreateComponent implements OnInit {

  public isSubmitted = false;
  public isUpdate: boolean = false;
  public driver: any = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phoneNumber: '',
    city: '',
    state: '',
    country: 'Zambia',
    zipcode: '',
    companyId: '',
    activated: true,
    emailVerified: true
  };
  public searching: any = false;
  public searchFailed: any = false;
  public company: any;
  public dialCode: any = '+260';
  public phone: any = {
    number: ''
  };
  public cities: any = [];
  public citySelected: any = {
    areas: []
  };

  formatter = (x: { name: string, email: string }) => x.name + ' (' + x.email + ')';
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.companyService.search({ name: term }).then((res) => {
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
    private toasty: ToastyService,
    private driverService: DriverService,
    private companyService: CompanyService,
    private locationService: LocationService
  ) {
    this.cities = this.locationService.getCitiesZambia();
    this.driver.city = this.cities[0].name;
    this.driver.state = this.cities[0].areas[0];
    this.cityChange(this.driver.city);
  }

  ngOnInit() {
  }

  submit(frm: any) {
    this.isSubmitted = true;
    if (!frm.valid) {
      return this.toasty.error('Invalid form, please check and try again!');
    }
    if (this.company) {
      this.driver.companyId = this.company._id;
    }
    this.driverService.create(this.driver).then(() => {
      this.toasty.success('Created successfuly!');
      this.router.navigate(['/drivers']);
    })
      .catch((err) => this.toasty.error(err.data.message));
  }

  selectDial(event) {
    this.dialCode = event;
  }

  inputPhone() {
    this.driver.phoneNumber = `${this.dialCode}${this.phone.number}`;
  }

  cityChange(city: any) {
    this.citySelected = _.find(this.cities, { 'name': city });
    this.driver.state = this.citySelected.areas[0];
  }
}

@Component({
  selector: 'driver-update',
  templateUrl: './form.html'
})
export class UpdateComponent implements OnInit {

  public isSubmitted = false;
  public driver: any = {};
  public isUpdate: boolean = true;
  public avatarOptions: any = {};
  public searching: any = false;
  public searchFailed: any = false;
  public dialCode: any = '+260';
  public phone: any = {
    number: ''
  };
  public dialCodes: any = [];
  public cities: any = [];
  public citySelected: any = {
    areas: []
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toasty: ToastyService,
    private driverService: DriverService,
    private authService: AuthService,
    private locationService: LocationService
  ) {
    this.cities = this.locationService.getCitiesZambia();
    const id = this.route.snapshot.paramMap.get('id');
    this.avatarOptions = {
      url: window.appConfig.apiBaseUrl + '/drivers/' + id + '/avatar',
      fileFieldName: 'avatar',
      onFinish: resp => this.driver.avatarUrl = resp.data.url
    }
    this.driverService.findOne(id)
      .then(resp => {
        this.driver = resp.data;
        this.cityChange(this.driver.city);

        this.driver.companyName = resp.data.company.name;
        if (resp.data.phoneNumber) {
          this.trackDial(resp.data.phoneNumber);
        }
      });
  }

  ngOnInit() {
    this.dialCodes = this.authService.getDialCodes();
  }

  submit(frm: any) {
    this.isSubmitted = true;
    if (!frm.valid) {
      return this.toasty.error('Invalid form, please check and try again!');
    }

    const data = _.pick(this.driver, [
      'name', 'email', 'address',
      'phoneNumber', 'city', 'state',
      'country', 'emailVerified', 'activated',
      'password'
    ]);
    this.driverService.update(this.driver._id, data).then(resp => {
      this.toasty.success('Updated successfuly!');
    }).catch(() => this.toasty.error('Something went wrong, please check and try again!'));
  }

  selectDial(event) {
    this.dialCode = event;
  }

  inputPhone() {
    this.driver.phoneNumber = `${this.dialCode}${this.phone.number}`;
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

  cityChange(city: any) {
    this.citySelected = _.find(this.cities, { 'name': city });
  }

  swipe(url: string) {
    if (url) {
      let h = window.screen.availHeight;
      let w = window.screen.availWidth
      window.open(url, 'Image', 'width=' + w + ',height=' + h + ',resizable=1');
    } else {
      return this.toasty.error('Image is not available');
    }
  }
}
