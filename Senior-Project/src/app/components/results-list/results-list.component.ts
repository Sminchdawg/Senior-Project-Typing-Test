import { UserService } from './../../shared/services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ResultsData } from '../../shared/models/results-data';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss']
})
export class ResultsListComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;

  results = new Array<ResultsData>();

  displayedColumns: string[] = ['wordsPerMinute', 'correctWords', 'incorrectWords'];

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {

    this.userService.getResults().subscribe((response) => {
      this.results = response.results;
      this.table.renderRows();
    });
  }
}
