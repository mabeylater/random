import { Component, OnInit, inject } from '@angular/core';
import { BaseTemplateComponent } from 'src/app/shared/base-template/base-template.component';
import { appNavigation } from '../shared/models/navigation';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-home',
  template: `
  <mat-action-list *ngFor="let nav of navItems | keyvalue; let i = index" [style.padding-top]="'0px'">
    <ng-container *ngIf="nav.key !== 'main' && nav.key !== 'bp'">
      <ng-container *ngFor="let item of nav.value">
        <a mat-list-item [routerLink]="item.path" [class.title-item]="'/' + nav.key === item.path">
          <mat-icon matListItemIcon>{{item.icon}}</mat-icon>
          <span>{{item.title}}</span>
        </a>
      </ng-container>
    </ng-container>
  </mat-action-list>
  <mat-divider></mat-divider>
  `
})
export class HomeComponent extends BaseTemplateComponent {
  navItems = appNavigation
  windowSize = window.innerWidth
}
