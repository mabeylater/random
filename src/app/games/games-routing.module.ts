import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from './games.component';
import { RockPaperScissorsComponent } from './rock-paper-scissors/rock-paper-scissors.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';

const routes: Routes = [
  {
    path: '',
    title: 'Games',
    component: GamesComponent,
    children: [
      {
        path: 'rock-paper-scissors',
        title: 'Rock, Paper, Scissors',
        component: RockPaperScissorsComponent
      },
      {
        path: 'tic-tac-toe',
        title: 'Tic Tac Toe',
        component: TicTacToeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
