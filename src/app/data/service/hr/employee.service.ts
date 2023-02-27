import { Injectable } from '@angular/core';
import { Observable, Subject, merge } from 'rxjs';

import { switchMap, tap } from 'rxjs/operators';
import { Employee } from '../../schema/employee';
import { employees } from '../fake.data';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private pagesInput: Subject<number>;
  private searchInput: Subject<string>;

  constructor() {
    // this.pagesInput = new Subject();
    // this.searchInput = new Subject();
    // this.numberOfPages = new Subject();
    // this.pagesOutput = merge(
    //   this.pagesInput.pipe(switchMap((value) => this.paginator.getPage(value))),
    //   this.searchInput.pipe(
    //     tap((query) => {
    //       this.paginator.refresh(this.filter(query));
    //     })
    //   )
    // );
    // .pipe(
    //   switchMap((params) => {
    //     return this.http.get<NewsApiResponse>(this.url, { params });
    //   }),
    //   tap((response) => {
    //     const totalPages = Math.ceil(response.totalResults / this.pageSize);
    //     this.numberOfPages.next(totalPages);
    //   }),
    //   pluck('articles')
    // );
  }

  filter(query: string) {
    // return this.paginator.list.filter(
    //   (e) =>
    //     e.fullName.includes(query) ||
    //     e.department.includes(query) ||
    //     e.rank.includes(query)
    // );
  }

  getAll(isRetired: boolean = false): Employee[] {
    return employees
      .filter((e) => !e.isRetired)
      .filter((e, index) => index < 6);
  }

  getPage(page: number) {
    this.pagesInput.next(page);
  }

  search(query: string) {}
}
