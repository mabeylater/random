import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, ViewChild, inject } from '@angular/core';
import { BaseTemplateComponent } from '../base-template/base-template.component';
import { NavigationElement } from '../models';
import { BehaviorSubject, Subject, filter, map, takeUntil, tap } from 'rxjs';
import { NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-subnavigation',
  templateUrl: './subnavigation.component.html'
})
export class SubnavigationComponent extends BaseTemplateComponent implements OnInit, OnChanges {
  protected changeDetector = inject(ChangeDetectorRef);
  @Input() navigationRoutes: NavigationElement[] = [];
  basepath!: string;
  pageSubtitle!: string;
  onDestroy$ = new Subject<void>();
  pageTitle$ = new BehaviorSubject<string>('');
  pageIcon$ = new BehaviorSubject<string>('');
  navOpen = true;

  get mainNavOpen() {
    return this.globalService.mainNavOpen.getValue();
  }

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  ngOnInit(): void {
    this.updateCurrentNav();
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      tap(e => this.updateCurrentNav()),
      takeUntil(this.onDestroy$)
    ).subscribe();

    this.isHandset$.subscribe(value => {
      this.navOpen = !value
    });

    this.globalService.mainNavOpen.subscribe(value => {
      if (!!this.sidenav) {
        if (!value) {
          this.sidenav.open();
        } else {
          this.sidenav.close();
        }
      }
    })
  }

  ngOnChanges(): void {
    this.changeDetector.detectChanges();
  }

  updateCurrentNav() {
    const currentPath = window.location.pathname;
    const currentNavEl = this.navigationRoutes.find(x => x.path == currentPath);
    let pageTitle = currentNavEl?.title as string
    if (currentPath.split('/').length <= 2) {
      pageTitle += ' Home';
    }
    this.pageTitle$.next(pageTitle);
    this.pageIcon$.next(currentNavEl?.icon as string);
  }

  toggleNav() {
    this.navOpen = !this.navOpen;
  }

  isSectionHomePage() {
    return window.location.pathname === this.basepath;
  }
}
