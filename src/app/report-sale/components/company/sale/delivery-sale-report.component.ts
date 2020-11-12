import { Component, OnInit, Input } from '@angular/core';
import { ReportSaleService } from '../../../report.service';
import { CompanyService } from '../../../../company/services';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import * as async from 'async';

@Component({
  selector: 'delivery-report-sale',
  templateUrl: './delivery-sale-report.html'
})
export class DeliverySaleComponent implements OnInit {
  public companies: any = [];
  public page: number = 1;
  public take: number = 10;
  public totalCompanies: number = 0;
  public searchFields: any = {
    name: ''
  };

  constructor(
    private router: Router,
    private companyService: CompanyService,
    private reportService: ReportSaleService,
    private toasty: ToastyService) {
  }

  ngOnInit() {
    this.query();
  }

  query() {
    this.companyService.search(Object.assign({ page: this.page }, this.searchFields))
      .then(resp => {
        this.companies = resp.data.items;
        this.totalCompanies = resp.data.count;
        async.eachSeries(this.companies, (company, cb) => {
          this.reportService.deliveryStat({
            deliveryCompanyId: company._id
          }).then(resp => {
            company.saleStats = resp.data;
            cb();
          }).catch(() => cb())
        });
      })
      .catch(() => this.toasty.error('Something went wrong, please try again!'));
  }

  keyPress(event: any) {
    if (event.charCode === 13) {
      this.query();
    }
  }
}
