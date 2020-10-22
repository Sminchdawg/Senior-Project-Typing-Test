import { Injectable } from '@angular/core';
import { Word } from './models/words';

@Injectable({
  providedIn: 'root'
})
export class WordsService {
  private allWords: Array<Word> = new Array<Word>();

  private wordText: Array<string> = new Array<string>();

  private numWordsSent = 10;

  constructor() {
    this.generateWordText();
  }

  public getWords(): Array<Word> {
    this.allWords = [];
    for (let i = 0; i < this.numWordsSent; i += 1) {
      const number = Math.floor(Math.random() * Math.floor(this.wordText.length - 1));
      this.createWord(this.wordText[number]);
    }
    return this.allWords;
  }

  private createWord(text: string): void {
    const word = new Word();
    word.text = text;
    this.allWords.push(word);
  }

  private generateWordText(): void {
    // eslint-disable-next-line max-len
    const phrase = 'dare temporary loose delay cat clam laughable dine mighty fallacious tested net tasteless loutish sleet use manage alley erratic tax awake sore meek soup edge supply match instinctive quit fuzzy show deer hypnotize hurt yell difficult spiky snatch surmise slam line hydrant pumped eggnog gash flaky letter watch ask humorous mysterious chip rabbits import';
    this.wordText = phrase.split(' ');
  }
}
