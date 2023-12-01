import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { BaseTemplateComponent } from 'src/app/shared/base-template/base-template.component';
import { NavigationChangeEvent, NavigationElement } from '../shared/models';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-navigation',
  template: `
    <mat-toolbar color="primary">
      <button
        type="button"
        aria-label="Toggle sidenav"
        mat-icon-button
        (click)="toggleNav()">
        <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
      </button>
      <span>{{pageTitle$ | async}}</span>
    </mat-toolbar>
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #drawer class="sidenav" fixedInViewport fixedBottomGap="0" fixedTopGap="64"
          [attr.role]="!(isHandset$ | async) ? 'navigation' :'dialog'"
          [opened]="(isHomePage && !(isHandset$ | async))"
          [mode]="!(isHandset$ | async) ? 'side' : 'over'">
          <ng-container *ngIf="!isHomePage">
            <mat-toolbar>
              <span>Main Menu</span>
              <span style="flex: auto;"></span>
              <button mat-icon-button (click)="toggleNav()">
                <mat-icon>close</mat-icon>
              </button>
            </mat-toolbar>
          </ng-container>
        <app-navigation-list
          [isFull]="true"
          [navigationElements]="navigationRoutes"
          (navigate)="onNavChange($event)">
        </app-navigation-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `
})
export class NavigationComponent extends BaseTemplateComponent implements OnInit, OnDestroy {

  isHomePage = false;
  navigationRoutes: NavigationElement[] = this.globalService.navigationRoutes;
  onDestroy$ = new Subject<void>();

  pageTitle$ = this.globalService.currentPage.pipe(
    map(value => {
      this.globalService.mainNavOpen.next(value.path === '')
      if (value.path === '') {
        this.isHomePage = true;
        return this.globalService.appTitle;
      } else {
        this.isHomePage = false;
        return value.title;
      }
    })
  );

  pageIcon$ = this.globalService.currentPage.pipe(
    map(value => value.icon)
  );

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  ngOnInit(): void {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      tap(e => this.updateCurrentNav()),
      takeUntil(this.onDestroy$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  updateCurrentNav() {
    const currentPath = window.location.pathname.split('/')[1];
    if (currentPath !== '') {
      const currentNavEl = this.globalService.navigationRoutes.find(el => el.path === currentPath);
      this.globalService.onNavChange(currentNavEl as NavigationElement);
    } else {
      this.globalService.onNavChange(this.navigationRoutes[0]);
    }
  }

  override onNavChange(navChangeEvent: NavigationChangeEvent): void {
    navChangeEvent.listItem._elementRef.nativeElement.blur();
    this.globalService.currentPage.next(navChangeEvent.navEl);
    this.sidenav.close();
  }

  toggleNav() {
    this.sidenav.toggle();
    this.globalService.mainNavOpen.next(this.sidenav.opened);
  }
}
