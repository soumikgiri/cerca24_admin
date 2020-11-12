import { Component, OnInit } from '@angular/core';
import { DeliveryRequestPayoutService } from '../../../../request-payout/services/delivery-request.service';
import { CompanyService } from '../../../../company/services';
import { ToastyService } from 'ng2-toasty';
import * as async from 'async';

@Component({
  selector: 'delivery-report-payout',
  templateUrl: './delivery-payout-report.html'
})
export class DeliveryPayoutComponent implements OnInit {

  public companies: any = [];
  public page: any = 1;
  public total: any = 0;
  public searchFields: any = {
    name: ''
  };

  constructor(
    private toasty: ToastyService,
    private companyService: CompanyService,
    private payoutService: DeliveryRequestPayoutService
  ) { }

  ngOnInit() {
    this.query();
  }

  query() {
    this.companyService.search(Object.assign({ page: this.page }, this.searchFields))
      .then(resp => {
        this.companies = resp.data.items;
        this.total = resp.data.count;
        async.eachSeries(this.companies, (company, cb) => {
          this.payoutService.stats({
            companyId: company._id
          }).then(re => {
            company.payout = re.data;
            return this.payoutService.companyBalance(company._id)
              .then(res => {
                company.balance = res.data;
                cb();
              });
          }).catch(() => cb());
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
