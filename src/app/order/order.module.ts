import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SortablejsModule } from 'angular-sortablejs';
import { OrderRoutingModule } from './order.routing';

import { ViewComponent } from './components/view/view.component';
import { ListingComponent } from './components/listing/listing.component';
import { MapModalComponent } from './components/map-modal/map-modal.component';
import { DeliveryHistoryComponent } from './components/delivery-history/delivery-history.component';

import { OrderService } from './services/order.service';

import { NoImagePipe, NoPhotoPipe } from '../shared/pipes';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SortablejsModule,
    // our custom module
    OrderRoutingModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: window.appConfig.GoogleMapApiKey
    })
  ],
  declarations: [
    ViewComponent,
    ListingComponent,
    NoImagePipe,
    NoPhotoPipe,
    MapModalComponent,
    DeliveryHistoryComponent
  ],
  providers: [OrderService],
  entryComponents: [MapModalComponent, DeliveryHistoryComponent]
})
export class OrderModule {}
