import { Injectable } from '@angular/core';
import { ResultsData } from '../models/results-data';
import { TypingTestService } from './typing-test.service';

@Injectable({
  providedIn: 'root'
})
export class WordsPerMinuteService {
  
  private correctWords = 0;

  private incorrectWords = 0;

  private wordsPerMinute = 0;

  constructor(
    private typingTestService: TypingTestService,
  ) { 
    // this.typingTestService.getIsActiveObservable().subscribe((response) => {
    //   if (response === false) {
    //     // this.resetWords();
    //   }
    // })
  }

  public getWordsPerMinute(selectedTimeForTest: number, timeLeft?: number): number {
    if (!timeLeft) {
      timeLeft = 0
    }
    this.wordsPerMinute = Math.round(((this.correctWords / (selectedTimeForTest - timeLeft) * 60)));
    
    return this.wordsPerMinute;
  }

  public getCorrectWords(): number {
    return this.correctWords;
  }

  public getIncorrectWords(): number {
    return this.incorrectWords;
  }

  public incrementCorrectWords(): void {
    this.correctWords++;
  }

  public incrementIncorrectWords(): void {
    this.incorrectWords++;
  }

  public getCurrentData(): ResultsData {
    const result = new ResultsData();
    result.wpm = this.wordsPerMinute;
    result.correctWords = this.correctWords;
    result.incorrectWords = this.incorrectWords;
    return result;
  }

  public resetWords(): void {
    this.correctWords = 0;
    this.incorrectWords = 0;
    this.wordsPerMinute = 0;
  }
}
