import { Component } from '@angular/core';
import { BaseTemplateComponent } from 'src/app/shared/base-template/base-template.component';

@Component({
  selector: 'app-rock-paper-scissors',
  template: `
    <mat-card class="mat-elevation-z0">
      <mat-card-header>
        <mat-card-title>Pick an Option</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="game-buttons">
          <div *ngFor="let option of options; let i = index" [class]="getClass(i)">
            <div>{{option | titlecase}}</div>
            <button (click)="selectOption(i)">
              <mat-icon>{{getIcon(i)}}</mat-icon>
            </button>
            <p>{{getPlayer(i)}}</p>
          </div>
        </div>
      </mat-card-content>
      <ng-container *ngIf="gamesPlayed > 0">
        <mat-list>
          <mat-list-item>
            <div matListItemTitle>Most Recent Winner: {{mostRecentWinner}}</div>
          </mat-list-item>
          <mat-list-item>
            <div matListItemLine>Games Played: {{gamesPlayed}}</div>
          </mat-list-item>
          <mat-list-item>
            <div matListItemLine>User Wins: {{userWins}} ({{userWinStats | percent}})</div>
            <div matListItemLine>
              <mat-progress-bar color="accent" mode="determinate" [value]="userWinStats * 100"></mat-progress-bar>
            </div>
          </mat-list-item>
          <mat-list-item>
            <div matListItemLine>Bot Wins: {{botWins}} ({{botWinStats | percent}})</div>
            <div matListItemLine>
              <mat-progress-bar color="warn" mode="determinate" [value]="botWinStats * 100"></mat-progress-bar>
            </div>
          </mat-list-item>
          <mat-list-item>
            <div matListItemLine>Ties: {{ties}} ({{tieStats | percent}})</div>
            <div matListItemLine>
              <mat-progress-bar mode="determinate" [value]="tieStats * 100"></mat-progress-bar>
            </div>
          </mat-list-item>
        </mat-list>
        <mat-list>
          <mat-list-item>Winning Option History</mat-list-item>
          <mat-list-item>
            <div matListItemTitle>Rock: {{rockWins}} ({{rockWinStats | percent}})</div>
            <div matListItemLine>
              <mat-progress-bar mode="determinate" [value]="rockWinStats * 100"></mat-progress-bar>
            </div>
          </mat-list-item>
          <mat-list-item>
            <div matListItemTitle>Paper: {{paperWins}} ({{paperWinStats | percent}})</div>
            <div matListItemLine>
              <mat-progress-bar mode="determinate" [value]="paperWinStats * 100"></mat-progress-bar>
            </div>
          </mat-list-item>
          <mat-list-item>
            <div matListItemTitle>Scissor: {{scissorWins}} ({{scissorWinStats | percent}})</div>
            <div matListItemLine>
              <mat-progress-bar mode="determinate" [value]="scissorWinStats * 100"></mat-progress-bar>
            </div>
          </mat-list-item>
        </mat-list>
      </ng-container>
    </mat-card>
  `,
  styleUrls: ['../games.scss']
})
export class RockPaperScissorsComponent extends BaseTemplateComponent {

  options: string[] = [
    'rock',
    'paper',
    'scissors'
  ];

  outcomes: { [key: string]: boolean | null } = {
    'rockrock': null,
    'rockpaper': false,
    'rockscissors': true,

    'paperpaper': null,
    'paperscissors': false,
    'paperrock': true,

    'scissorsscissors': null,
    'scissorspaper': true,
    'scissorsrock': false,
  }

  rockWins = 0;
  paperWins = 0;
  scissorWins = 0;

  userWins = 0;
  botWins = 0;
  ties = 0;

  gamesPlayed = 0;

  mostRecentWinner: string = '';
  userSelection: string = '';
  botSelection: string = '';

  get nonTieGames(): number {
    return this.gamesPlayed// - this.ties;
  }

  get userWinStats() {
    return this.userWins / this.nonTieGames;
  }

  get botWinStats() {
    return this.botWins / this.nonTieGames;
  }

  get rockWinStats() {
    return this.rockWins / this.nonTieGames;
  }

  get paperWinStats() {
    return this.paperWins / this.nonTieGames;
  }

  get scissorWinStats() {
    return this.scissorWins / this.nonTieGames;
  }

  get tieStats() {
    return this.ties / this.gamesPlayed;
  }

  selectOption(index: number) {

    this.gamesPlayed++;

    this.userSelection = this.options[index];
    const botIndex = Math.floor(Math.random() * 3);
    this.botSelection = this.options[botIndex];
    const outcome = this.outcomes[this.userSelection + this.botSelection];

    console.log(this.userSelection + this.botSelection, outcome)

    if (outcome === null) {
      this.ties++;
      this.mostRecentWinner = 'It\'s a tie!';
      this.logWin(index);
    } else {
      if (outcome === true) {
        this.userWins++;
        this.mostRecentWinner = 'You';
        this.logWin(index);
      } else if(outcome === false) {
        this.botWins++;
        this.mostRecentWinner = 'Bot';
        this.logWin(botIndex);
      }
    }


  }

  logWin(index: number) {
    switch (index) {
      case 0: this.rockWins++; break;
      case 1: this.paperWins++; break;
      case 2: this.scissorWins++; break;
    }
  }

  getClass(index: number): string {
    const isSelected = this.userSelection === this.options[index] || this.botSelection === this.options[index];

    if (isSelected) {
      if (this.userSelection === this.botSelection) {
        return 'selected-option tie';
      }

      if (this.userSelection === this.options[index]) {
        return 'selected-option user'
      }
      if (this.botSelection === this.options[index]) {
        return 'selected-option bot'
      }
    }

    return '';
  }

  getIcon(index: number): string {
    switch (index) {
      case 0: return 'terrain';
      case 1: return 'receipt_long';
      case 2: return 'content_cut';
    }
    return '';
  }

  getPlayer(index: number): string {
    const selected = this.options[index];
    if (this.outcomes[this.userSelection + this.botSelection] === null && (this.userSelection === selected || this.botSelection === selected)) {
      return 'Tie';
    }

    if (this.userSelection === selected) {
      return 'You'
    }
    if (this.botSelection === selected) {
      return 'Bot'
    }

    return '';
  }
}
