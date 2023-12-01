import { Component } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  template: `
<mat-card class="mat-elevation-z0">
  <mat-card-header>
    <mat-card-title *ngIf="!gameOver">It's {{activePlayer | uppercase }}'s Turn</mat-card-title>
    <mat-card-title *ngIf="gameOver">{{(winner ? 'Winner: ' + winner : 'Stalemate') | titlecase}}</mat-card-title>
  </mat-card-header>
  <mat-card-content>
  <br><mat-divider></mat-divider><br>
  <table class="tic-tac-toe">
      <tr *ngFor="let row of rows; let rowIndex = index" class="top-row" [class]="row.class">
        <td *ngFor="let col of row.columns; let colIndex = index" [class]="col.value" [class.winner]="isWinningCol(rowIndex, colIndex)">
          <button mat-button (click)="claim(rowIndex, colIndex)" [disabled]="!!col.value || gameOver">
            <span *ngIf="shouldShow(col.value)">{{col.value || activePlayer}}</span>
          </button>
        </td>
      </tr>
    </table>
  </mat-card-content>
  <mat-card-actions *ngIf="gameOver">
    <button mat-raised-button color="accent" (click)="reset()">reset</button>
  </mat-card-actions>
</mat-card>
  `,
  styleUrls: ['../games.scss']
})
export class TicTacToeComponent {
  activePlayer: 'x' | 'o' = 'x';
  get startingRows(): { class: string; columns: { value?: 'x' | 'o' | null }[] }[] {
    return [
      {
        class: 'top-row',
        columns: [{ value: null }, { value: null }, { value: null }]
      },
      {
        class: 'middle-row',
        columns: [{ value: null }, { value: null }, { value: null }]
      },
      {
        class: 'bottom-row',
        columns: [{ value: null }, { value: null }, { value: null }]
      }
    ];
  }

  rows = this.startingRows;

  winningColumns?: number[][];
  winner?: 'x' | 'o' | null;

  get gameOver() {
    return this.rows.every(r => r.columns.every(c => !!c.value)) || !!this.winner;
  }

  claim(rowIndex: number, colIndex: number) {
    this.rows[rowIndex].columns[colIndex].value = this.activePlayer;
    this.checkIsWinner(rowIndex, colIndex, this.activePlayer);
    if (this.activePlayer === 'x') {
      this.activePlayer = 'o'
    } else {
      this.activePlayer = 'x';
    };

  }

  reset() {
    this.winner = null;
    this.winningColumns = undefined;
    this.activePlayer = 'x';
    this.rows = this.startingRows;
  }

  isWinningCol(rowIndex: number, colIndex: number) {
    if (!!!this.winningColumns) return false;
    return this.winningColumns.some(set => set[0] === rowIndex && set[1] === colIndex);
  }

  checkIsWinner(rowIndex: number, colIndex: number, target: 'x' | 'o' | null | undefined) {
    if (this.isDiagonalWin('left', target)) return true;
    if (this.isDiagonalWin('right', target)) return true;
    if (this.isHorizontalWin(rowIndex, target)) return true;
    if (this.isVerticalWin(colIndex, target)) return true;
    return false;
  }

  shouldShow(colValue: 'x' | 'o' | null | undefined) {
    return (!!this.winner && colValue === this.winner) || !!colValue;
  }

  isHorizontalWin(rowIndex: number, target: 'x' | 'o' | null | undefined) {
    const isWinning = this.rows[rowIndex].columns.every(c => c.value === target);
    if (isWinning) {
      this.winner = target;
      this.winningColumns = [
        [rowIndex, 0],
        [rowIndex, 1],
        [rowIndex, 2],
      ];
    } else {
      this.winningColumns = undefined;
    }
    return isWinning;
  }

  isVerticalWin(colIndex: number, target: 'x' | 'o' | null | undefined) {
    const isWinning = this.rows.every(r => r.columns[colIndex].value === target);
    if (isWinning) {
      this.winner = target;
      this.winningColumns = [
        [0, colIndex],
        [1, colIndex],
        [2, colIndex],
      ];
    } else {
      this.winningColumns = undefined;
    }
    return isWinning;
  }

  isDiagonalWin(direction: 'left' | 'right', target: 'x' | 'o' | null | undefined) {
    let targets: string[] = [
      (this.rows[0].columns[0].value as string),
      (this.rows[1].columns[1].value as string),
      (this.rows[2].columns[2].value as string),
    ];
    if (direction === 'right') targets = [
      (this.rows[0].columns[2].value as string),
      (this.rows[1].columns[1].value as string),
      (this.rows[2].columns[0].value as string),
    ];
    const isWinning = targets.every(t => t === target);
    if (isWinning) {
      this.winner = target;
      this.winningColumns = [
        [0, 0],
        [1, 1],
        [2, 2],
      ];
      if (direction === 'right') {
        this.winningColumns = [
          [0, 2],
          [1, 1],
          [2, 0],
        ];
      }
    } else {
      this.winningColumns = undefined;
    }

    return isWinning;
  }
}
