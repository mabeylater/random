import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SnippetsComponent } from './snippets.component';
import { ScssComponent } from './components/scss/scss.component';
import { PowershellComponent } from './components/powershell/powershell.component';
import { AngularComponent } from './components/angular/angular.component';

const routes: Routes = [
  {
    path: '',
    title: 'Snippets',
    component: SnippetsComponent,
    children: [
      {
        path: 'stylesheets',
        title: 'Style Sheets',
        component: ScssComponent
      },
      {
        path: 'powershell',
        title: 'PowerShell',
        component: PowershellComponent
      },
      {
        path: 'angular',
        title: 'Angular',
        component: AngularComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SnippetsRoutingModule { }
