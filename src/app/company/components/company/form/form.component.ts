import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { CompanyService, CategoryService } from '../../../services';
import { AuthService, LocationService } from '../../../../shared/services';
import * as _ from 'lodash';

@Component({
  selector: 'company-create',
  templateUrl: './form.html'
})
export class CompanyCreateComponent implements OnInit {

  public isSubmitted = false;
  public isUpdate: boolean = false;
  public company: any = {
    name: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: '',
    city: '',
    state: '',
    country: 'Zambia',
    verificationIssueId: ''
  };
  public verificationIssue: any = {};
  public tab: string = 'information';
  public dialCode: any = '+260';
  public phone: any = {
    number: ''
  };
  public cities: any = [];
  public citySelected: any = {
    areas: []
  };

  constructor(
    private router: Router,
    private toasty: ToastyService,
    private companyService: CompanyService,
    private locationService: LocationService
  ) {
    this.cities = this.locationService.getCitiesZambia();
    this.company.city = this.cities[0].name;
    this.company.state = this.cities[0].areas[0];
    this.cityChange(this.company.city);
  }

  ngOnInit() {
  }

  submit(frm: any) {
    this.isSubmitted = true;
    if (!frm.valid) {
      return this.toasty.error('Invalid form, please check and try again!');
    }

    if (!this.company.verificationIssueId) {
      return this.toasty.error('Please select verification Issue');
    }
    this.companyService.create(this.company).then(resp => {
      this.toasty.success('Created successfuly!');
      this.router.navigate(['/companies']);
    })
      .catch((err) => this.toasty.error(err.data.data.message));
  }

  selectVerificationIssue(data: any) {
    this.company.verificationIssueId = data._id;
    this.verificationIssue = data;
  }

  selectDial(event) {
    this.dialCode = event;
  }

  inputPhone() {
    this.company.phoneNumber = `${this.dialCode}${this.phone.number}`;
  }

  cityChange(city: any) {
    this.citySelected = _.find(this.cities, { 'name': city });
    this.company.state = this.citySelected.areas[0];
  }
}

@Component({
  selector: 'company-update',
  templateUrl: './form.html'
})
export class CompanyUpdateComponent implements OnInit {

  public isSubmitted = false;
  public company: any = {};
  public categories: Array<any>;
  public verificationIssue: any = {};
  public isUpdate: boolean = true;
  public avatarOptions: any = {};
  public tab: string = 'information';
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
    private companyService: CompanyService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private locationService: LocationService
  ) {
    this.cities = this.locationService.getCitiesZambia();
    const id = this.route.snapshot.paramMap.get('id');
    this.avatarOptions = {
      url: window.appConfig.apiBaseUrl + '/companies/' + id + '/logo',
      fileFieldName: 'logo',
      onFinish: resp => this.company.logoUrl = resp.data.url
    }
    this.categoryService.tree(id).then(resp => {
      this.categories = this.categoryService.prettyPrint(resp.data);
      this.company.categoryLength = resp.data.length;
    });
    this.companyService.findOne(id)
      .then(resp => {
        this.company = resp.data;
        this.cityChange(this.company.city);
        this.company.commission = resp.data.siteCommission * 100;
        this.verificationIssue = resp.data.verificationDocument;
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

    if (!this.company.verificationIssueId) {
      return this.toasty.error('Please select verification Issue');
    }

    if (this.company.commission) {
      this.company.siteCommission = this.company.commission / 100;
    }

    const data = _.pick(this.company, [
      'name',
      'email',
      'address',
      'phoneNumber',
      'city',
      'state',
      'country',
      'verificationIssueId',
      'verified',
      'activated',
      // 'deliveryPrice',
      'siteCommission'
    ]);
    this.companyService.update(this.company._id, data).then(resp => {
      this.toasty.success('Updated successfuly!');
    }).catch(() => this.toasty.error('Something went wrong, please check and try again!'));
  }

  selectVerificationIssue(data: any) {
    this.company.verificationIssueId = data._id;
    this.verificationIssue = data;
  }

  changeTab(tab: string) {
    this.tab = tab;
  }

  selectDial(event) {
    this.dialCode = event;
  }

  inputPhone() {
    this.company.phoneNumber = `${this.dialCode}${this.phone.number}`;
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
