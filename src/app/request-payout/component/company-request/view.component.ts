import { Component } from '@angular/core';
import { DeliveryRequestPayoutService } from '../../services/delivery-request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'delivery-request-view',
  templateUrl: './view.html'
})
export class DeliveryViewComponent {
  public item: any = {};
  public info: any = {
    note: '',
    reason: ''
  };
  public status: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private payoutService: DeliveryRequestPayoutService,
    private toasty: ToastyService
  ) {
    const id = this.route.snapshot.params.id;
    this.payoutService.findOne(id).then(res => {
      this.item = res.data;
      this.status = res.data.status;
    });
  }

  reject(item) {
    if (this.status === 'rejected') {
      return this.toasty.error('This request has been rejected, can not be changed status');
    }
    if (this.status === 'approved') {
      return this.toasty.error('This request has been approved, can not be changed status');
    }
    if (!this.info.note) {
      return this.toasty.error('Please leave a message');
    }
    this.payoutService.reject(item._id, { rejectReason: this.info.rejectReason, note: this.info.note }).then(res => {
      this.toasty.success('Success');
      this.router.navigate(['/request-payout/delivery']);
    })
      .catch(() => this.toasty.error('Something went wrong, please try again!'));
  }

  approve(item) {
    if (this.status === 'approved') {
      return this.toasty.error('This request has been approved, can not be changed status');
    }
    if (this.status === 'rejected') {
      return this.toasty.error('This request has been rejected, can not be changed status');
    }
    this.payoutService.approve(item._id, { note: this.info.note }).then(res => {
      this.toasty.success('Success');
      this.router.navigate(['/request-payout/delivery']);
    })
      .catch(() => this.toasty.error('Something went wrong, please try again!'))
  }
}
