import { Component } from '@angular/core';
import { BaseTemplateComponent } from './shared/base-template/base-template.component';

@Component({
  selector: 'app-root',
  template: `<app-navigation></app-navigation>`,
  styleUrls: []
})
export class AppComponent extends BaseTemplateComponent {

}
