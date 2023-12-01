import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnippetsRoutingModule } from './snippets-routing.module';
import { ScssComponent } from './components/scss/scss.component';
import { AngularComponent } from './components/angular/angular.component';
import { PowershellComponent } from './components/powershell/powershell.component';
import { SharedModule } from '../shared/shared.module';
import { SnippetsComponent } from './snippets.component';


@NgModule({
  declarations: [
    ScssComponent,
    AngularComponent,
    PowershellComponent,
    SnippetsComponent,
  ],
  imports: [
    CommonModule,
    SnippetsRoutingModule,
    SharedModule
  ]
})
export class SnippetsModule { }
