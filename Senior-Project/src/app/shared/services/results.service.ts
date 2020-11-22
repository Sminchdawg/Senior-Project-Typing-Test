import { Injectable } from '@angular/core';
import { ResultsData } from '../models/results-data';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  private resultsSubject = new Subject<Array<ResultsData>>();

  private resultsArray = new Array<ResultsData>();

  constructor() { }

  public getResultsSubject(): Subject<Array<ResultsData>> {
    return this.resultsSubject;
  }

  public addResult(result: ResultsData): void {
    this.resultsArray.push(result);
    this.resultsSubject.next(this.resultsArray);
  }
}
