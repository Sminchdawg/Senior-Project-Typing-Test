import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { TypingTestService } from '../../shared/services/typing-test.service';

@Component({
  selector: 'app-timer-component',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  @Output() time = new EventEmitter<number>();

  isActive: Observable<boolean> = new Observable<boolean>();

  timerEnabled = true;

  timeLeft: number

  interval;

  totalTime: number;

  constructor(
    private typingTestService: TypingTestService,
  ) { }

  ngOnInit(): void {
    this.totalTime = this.typingTestService.getDefaultSelectedTimeForTest();
    this.typingTestService.getSelectedTimeForTestObservable().subscribe((response) => {
      this.totalTime = response;
    });
    this.isActive = this.typingTestService.getIsActiveObservable();
    this.isActive.subscribe((response) => {
      if (response === true) {
        this.startTimer();
      } else {
        clearInterval(this.interval);
      }
    })
  }

  switchTimerEnabled(): void {
    this.timerEnabled = !this.timerEnabled;
  }

  startTimer(): void {
    this.timeLeft = this.totalTime;
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        this.time.emit(this.timeLeft);
      }
      else {
        this.typingTestService.setIsActive(false);
        clearInterval(this.interval);
      }
    },1000)
  }
}
