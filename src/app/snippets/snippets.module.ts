import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnippetsRoutingModule } from './snippets-routing.module';
import { ScssComponent } from './scss/scss.component';
import { AngularComponent } from './angular/angular.component';
import { PowershellComponent } from './powershell/powershell.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ScssComponent,
    AngularComponent,
    PowershellComponent
  ],
  imports: [
    CommonModule,
    SnippetsRoutingModule,
    SharedModule
  ]
})
export class SnippetsModule { }
