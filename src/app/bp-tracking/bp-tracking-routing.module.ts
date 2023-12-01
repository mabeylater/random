import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BpTrackingComponent } from './bp-tracking/bp-tracking.component';
import { DailyTrackingComponent } from './daily-tracking/daily-tracking.component';

const routes: Routes = [
  {
    path: '',
    component: BpTrackingComponent,
    children: [
      {
        path: ':id',
        component: DailyTrackingComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BpTrackingRoutingModule { }
