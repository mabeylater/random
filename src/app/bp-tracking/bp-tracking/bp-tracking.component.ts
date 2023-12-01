import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  api = inject(ApiService);
  auth = inject(AuthService);
  fb = inject(FormBuilder);

  bpData!: BpData[];
  isLoggedIn = false;

  get bpAverages() {
    if (!!this.bpData)
      return getBpAverages(this.bpData);
    return null;
  }

  addBpForm = this.fb.group({
    date: [null, Validators.required],
    time: [null, Validators.required],
    systolic: [null, Validators.required],
    diastolic: [null, Validators.required],
  });

  get bpFormData() {
    return this.addBpForm.value as Partial<BpData>
  }

  override basepath: string = '/bp-tracking';
  override pageSubtitle: string = 'BP Metrics';
  override navigationRoutes: NavigationElement[] = appNavigation['bp'];

  selectedId?: string;
  isCreateMode = false;
  chartData?: any;

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

  save() {
    this.api.postBpData({
      date: this.bpFormData.date,
      time: this.bpFormData.time,
      systolic: this.bpFormData.systolic,
      diastolic: this.bpFormData.diastolic,
      category: getCategory(
        this.bpFormData.systolic as number,
        this.bpFormData.diastolic as number
      )
    }).then(data => {
      this.api.getBpData();
      this.router.navigate([this.basepath, data.id]);
      this.selectedId = data.id;
      this.isCreateMode = false;
      this.getChartData();
      this.addBpForm.reset();
    })
  }

  getChartData() {
    if (!!this.bpData)
      this.chartData = chartData(this.bpData);
  }

  selectBp() {
    this.router.navigate([this.basepath, this.selectedId]);
  }
}
