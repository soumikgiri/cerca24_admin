import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ZoneService } from './../zone.service';
import { Component, OnInit, Input } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import * as _ from 'lodash';

@Component({
  templateUrl: '../views/form.html'
})
export class UpdateZoneComponent implements OnInit {
  @Input() item: any = {};
  @Input() areas: any = [];
  @Input() selectedAreas: any = [];
  public submitted: boolean = false;
  constructor(private service: ZoneService, private toasty: ToastyService, public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.areas = this.areas.filter(a => this.selectedAreas.indexOf(a) === -1);
  }

  submit(frm: any) {
    this.submitted = true;
    if (!this.item.name) {
      return this.toasty.error('Please enter zone name to create zone!');
    }
    if (this.item.deliveryPrice < 0 || !this.item.deliveryPrice) {
      return this.toasty.error('Delivery price must be greater than 0!');
    }
    const data = _.pick(this.item, ['name', 'areas', 'deliveryPrice', 'city']);
    this.service.update(this.item._id, data)
      .then(resp => {
        this.toasty.success('Created successfully!');
        this.activeModal.close(resp.data);
      })
      .catch(() => this.toasty.error('Something went wrong, please try again!'));
  }
}
