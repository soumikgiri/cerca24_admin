import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'latest-request-card',
  templateUrl: './latest-request-card.html'
})
export class LatestRequestCardComponent implements OnInit {
  @Input() requestPayout: any;
  @Input() type: string;

  constructor() {
  }

  ngOnInit() { }
}
