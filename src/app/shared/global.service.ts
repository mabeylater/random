import { Injectable } from '@angular/core';
import { NavigationElement } from './models';
import { BehaviorSubject } from 'rxjs';
import { appNavigation } from './models/navigation';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public appTitle: string = 'Random';
  public navigationRoutes: NavigationElement[] = appNavigation.main;
  public currentPage = new BehaviorSubject<NavigationElement>(this.navigationRoutes[0]);
  public mainNavOpen = new BehaviorSubject<boolean>(false);

  public onNavChange(navEl: NavigationElement) {
    this.currentPage.next(navEl);
  }
}
