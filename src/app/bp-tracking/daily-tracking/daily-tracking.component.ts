import { Component, inject } from '@angular/core';
import { switchMap } from 'rxjs';
import { ApiService } from 'src/app/api/api.service';
import { BaseTemplateComponent } from 'src/app/shared/base-template/base-template.component';

@Component({
  selector: 'app-daily-tracking',
  templateUrl: './daily-tracking.component.html',
  styleUrls: ['./daily-tracking.component.scss']
})
export class DailyTrackingComponent extends BaseTemplateComponent{
  api = inject(ApiService);
  bpData$ = this.route.paramMap.pipe(
    switchMap(params => this.api.getBpDataById(params.get('id') as string)),
  );
}
