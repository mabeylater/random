import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { NavigationElement } from 'src/app/shared/models';
import { BpData, getBpAverages, getCategory, chartData } from 'src/app/shared/models/bp';
import { appNavigation } from 'src/app/shared/models/navigation';
import { SubnavigationComponent } from 'src/app/shared/subnavigation/subnavigation.component';

@Component({
  selector: 'app-bp-tracking',
  templateUrl: './bp-tracking.component.html'
})
export class BpTrackingComponent extends SubnavigationComponent implements OnInit {
  bpData!: BpData[];
  isLoggedIn = false;

  get bpAverages() {
    if (!!this.bpData)
      return getBpAverages(this.bpData);
    return null;
  }

  override basepath: string = '/bp-tracking';
  override pageSubtitle: string = 'BP Metrics';
  override navigationRoutes: NavigationElement[] = appNavigation['bp'];

  selectedId?: string;
  isCreateMode = false;
  chartData?: any;

  api = inject(ApiService);
  auth = inject(AuthService);

  override ngOnInit() {
    super.ngOnInit();
    this.isLoggedIn = !!this.auth.user$?.value
  }

  login(username: string, password: string) {
    this.auth.login(username, password).then((user) => {
      if (!!!user) return;

      this.isLoggedIn = true;
      this.api.getBpData().then(data => {
        this.bpData = data as BpData[];
        this.selectedId = this.bpData[0].id;
        this.router.navigate([this.basepath, this.selectedId]);
        this.getChartData();
      })
    });
  }

  addBp() {
    this.isCreateMode = true;
  }

  save(date: string, time: string, systolic: number, diastolic: number) {
    this.api.postBpData({
      date,
      time,
      systolic,
      diastolic,
      category: getCategory(systolic, diastolic)
    }).then(data => {
      this.api.getBpData();
      this.router.navigate([this.basepath, data.id]);
      this.selectedId = data.id;
      this.isCreateMode = false;
      this.getChartData();
    })
  }

  getChartData() {
    if (!!this.bpData)
      this.chartData = chartData(this.bpData);
  }
}
