import { Component, OnInit } from '@angular/core';
import { WordsService } from '../services/words.service';

@Component({
  templateUrl: './typing-test-page.component.html',
  styleUrls: ['./typing-test-page.component.scss']
})
export class TypingTestPageComponent implements OnInit {
  currentWord = '';

  words = Array<string>();

  constructor(
    private wordService: WordsService,
  ) { }

  ngOnInit(): void {
    this.words.push('hello');
    this.words.push('hello');
    this.words.push('hello');
    this.words.push('hello');
    this.words.push('hello');
  }
}
