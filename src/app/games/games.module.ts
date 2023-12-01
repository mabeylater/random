import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RockPaperScissorsComponent } from './rock-paper-scissors/rock-paper-scissors.component';
import { GamesComponent } from './games.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';


@NgModule({
  declarations: [
    RockPaperScissorsComponent,
    GamesComponent,
    TicTacToeComponent
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    SharedModule
  ]
})
export class GamesModule { }
