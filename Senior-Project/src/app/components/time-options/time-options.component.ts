import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { TypingTestService } from '../../shared/services/typing-test.service';

@Component({
  selector: 'app-time-options',
  templateUrl: './time-options.component.html',
  styleUrls: ['./time-options.component.scss']
})
export class TimeOptionsComponent implements OnInit {
  isActive: Observable<boolean> = new Observable<boolean>();

  timeOptions: Array<number> = new Array<number>();

  selectedTimeForTest: number;

  constructor(
    private typingTestService: TypingTestService,
  ) {}

  ngOnInit(): void {
    this.isActive = this.typingTestService.getIsActiveObservable();
    this.selectedTimeForTest = this.typingTestService.getDefaultSelectedTimeForTest();
    this.timeOptions.push(10);
    this.timeOptions.push(30);
    this.timeOptions.push(60);
    this.timeOptions.push(90);
    this.timeOptions.push(120);
  }

  onChange(): void {
    this.typingTestService.changeSelectedTimeForTest(this.selectedTimeForTest);
  }
}
