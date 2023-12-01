import { Component } from '@angular/core';
import { NavigationElement } from '../shared/models';
import { SubnavigationComponent } from '../shared/subnavigation/subnavigation.component';
import { appNavigation } from '../shared/models/navigation';

@Component({
  selector: 'app-games',
  templateUrl: '../shared/subnavigation/subnavigation.component.html'
})
export class GamesComponent extends SubnavigationComponent {
  override basepath: string = '/games';
  override pageSubtitle: string = 'Available Games';
  override navigationRoutes: NavigationElement[] = appNavigation.games;
}
