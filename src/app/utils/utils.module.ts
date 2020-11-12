import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { DialCodeComponent } from './dial-number/dial.component';

@NgModule({
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    NgbModule.forRoot()
  ],
  declarations: [
    DialCodeComponent
  ],
  exports: [
    DialCodeComponent
  ]
})
export class UtilsModule { }
