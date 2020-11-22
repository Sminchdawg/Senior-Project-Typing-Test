import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameModeService {
  private gameModes: Array<string> = new Array<string>();

  private selectedGameMode: string;

  constructor() {
    this.gameModes.push('Default');
    this.gameModes.push('Disappear');
    this.gameModes.push('Speed');

    this.selectedGameMode = this.gameModes[0];
  }

  public getGameModes(): Array<string> {
    return this.gameModes;
  }

  public getSelectedGameMode(): string {
    return this.selectedGameMode;
  }

  public setSelectedGameMode(gameMode: string): void {
    this.selectedGameMode = gameMode;
  }
}
