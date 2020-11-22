import { UserService } from './../../shared/services/user.service';
import { Word } from './../../shared/models/word.model';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { WordsPerMinuteService } from '../../shared/services/words-per-minute.service';
import { WordsService } from '../../shared/services/words.service';
import { Subject, Observable } from 'rxjs';
import { ResultsService } from '../../shared/services/results.service';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ResultsModalComponent } from 'src/app/components/results-modal/results-modal.component';
import { ShareSheetComponent } from 'src/app/components/share-sheet/share-sheet.component';
import { TypingTestService } from '../../shared/services/typing-test.service';

@Component({
  selector: 'app-typing-test-page',
  templateUrl: './typing-test-page.component.html',
  styleUrls: ['./typing-test-page.component.scss']
})
export class TypingTestPageComponent implements OnInit {
  @ViewChild('input') input: ElementRef;

  firstWordRow: Array<Word> = new Array<Word>();

  secondWordRow: Array<Word> = new Array<Word>();

  isActive: Observable<boolean> = new Observable<boolean>();

  currentWord: Word;

  index: number = null;

  wordsPerMinute = 0;

  selectedTimeForTest: number;

  constructor(
    private wordsPerMinuteService: WordsPerMinuteService,
    private wordService: WordsService,
    private resultsService: ResultsService,
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private typingTestService: TypingTestService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.isActive = this.typingTestService.getIsActiveObservable();
    this.selectedTimeForTest = this.typingTestService.getDefaultSelectedTimeForTest();
    this.typingTestService.getSelectedTimeForTestObservable().subscribe((response) => {
      this.selectedTimeForTest = response;
    })

    this.isActive.subscribe((response) => {
      if (response === false) {
        this.testEnded();
      }
    })
  }

  checkWord(input: string): void {
    if (input === this.currentWord.text) {
      this.firstWordRow[this.index].correct = true;
      this.wordsPerMinuteService.incrementCorrectWords();
    } else {
      this.wordsPerMinuteService.incrementIncorrectWords();
    }
    this.firstWordRow[this.index].tried = true;
    this.firstWordRow[this.index].current = false;
    this.setCurrentWord();
  }

  setCurrentWord(): void {
    if (this.index === null) {
      this.index = 0;
    } else if ((this.index + 1) % 10 === 0 && this.index !== 0) {
      this.firstWordRow = this.secondWordRow;
      this.secondWordRow = this.wordService.getWords();
      this.index = 0;
    } else {
      this.index++;
    }
    this.currentWord = this.firstWordRow[this.index];
    this.firstWordRow[this.index].current = true;
  }

  trimSpace(input: any): void {
    input.value = input.value.replace(/\s/g, "");
  }

  testStarted(): void {
    this.firstWordRow = this.wordService.getWords();
    this.secondWordRow = this.wordService.getWords();
    this.setCurrentWord();
    this.typingTestService.setIsActive(true);
    this.input.nativeElement.focus();
  }

  testEnded(): void {
    const result = this.wordsPerMinuteService.getCurrentData();
    this.resultsService.addResult(result);
    this.index = null;

    this.openDialog();
    this.userService.setResults({
      wpm: result.wpm,
      correctWords: result.correctWords,
      incorrectWords: result.incorrectWords,
      userId: this.userService.getCurrentUserId(),
    }).subscribe(() => {
      this.wordsPerMinuteService.resetWords();
    })
  }

  openDialog(): void {
    this.dialog.open(ResultsModalComponent, {
      width: '250px',
      data: {
        wpm: this.wordsPerMinuteService.getWordsPerMinute(this.selectedTimeForTest),
        correctWords: this.wordsPerMinuteService.getCorrectWords(),
        incorrectWords: this.wordsPerMinuteService.getIncorrectWords(),
      }
    });
  }

  openBottomSheet(): void {
    this.bottomSheet.open(ShareSheetComponent);
  }

  onTimeChange(timeLeft: number): void {
    this.wordsPerMinute = this.wordsPerMinuteService.getWordsPerMinute(this.selectedTimeForTest, timeLeft);
  }

  onReset(): void {
    this.typingTestService.setIsActive(false);
  }
}
