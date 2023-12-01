import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    title: 'Random',
    component: HomeComponent
  },
  {
    path: 'snippets',
    loadChildren: () => import('./snippets/snippets.module').then(m => m.SnippetsModule)
  },
  {
    path: 'games',
    loadChildren: () => import('./games/games.module').then(m => m.GamesModule)
  },
  {
    path: 'bp-tracking',
    loadChildren: () => import('./bp-tracking/bp-tracking.module').then(m => m.BpTrackingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
