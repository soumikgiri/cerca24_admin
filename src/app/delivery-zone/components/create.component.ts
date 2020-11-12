import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ZoneService } from './../zone.service';
import { Component, OnInit, Input } from '@angular/core';
import { ToastyService } from 'ng2-toasty';

@Component({
  templateUrl: '../views/form.html'
})
export class CreateZoneComponent implements OnInit {
  @Input() companyId: string = '';
  @Input() city: string = '';
  @Input() areas: any = [];
  @Input() selectedAreas: any = [];
  public item: any = {
    deliveryPrice: 0
  };
  public submitted: boolean = false;
  constructor(private service: ZoneService, private toasty: ToastyService, public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    if (this.city) {
      this.item.city = this.city;
    }
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
    this.item.companyId = this.companyId;
    this.service.create(this.item)
      .then(resp => {
        this.toasty.success('Created successfully!');
        this.activeModal.close(resp.data);
      })
      .catch(() => this.toasty.error('Something went wrong, please try again!'));
  }
}
