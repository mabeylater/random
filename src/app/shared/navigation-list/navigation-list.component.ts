import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseTemplateComponent } from '../base-template/base-template.component';
import { NavigationChangeEvent, NavigationElement } from '../models';
import { appNavigation } from '../models/navigation';

@Component({
  selector: 'app-navigation-list',
  template: `
  <mat-nav-list>
    <ng-container *ngFor="let route of navigationElements; let first = first">
      <a
        mat-list-item
        #navItem
        (click)="navigate.emit({navEl: route, listItem: navItem})"
        (mouseenter)="isFull ? showChildSet(route.path) : null"
        (mouseleave)="isFull ? hideChildSet(route.path) : null"
        [disableRipple]="true"
        [routerLink]="route.path"
        [activated]="isActive(route)"
        [class.active-route]="isActive(route)"
        [matTooltip]="iconsOnly ? route.title : ''"
        matTooltipPosition="left"
        >
        <mat-icon matListItemIcon *ngIf="!isChildSet">{{route.icon}}</mat-icon>
        <span *ngIf="!iconsOnly">{{route.title}}</span>
      </a>
      <ng-container *ngIf="isFull && allRoutes[route.path]">
        <div
        class="sub-nav-children"
        hidden="true"
        [id]="route.path"
        [class.fade-in]="!showChildren"
        [class.fade-out]="!showChildren"
        (mouseenter)="isFull ? showChildSet(route.path) : null"
        (mouseleave)="isFull ? hideChildSet(route.path) : null"
        >
          <app-navigation-list
          [isChildSet]="true"
          [navigationElements]="getNavElementsForFull(route.path)"
          (navigate)="navigate.emit($event)"
          ></app-navigation-list>
          <mat-divider></mat-divider>
        </div>
      </ng-container>
    </ng-container>
  </mat-nav-list>
  `,
  styleUrls: []
})
export class NavigationListComponent extends BaseTemplateComponent {

  @Input() navigationElements!: NavigationElement[];
  @Input() iconsOnly = false;
  @Input() isFull = false;
  @Input() isChildSet = false;
  @Output() navigate = new EventEmitter<NavigationChangeEvent>();

  allRoutes = appNavigation;
  showChildren = false;

  isActive(navEl: NavigationElement): boolean {
    return this.router.isActive(navEl.path as string,
      {
        paths: navEl.pathMatchExact ? 'exact' : 'subset',
        queryParams: 'ignored',
        matrixParams: 'ignored',
        fragment: 'ignored'
      });
  }

  getNavElementsForFull(key: string) {
    return this.allRoutes[key].slice(1)
  }

  showChildSet(elId: string) {
    this.showChildren = true;
    document.getElementById(elId)?.removeAttribute('hidden');
  }

  hideChildSet(elId: string) {
    this.showChildren = false;
    document.getElementById(elId)?.setAttribute('hidden', 'true');
  }
}
