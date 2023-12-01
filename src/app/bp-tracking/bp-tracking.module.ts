import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BpTrackingRoutingModule } from './bp-tracking-routing.module';
import { DailyTrackingComponent } from './daily-tracking/daily-tracking.component';
import { BpTrackingComponent } from './bp-tracking/bp-tracking.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'


@NgModule({
  declarations: [
    DailyTrackingComponent,
    BpTrackingComponent
  ],
  imports: [
    CommonModule,
    BpTrackingRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule
  ]
})
export class BpTrackingModule { }
