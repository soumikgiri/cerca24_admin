import { UpdateZoneComponent } from './update.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationService } from './../../shared/services/location.service';
import { Component, OnInit } from '@angular/core';
import { ZoneService } from '../zone.service';
import { ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { CreateZoneComponent } from './create.component';

@Component({
  templateUrl: '../views/list.html'
})
export class CompanyDeliveryZonesComponent implements OnInit {
  public items = [];
  public page = 1;
  public total = 0;
  public companyId: string = '';
  public loading: boolean = false;
  public cities: any = [];
  public selectedCity: any = {
    name: ''
  };
  public areas: any = [];
  public selectedAreas: any = [];

  constructor(private route: ActivatedRoute, private service: ZoneService, private toasty: ToastyService,
    private locationService: LocationService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.cities = this.locationService.getCitiesZambia();
    this.companyId = this.route.snapshot.params.companyId;
    this.changeCity(this.cities[0].name);
  }

  query() {
    this.loading = true;
    this.service.search({
      page: this.page,
      companyId: this.companyId,
      city: this.selectedCity.name
    })
      .then(resp => {
        this.loading = false;
        this.items = resp.data.items;
        if (resp.data.count) {
          this.trackAvailableZone();
        }
        this.total = resp.data.count;
      })
      .catch(() => {
        this.loading = false;
        this.toasty.error('Something went wrong, please try again!');
      });
  }

  addNewZone() {
    const modalRef = this.modalService.open(CreateZoneComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    });
    modalRef.componentInstance.areas = this.areas;
    modalRef.componentInstance.city = this.selectedCity.name;
    modalRef.componentInstance.selectedAreas = this.selectedAreas;
    modalRef.componentInstance.companyId = this.companyId;
    modalRef.result.then(result => {
      if (result) {
        this.query();
      }
    }, () => { });
  }

  updateZone(item: any, index: number) {
    const modalRef = this.modalService.open(UpdateZoneComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    });
    modalRef.componentInstance.areas = this.areas;
    modalRef.componentInstance.selectedAreas = this.selectedAreas;
    modalRef.componentInstance.item = item;
    modalRef.result.then(result => {
      if (result) {
        this.query();
      }
    }, () => { });
  }

  trackAvailableZone() {
    let selectedAreasInCity = [];
    this.items.forEach(item => {
      selectedAreasInCity = item.areas;
      this.selectedAreas = this.selectedAreas.concat(selectedAreasInCity);
    });
  }

  changeCity(cityName: string) {
    this.selectedCity.name = cityName;
    this.query();
    const city = this.cities.find(c => c.name == cityName);
    this.areas = city.areas ? city.areas : [];
  }

  remove(item: any, index: number) {
    if (window.confirm('Are you sure want to delete this zone?')) {
      this.service.remove(item._id)
        .then(() => {
          this.toasty.success('Success!');
          this.items.splice(index, 1);
          this.query();
        })
        .catch((err) => this.toasty.error(err.data.message || 'Something went wrong, please try again!'));
    }
  }
}
