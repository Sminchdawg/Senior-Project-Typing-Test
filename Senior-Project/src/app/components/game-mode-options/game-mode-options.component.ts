import { Component, OnInit } from '@angular/core';
import { GameModeService } from '../../shared/services/game-mode.service';

@Component({
  selector: 'app-game-mode-options',
  templateUrl: './game-mode-options.component.html',
  styleUrls: ['./game-mode-options.component.scss']
})
export class GameModeOptionsComponent implements OnInit {
  gameModeOptions: Array<string> = new Array<string>();

  selectedGameMode: string;

  constructor(
    private gameModeService: GameModeService,
  ) { }

  ngOnInit(): void {
    this.selectedGameMode = this.gameModeService.getSelectedGameMode();
    this.gameModeOptions = this.gameModeService.getGameModes();
  }

  onChange(): void {
    this.gameModeService.setSelectedGameMode(this.selectedGameMode);
  }
}
