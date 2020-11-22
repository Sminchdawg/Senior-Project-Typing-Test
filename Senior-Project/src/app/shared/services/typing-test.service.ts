import { Injectable, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypingTestService implements OnInit {

  private isActive: Subject<boolean> = new Subject<boolean>();

  private selectedTimeForTest: Subject<number> = new Subject<number>();

  private defaultSelectedTimeForTest = 60;

  constructor() { }

  ngOnInit(): void {
    this.selectedTimeForTest.next(this.defaultSelectedTimeForTest);
  }

  public getIsActiveObservable(): Observable<boolean> {
    return this.isActive.asObservable();
  }

  public setIsActive(isActive: boolean): void {
    this.isActive.next(isActive);
  }

  public changeSelectedTimeForTest(newTime: number): void {
    this.selectedTimeForTest.next(newTime);
  }

  public getSelectedTimeForTestObservable(): Observable<number> {
    return this.selectedTimeForTest.asObservable();
  }

  public getDefaultSelectedTimeForTest(): number {
    return this.defaultSelectedTimeForTest;
  }
}
