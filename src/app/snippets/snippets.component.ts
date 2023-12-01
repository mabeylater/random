import { Component } from '@angular/core';
import { NavigationElement } from '../shared/models';
import { SubnavigationComponent } from '../shared/subnavigation/subnavigation.component';
import { appNavigation } from '../shared/models/navigation';

@Component({
  selector: 'app-snippets',
  templateUrl: '../shared/subnavigation/subnavigation.component.html'
})
export class SnippetsComponent extends SubnavigationComponent {
  override basepath: string = '/snippets';
  override pageSubtitle: string = 'Available Snippets';
  override navigationRoutes: NavigationElement[] = appNavigation.snippets;
}
