import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../shared/services';
import { ToastyService } from 'ng2-toasty';
import * as _ from 'lodash';

@Component({
  selector: 'profile-update',
  templateUrl: './form.html'
})
export class ProfileUpdateComponent implements OnInit {
  public info: any = {};
  public avatarUrl = '';
  public isSubmitted = false;
  public avatarOptions: any = {};
  public user: any = {};
  private userId: string;
  public dialCode: any = '+260';
  public phone: any = {
    number: ''
  };
  public dialCodes: any = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private toasty: ToastyService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.dialCodes = this.authService.getDialCodes();
    this.avatarOptions = {
      url: window.appConfig.apiBaseUrl + '/users/avatar',
      fileFieldName: 'avatar',
      onFinish: (resp) => {
        this.avatarUrl = resp.data.url;
        this.user.avatarUrl = resp.data.url;
      }
    }

    this.userService.me().then(resp => {
      this.user = resp.data;
      this.info = _.pick(resp.data, [
        'name', 'email', 'address', 'phoneNumber'
      ]);
      this.avatarUrl = resp.data.avatarUrl;
      if (resp.data.phoneNumber) {
        this.trackDial(resp.data.phoneNumber);
      }
    });
  }

  submit(frm: any) {
    this.isSubmitted = true;
    if (!frm.valid) {
      return this.toasty.error('Something went wrong, please check and try again!');
    }
    console.log(this.info)
    // this.userService.update(this.userId, this.info).then(resp => {
    //   this.toasty.success('Updated successfuly!');
    // }).catch((err) => this.toasty.error(err.data.data.message || err.data.data.email));
  }

  selectDial(event) {
    this.dialCode = event;
  }

  inputPhone() {
    this.info.phoneNumber = `${this.dialCode}${this.phone.number}`;
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
