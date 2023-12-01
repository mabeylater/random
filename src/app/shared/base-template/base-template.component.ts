import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, shareReplay } from 'rxjs';
import { NavigationChangeEvent } from '../models';

export abstract class BaseTemplateComponent {
  protected router = inject(Router);
  protected route = inject(ActivatedRoute);
  protected globalService = inject(GlobalService);
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.Small,
      Breakpoints.XSmall
    ])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  onNavChange(navChangeEvent: NavigationChangeEvent): void {
    navChangeEvent.listItem._elementRef.nativeElement.blur();
  }
}
