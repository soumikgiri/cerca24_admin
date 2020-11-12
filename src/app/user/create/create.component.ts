import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import * as _ from 'lodash';

@Component({
  selector: 'user-create',
  templateUrl: './create.html'
})
export class UserCreateComponent implements OnInit {
  public info: any = {
    type: 'user',
    password: '',
    name: '',
    email: '',
    address: '',
    role: 'user',
    emailVerified: true,
    isActive: true
  };
  public isSubmitted: any = false;
  public dialCode: any = '+260';
  public phone: any = {
    number: ''
  };

  constructor(private router: Router, private userService: UserService, private toasty: ToastyService) { }

  ngOnInit() { }

  submit(frm: any) {
    this.isSubmitted = true;
    if (!frm.valid) {
      return this.toasty.error('Something went wrong, please check and try again!');
    }
    this.userService.create(this.info)
      .then((resp) => {
        this.toasty.success('Created successfully!');
        this.router.navigate(['/users/update/' + resp.data._id]);
      })
      .catch((err) => {
        if (err.data.code === 11000) {
          return this.toasty.error('Email ID already exist.');
        }
        this.toasty.error(err.data.message || err.data.data.message || err.data.data.email);
      });
  }

  selectDial(event) {
    this.dialCode = event;
  }

  inputPhone() {
    this.info.phoneNumber = `${this.dialCode}${this.phone.number}`;
  }
}
