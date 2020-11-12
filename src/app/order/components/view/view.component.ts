import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { MapModalComponent } from '../map-modal/map-modal.component';
import { DeliveryHistoryComponent } from '../delivery-history/delivery-history.component';
import * as _ from 'lodash';

@Component({
  selector: 'order-view',
  templateUrl: './view.html'
})
export class ViewComponent implements OnInit {
  public order: any = {};
  public details: any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private modalService: NgbModal,
    private toasty: ToastyService) {
    const id = this.route.snapshot.params.id;
    this.orderService.findOne(id).then((res) => {
      this.order = res.data;
      this.details = res.data.details;
      this.details.filter(i => {
        if (i.pickUpAddress) {
          i.pickUpAddressToString = i.pickUpAddress.street + ', ' + i.pickUpAddress.area + ', ' + i.pickUpAddress.city;
        }
        if (i.pickUpAddressObj) {
          i.pickUpAddressToString = i.pickUpAddressObj.street + ', ' + i.pickUpAddressObj.area + ', ' + i.pickUpAddressObj.city;
        }
      })
    })
      .catch(err => this.toasty.error(err.data.data.message || 'Error occured, please try again'));
  }

  ngOnInit() {
  }

  updateStatus(item, index) {
    const data = _.pick(item, ['status']);
    this.orderService.update(item._id, data).then(resp => {
      this.toasty.success('Updated successfuly!');
      this.details[index].status = item.status;
    }).catch((err) => this.toasty.error('Something went wrong, please try again!'));
  }

  openMap(item) {
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    const modalRef = this.modalService.open(MapModalComponent, ngbModalOptions);
    modalRef.componentInstance.orderDetailId = item._id;
  }

  openHistoryStatus(item: any) {
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    const modalRef = this.modalService.open(DeliveryHistoryComponent, ngbModalOptions);
    modalRef.componentInstance.options = {
      historyStatus: item.deliveryHistory,
      trackingCode: item.trackingCode,
      productName: item.productDetails.name
    }
  }
}
